from github import Github
from rest_framework import generics, serializers, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from github_repositories.models import Repository


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


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes((IsAuthenticated,))
def retrieve_github_repo(request, repo_name):
    return Response(build_repo_body(github_client(request.user).get_user().get_repo(repo_name)))


def build_repo_body(repo):
    return {
        'name': repo.name,
        'description': repo.description,
        'full_name': repo.full_name,
        'url': repo.html_url,
        'created_at': repo.created_at,
    }


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes((IsAuthenticated,))
def retrieve_repo_commits(request, repo_name):
    client = github_client(request.user)
    repository = client.get_user().get_repo(repo_name)
    commits = [build_commit_body(commit) for commit in repository.get_commits()]

    return Response(commits)


def build_commit_body(commit):
    return {
        'sha': commit.sha,
        'message': commit.commit.message,
        'author': commit.author.name,
        'url': commit.html_url,
    }


def github_client(user):
    github = user.social_auth.get(provider='github')
    token = github.extra_data['access_token']

    return Github(token)
