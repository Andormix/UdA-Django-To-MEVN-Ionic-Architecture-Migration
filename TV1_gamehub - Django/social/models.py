from django.conf import settings
from django.db import models


class Post(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='social_posts'
    )
    body = models.TextField()
    image = models.ImageField(upload_to='social/%Y/%m/%d/', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']
        indexes = [models.Index(fields=['-created'])]

    def __str__(self):
        return f'Post by {self.user.username} on {self.created.date()}'

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('social:post_detail', args=[self.pk])


class Reply(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='replies'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='social_replies'
    )
    body = models.TextField()
    image = models.ImageField(upload_to='social/replies/%Y/%m/%d/', blank=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return f'Reply by {self.user.username}'
