from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Person(models.Model):
    # primary information
    name = models.CharField(max_length = 50)
    date_of_birth = models.DateField()
    date_created = models.DateTimeField(default = timezone.now())
    #date of creation
    def __str__(self):
        return self.name
class Weight(models.Model):
    person = models.ForeignKey(Person,
                               on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits = 5, decimal_places = 2) # in kg, needs verification
    w_date = models.DateField("date")
    def __str__(self):
        return f"{self.person.name} - {self.w_date}"
    
