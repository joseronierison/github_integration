from django.conf import settings
from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView

from django.contrib.auth import views as auth_views

import django_js_reverse.views
from app import views as app_views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url(r'^$', app_views.home, name='home'),
    url(r'^login/$', app_views.login, name='login'),

    url('', include('social_django.urls', namespace='social')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
