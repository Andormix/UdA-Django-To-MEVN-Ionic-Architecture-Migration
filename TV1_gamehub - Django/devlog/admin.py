from django.contrib import admin

from .models import Comment, Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'author', 'publish', 'status', 'has_image']
    list_filter = ['status', 'created', 'publish', 'author']
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ('title',)}
    raw_id_fields = ['author']
    date_hierarchy = 'publish'
    ordering = ['status', 'publish']
    show_facets = admin.ShowFacets.ALWAYS

    class Media:
        # EasyMDE: lightweight Markdown editor loaded from CDN (no extra pip package).
        # Uses Django Admin class Media pattern (standard Django admin JS/CSS injection).
        # Inline images are written as Markdown: ![description](url) and rendered by
        # the existing `markdown` template filter in devlog/templatetags/devlog_tags.py.
        css = {
            'all': ('https://unpkg.com/easymde/dist/easymde.min.css',)
        }
        js = (
            'https://unpkg.com/easymde/dist/easymde.min.js',
            'devlog/js/easymde_init.js',
        )

    @admin.display(boolean=True, description='Image/GIF')
    def has_image(self, obj):
        return bool(obj.image)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'post', 'created', 'active']
    list_filter = ['active', 'created', 'updated']
    search_fields = ['name', 'email', 'body']
