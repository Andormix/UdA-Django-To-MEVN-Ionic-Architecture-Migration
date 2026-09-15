from rest_framework import serializers

from devlog.models import Comment, Post


class CommentSerializer(serializers.ModelSerializer):
    post = serializers.IntegerField(source='post_id', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'name', 'body', 'created']


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    comments = serializers.SerializerMethodField()
    tags = serializers.StringRelatedField(many=True, read_only=True)
    url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'author', 'body',
            'publish', 'created', 'updated', 'status',
            'tags', 'comments', 'url',
        ]

    def get_comments(self, obj):
        comments = getattr(obj, 'active_comments', None)
        if comments is None:
            comments = obj.comments.filter(active=True).order_by('created')
        return CommentSerializer(comments, many=True).data

    def get_url(self, obj):
        return obj.get_absolute_url()
