from django.db import models
from django.urls import reverse


class Category(models.Model):
    SKINS = 'skins'
    CURRENCY = 'currency'
    TYPE_CHOICES = [(SKINS, 'Skins'), (CURRENCY, 'Currency')]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    category_type = models.CharField(
        max_length=20, choices=TYPE_CHOICES, default=SKINS
    )

    class Meta:
        ordering = ['name']
        indexes = [models.Index(fields=['name'])]
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:product_list_by_category', args=[self.slug])


class Product(models.Model):
    DIAMONDS = 'diamonds'
    COINS = 'coins'
    SKIN = 'skin'
    PRODUCT_TYPE_CHOICES = [
        (DIAMONDS, 'Diamonds'),
        (COINS, 'Coins'),
        (SKIN, 'Skin'),
    ]

    category = models.ForeignKey(
        Category, related_name='products', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    image = models.ImageField(upload_to='products/%Y/%m/%d', blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    product_type = models.CharField(
        max_length=20, choices=PRODUCT_TYPE_CHOICES, default=SKIN
    )
    currency_amount = models.PositiveIntegerField(
        default=0,
        help_text='Amount of coins/diamonds (for currency products)'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['id', 'slug']),
            models.Index(fields=['name']),
            models.Index(fields=['-created']),
        ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:product_detail', args=[self.id, self.slug])
