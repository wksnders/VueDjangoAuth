from rest_framework import serializers
from .models import Goats

class GoatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goats
        fields = ['name', 'power_level', 'is_grumpy']