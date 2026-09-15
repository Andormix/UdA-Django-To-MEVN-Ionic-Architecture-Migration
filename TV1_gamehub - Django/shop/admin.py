from django.contrib import admin

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'category_type']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'slug', 'price', 'available',
        'product_type', 'created', 'updated',
    ]
    list_filter = ['available', 'created', 'updated', 'product_type']
    list_editable = ['price', 'available']
    prepopulated_fields = {'slug': ('name',)}
