from django.shortcuts import render


def weight_tracker(request):
    return render(request,"weights/weight_tracker.html")