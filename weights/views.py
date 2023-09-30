from rest_framework import generics
from .models import Weight, Person
from .serializers import WeightSerializer, PersonSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.shortcuts import render

def weight_tracker(request):
    return render(request,"weights/weight_tracker.html")

class PersonListCreateView(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class PersonDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class WeightListCreateView(generics.ListCreateAPIView):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
class WeightRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer

class PersonWeightsView(generics.ListAPIView):
    serializer_class = WeightSerializer

    def get_queryset(self):
        # Get the person_id from the URL parameter
        person_id = self.kwargs['id']

        # Filter Weight objects based on the person's ID
        queryset = Weight.objects.filter(person=person_id)

        return queryset