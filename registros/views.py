from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import Registro, Cliente
# Create your views here.
def index(request):
    return render(request, "registros/index.html", {
        "registros": Registro.objects.all()
    })

def registro(request, registro_id):
    registro = Registro.objects.get(id=registro_id)
    return render(request, "registros/registro.html", {
        "registro": registro,
        "clientes": registro.clientes.all(),
        "non_clientes": Cliente.objects.exclude(registros=registro).all()
    })

def avaliar(request, registro_id):
    if request.method == "POST":
        registro = Registro.objects.get(pk=registro_id)
        cliente = Cliente.objects.get(pk=int(request.POST["cliente"]))
        cliente.registros.add(registro)
        return HttpResponseRedirect(reverse("registro", args=(registro.id,)))