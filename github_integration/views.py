import hashlib
import hmac
import json
import logging

from django.conf import settings
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, serializers, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from github_integration import utils
from github_integration.celery import save_commit, setup_repo
from github_integration.models import Commit, Repository


logger = logging.getLogger(__name__)


@login_required
def home(request):
    return render(request, 'app/home.html')


def login(request):
    return render(request, 'app/login.html')


def logout_view(request):
    logout(request)
    return redirect('login')


class RepositorySerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Repository
        fields = ('id', 'user', 'name', 'description', 'full_name', 'url', 'created_at')


# pylint: disable=too-many-ancestors
class RepositoryViewSet(generics.ListAPIView, viewsets.ModelViewSet):
    serializer_class = RepositorySerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Repository.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        repository = serializer.save(user=user)
        setup_repo.apply([user.id, repository.name, repository.full_name])


class CommitSerializer(serializers.HyperlinkedModelSerializer):
    repository_name = serializers.SerializerMethodField()

    def get_repository_name(self, commit):
        return commit.repository.name

    class Meta:
        model = Commit
        fields = ('id', 'repository_name', 'sha', 'message', 'author', 'url', 'created_at')


# pylint: disable=too-many-ancestors
class CommitViewSet(generics.ListAPIView, viewsets.ModelViewSet):
    serializer_class = CommitSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        repo = self.request.query_params.get('repo', None)
        queryset = Commit.objects.filter(repository__user=self.request.user)

        if repo is not None:
            queryset = queryset.filter(repository__name=repo)

        return queryset


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes((IsAuthenticated,))
def retrieve_github_repo(request, repo_name):
    user = utils.github_client(request.user).get_user()
    return Response(utils.build_repo_body(user.get_repo(repo_name)))


@api_view(['POST'])
@permission_classes((AllowAny,))
@csrf_exempt
def github_webhook(request):
    secret = bytes(settings.GITHUB_WEBHOOK_SECRET, 'latin-1')
    signature = 'sha1=' + hmac.new(secret, request.body, hashlib.sha1).hexdigest()

    logger.info("headers %s.", str(request.META))
    logger.info("headers %s.", str(request.body))

    if signature != request.META['headers']['X-Hub-Signature']:
        return Response({"message": "Invalid signature."}, status=401)

    event = request.META['headers']['X-GitHub-Event']

    if event != 'push':
        return Response({"message": "Event discarded."}, status=200)

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    full_name = body['repository']['full_name']

    for commit in body['commits']:
        save_commit.delay(full_name, {'sha': commit['sha'],
                                      'message': commit['message'],
                                      'author': commit['author']['name'],
                                      'url': commit['url'],
                                      })

    return Response({"message": "Done!"}, status=201)
