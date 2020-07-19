from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:registro_id>", views.registro, name="registro"),
    path("<int:registro_id>/avaliar", views.avaliar, name="avaliar")
]