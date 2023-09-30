from django.urls import path
from .views import WeightListCreateView, WeightRetrieveUpdateDestroyView, PersonListCreateView,PersonDetailView,weight_tracker,PersonWeightsView

urlpatterns = [
    path('persons/', PersonListCreateView.as_view(), name='person-list'),
    path('persons/<int:pk>/', PersonDetailView.as_view(), name='person-detail'),
    path('weights/', WeightListCreateView.as_view(), name='weight-list-create'),
    path('weights/<int:pk>/', WeightRetrieveUpdateDestroyView.as_view(), name='weight-retrieve-update-destroy'),
    path('persons/<int:id>/weights/', PersonWeightsView.as_view(), name='person-weights'),
    path("weight_tracker/",weight_tracker,name = "bootstraptest"),
]