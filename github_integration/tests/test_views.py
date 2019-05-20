import hashlib
import hmac
import json

from django.test import TestCase

from rest_framework.test import APIRequestFactory

from github_integration import views as repository_views
from github_integration.models import Commit, Repository
from users.models import User


class WebhookTestCase(TestCase):
    expected_first_sha = "f867b4ce42e263dc42c8abcfee2e0e45fcdb12b3"
    expected_first_message = "Add commit message 1"
    expected_second_sha = "f867b4ce42098c9as8db7c7ajahgt5517bce90a0"
    expected_second_message = "Add commit message 2"
    repo_full_name = "test/repo-name"
    repo_name = "repo-name"
    payload = {
      "ref": "refs/tags/simple-tag",
      "before": "a10867b14bb761a232cd80139fbd4c0d33264240",
      "after": expected_first_sha,
      "created": True,
      "deleted": False,
      "forced": False,
      "base_ref": None,
      "compare": "https://github.com/test/test/compare/a10867b14bb7...f867b4ce42e26",
      "commits": [
        {
            "sha": expected_first_sha,
            "message": expected_first_message,
            "author": {
                "name": "Teste Name",
                "email": "email@@email",
            },
            "url": "https://url.test",
            "distinct": True,
        },
        {
            "sha": expected_second_sha,
            "message": expected_second_message,
            "author": {
                "name": "Teste Name",
                "email": "email@@email",
            },
            "url": "https://url.test",
            "distinct": True,
        },
      ],
      "repository": {
        "id": 135493233,
        "node_id": "MDEwOlJlcG9zaXRvcnkxMzU0OTMyMzM=",
        "name": repo_name,
        "full_name": repo_full_name,
      },
    }

    payload_body = bytes(json.dumps(payload, separators=(',', ':')), 'latin-1')
    valid_signature = 'sha1=' + hmac.new(b'test', payload_body, hashlib.sha1).hexdigest()
    valid_headers = {'X-GitHub-Event': 'push', 'X-Hub-Signature': valid_signature}

    def setUp(self):
        self.user = User.objects.create(email="test@@test")
        self.repository = Repository.objects.create(
            user=self.user,
            name=self.repo_name,
            full_name=self.repo_full_name,
            url="https://teste.com/test/test"
        )

    def tearDown(self):
        self.user.delete()
        self.repository.delete()

    def test_store_commit_when_push_event_has_a_new_commit(self):
        factory = APIRequestFactory()

        request = factory.post('/api/webhook', self.payload, format='json',
                                HTTP_X_HUB_SIGNATURE=self.valid_signature,
                                HTTP_X_GITHUB_EVENT='push')
        response = repository_views.github_webhook(request)

        self.assertEqual(response.status_code, 201)
        saved_commits = Commit.objects.filter().all()
        self.assertEqual(len(saved_commits), 2)
        self.assertEqual(saved_commits[0].sha, self.expected_first_sha)
        self.assertEqual(saved_commits[0].message, self.expected_first_message)
        self.assertEqual(saved_commits[1].sha, self.expected_second_sha)
        self.assertEqual(saved_commits[1].message, self.expected_second_message)

    def test_does_not_store_commit_when_is_not_a_push_event(self):
        factory = APIRequestFactory()
        request = factory.post('/api/webhook', self.payload, format='json',
                                HTTP_X_HUB_SIGNATURE=self.valid_signature,
                                HTTP_X_GITHUB_EVENT='open')

        response = repository_views.github_webhook(request)

        self.assertEqual(response.status_code, 200)
        saved_commit = list(Commit.objects.all())
        self.assertEqual(len(saved_commit), 0)

    def test_should_refuse_request_with_wrong_signature(self):
        factory = APIRequestFactory()

        request = factory.post('/api/webhook', self.payload, format='json',
                                HTTP_X_HUB_SIGNATURE='wrong-signature',
                                HTTP_X_GITHUB_EVENT='open')

        response = repository_views.github_webhook(request)

        self.assertEqual(response.status_code, 401)
        saved_commit = list(Commit.objects.all())
        self.assertEqual(len(saved_commit), 0)
