# Generated by Django 2.2.1 on 2019-05-07 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('github_integration', '0004_auto_20190507_0415'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repository',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
