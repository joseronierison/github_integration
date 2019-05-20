# Generated by Django 2.2.1 on 2019-05-05 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('github_integration', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commit',
            name='sha',
            field=models.CharField(max_length=256, unique=True),
        ),
        migrations.AlterField(
            model_name='repository',
            name='full_name',
            field=models.CharField(max_length=256, unique=True),
        ),
    ]