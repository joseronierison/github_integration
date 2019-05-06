from django.shortcuts import render  # noqa
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from github import Github

@api_view(['GET'])
@authentication_classes((SessionAuthentication,))
@permission_classes((IsAuthenticated,))
def current_user(request):
    github = request.user.social_auth.get(provider='github')
    token = github.extra_data['access_token']
    github_client = Github(token)

    user = github_client.get_user()

    content = {
        'email': user.email,
        'name': user.name,
        'username': user.login,
        'created_at': user.created_at,
    }

    return Response(content)
