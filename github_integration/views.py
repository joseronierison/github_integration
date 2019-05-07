from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect

@login_required
def home(request):
    return render(request, 'app/home.html')

def login(request):
    return render(request, 'app/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')
