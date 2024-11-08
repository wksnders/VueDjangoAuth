from django.db import models

# Create your models here.
class Goats(models.Model):
    name = models.CharField(max_length=50, unique=True)
    power_level = models.IntegerField()
    is_grumpy = models.BooleanField(default=True)