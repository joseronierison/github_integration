from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
import django_js_reverse.views
from github_repositories import views as repository_views
from users import views as users_views
from . import views as app_views

router = routers.DefaultRouter()
router.register(r'repository', repository_views.RepositoryViewSet, base_name='repository')

urlpatterns = [
    url(r'^$', app_views.home, name='home'),
    url(r'^login/$', app_views.login, name='login'),
    url(r'^logout/$', app_views.logout_view, name='logout'),
    url(r'^api/', include(router.urls)),
    url(r'^api/current_user', users_views.current_user, name='current_user'),
    url(r'^api/retrieve_repo/(?P<repo_name>\w{0,100})/$',
        repository_views.retrieve_github_repo,
        name='retrieve_github_repo'),
    url(r'^api/retrieve_repo_commits/(?P<repo_name>\w{0,100})/$',
        repository_views.retrieve_repo_commits,
        name='retrieve_repo_commits'),
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),
    url('', include('social_django.urls', namespace='social')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
