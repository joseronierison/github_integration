# coding: utf-8

from __future__ import absolute_import

import logging
import os

from django.apps import apps

from celery import Celery

from github_integration import utils
from github_integration.models import Commit, Repository
from users.models import User


logger = logging.getLogger(__name__)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "github_integration.settings.local")

app = Celery('github_integration_tasks')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: [n.name for n in apps.get_app_configs()])


@app.task
def setup_repo(user_id, repo_name, repo_full_name):
    logger.info("[repo:%s,user_id:%d] Setting up repo.", repo_name, user_id)
    user = User.objects.get(id=user_id)
    repo = utils.github_client(user).get_user().get_repo(repo_name)

    commits = repo.get_commits()

    return [save_commit.delay(repo_full_name,
                              utils.build_commit_body(commit)) for commit in commits]


@app.task
def save_commit(repo_full_name, commit):
    logger.info("[repo_full_name:%s,commit_sha:%s] Adding new commit.",
                repo_full_name, commit['sha'])

    repository = Repository.objects.get(full_name=repo_full_name)

    return Commit.objects.create(
        repository=repository,
        sha=commit['sha'],
        message=commit['message'],
        author=commit['author'],
        url=commit['url'],
    )
