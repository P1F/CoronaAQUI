from django.urls import path

from . import views

urlpatterns = [
    path("usuario/registrar", views.registrar_usuario),
    path("usuario/entrar", views.entrar),
#    path("<int:registro_id>/avaliar", views.avaliar, name="avaliar")
]