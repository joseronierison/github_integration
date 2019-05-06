from rest_framework import serializers, viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from github_repositories.models import Repository

class RepositorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Repository
        fields = ('id', 'name', 'description', 'full_name', 'url', 'created_at')


class RepositoryViewSet(viewsets.ModelViewSet):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
