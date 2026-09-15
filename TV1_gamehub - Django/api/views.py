from django.db.models import Prefetch
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from devlog.models import Comment, Post

from .serializers import CommentSerializer, PostSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.published.select_related('author').prefetch_related(
        'tags',
        Prefetch(
            'comments',
            queryset=Comment.objects.filter(active=True).order_by('created'),
            to_attr='active_comments',
        ),
    )
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comment.objects.filter(
        active=True,
        post__status=Post.Status.PUBLISHED,
    ).select_related('post').order_by('-created')
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
