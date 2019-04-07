web: gunicorn github_integration.wsgi --limit-request-line 8188 --log-file -
worker: celery worker --app=github_integration --loglevel=info
