from github import Github


def github_client(user):
    github = user.social_auth.get(provider='github')
    token = github.extra_data['access_token']

    return Github(token)


def build_commit_body(commit):
    return {
        'sha': commit.sha,
        'message': commit.commit.message,
        'author': commit.author.name,
        'url': commit.html_url,
    }


def build_repo_body(repo):
    return {
        'name': repo.name,
        'description': repo.description,
        'full_name': repo.full_name,
        'url': repo.html_url,
        'created_at': repo.created_at,
    }
