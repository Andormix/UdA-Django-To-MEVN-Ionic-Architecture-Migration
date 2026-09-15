from django.contrib.auth import views as auth_views
from django.urls import path

from . import views
from .forms import StyledAuthenticationForm, StyledPasswordChangeForm

urlpatterns = [
    path(
        'login/',
        auth_views.LoginView.as_view(
            template_name='account/login.html',
            form_class=StyledAuthenticationForm,
        ),
        name='login',
    ),
    path('logout/', views.user_logout, name='logout'),
    path(
        'password-change/',
        auth_views.PasswordChangeView.as_view(
            template_name='registration/password_change_form.html',
            form_class=StyledPasswordChangeForm,
        ),
        name='password_change',
    ),
    path(
        'password-change/done/',
        auth_views.PasswordChangeDoneView.as_view(
            template_name='registration/password_change_done.html'
        ),
        name='password_change_done',
    ),
    path('', views.dashboard, name='dashboard'),
    path('register/', views.register, name='register'),
    path('edit/', views.edit, name='edit'),
]
