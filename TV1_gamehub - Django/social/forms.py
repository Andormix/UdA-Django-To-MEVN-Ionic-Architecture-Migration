from django import forms

from .models import Post, Reply


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['body', 'image']
        widgets = {'body': forms.Textarea(attrs={'rows': 4, 'class': 'form-control'})}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['image'].widget.attrs.update({'class': 'form-control'})


class ReplyForm(forms.ModelForm):
    class Meta:
        model = Reply
        fields = ['body', 'image']
        widgets = {'body': forms.Textarea(attrs={'rows': 3, 'class': 'form-control'})}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['image'].widget.attrs.update({'class': 'form-control'})
