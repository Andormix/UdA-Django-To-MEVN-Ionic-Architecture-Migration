from django.contrib import admin

from .models import Post, Reply


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['user', 'created', 'updated']
    list_filter = ['created', 'updated']
    search_fields = ['body', 'user__username']


@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ['user', 'post', 'created']
    list_filter = ['created']
    search_fields = ['body', 'user__username']
