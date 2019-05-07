from django.db import models

class Repository(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField(blank=True, null=True)
    full_name = models.CharField(max_length=256, unique=True)
    url = models.CharField(max_length=256)
    created_at = models.DateTimeField()

