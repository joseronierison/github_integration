from django.db import models
from django.utils import timezone

from users.models import User


class Repository(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=256)
    description = models.TextField(blank=True, null=True)
    full_name = models.CharField(max_length=256, unique=True)
    url = models.CharField(max_length=256)
    created_at = models.DateTimeField(default=timezone.now)


class Commit(models.Model):
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    sha = models.CharField(max_length=256, unique=True)
    message = models.CharField(max_length=256)
    author = models.CharField(max_length=256)
    url = models.CharField(max_length=256)
    created_at = models.DateTimeField(default=timezone.now)
