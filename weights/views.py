from rest_framework import generics
from .models import Weight, Person
from .serializers import WeightSerializer, PersonSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.shortcuts import render


class PersonListCreateView(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class WeightListCreateView(generics.ListCreateAPIView):
    # creates weights
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    ordering = ['-w_date']

class WeightRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    ordering = ['-w_date']

class PersonWeightsView(generics.ListAPIView):
    serializer_class = WeightSerializer
    ordering = ['-w_date']

    def get_queryset(self):
        # Get the person_id from the URL parameter
        person_id = self.kwargs['id']

        # Filter Weight objects based on the person's ID
        queryset = Weight.objects.filter(person=person_id).order_by('w_date')

        return queryset

class WeightCreateView(generics.CreateAPIView):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer