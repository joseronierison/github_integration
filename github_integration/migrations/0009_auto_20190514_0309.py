# Generated by Django 2.2.1 on 2019-05-14 03:09

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('github_integration', '0008_commit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commit',
            name='author',
            field=models.CharField(max_length=256),
        ),
        migrations.AlterField(
            model_name='commit',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
