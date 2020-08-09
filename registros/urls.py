from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("usuario/registrar", views.registrar_usuario),
    path("usuario/entrar", views.entrar),
    path("finalizarsessao", views.finalizar_sessao),
    path("<int:empresa_id>", views.avaliacao, name="avaliacao")
]