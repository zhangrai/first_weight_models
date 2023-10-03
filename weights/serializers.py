from rest_framework import serializers
from .models import Weight, Person

class WeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weight
        fields = '__all__'

class PersonSerializer(serializers.ModelSerializer):
    weights = WeightSerializer(many=True, read_only=True)

    class Meta:
        model = Person
        fields = '__all__'