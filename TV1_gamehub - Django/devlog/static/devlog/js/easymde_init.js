/*
 * easymde_init.js
 * Initializes EasyMDE (Markdown editor) on the DevLog post body field in Django Admin.
 * Pattern: Django Admin class Media (standard Django pattern for injecting JS/CSS in admin forms).
 * The editor generates standard Markdown syntax, rendered by the existing `markdown` template
 * filter (devlog/templatetags/devlog_tags.py). Inline images use: ![alt text](url)
 */
document.addEventListener('DOMContentLoaded', function () {
    var textarea = document.getElementById('id_body');
    if (textarea && typeof EasyMDE !== 'undefined') {
        new EasyMDE({
            element: textarea,
            spellChecker: false,
            autosave: { enabled: false },
            toolbar: [
                'bold', 'italic', 'heading', '|',
                'quote', 'unordered-list', 'ordered-list', '|',
                'link', 'image', '|',
                'preview', 'side-by-side', 'fullscreen', '|',
                'guide'
            ],
            placeholder: 'Write your devlog entry here...\n\nTip: Insert an inline image with: ![description](https://url-to-image.png)',
        });
    }
});
