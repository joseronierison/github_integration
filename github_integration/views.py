from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
    return render(request, 'app/home.html')

def login(request):
    return render(request, 'app/login.html')