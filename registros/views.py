from django.shortcuts import render

from .models import Registro
# Create your views here.
def index(request):
    return render(request, "registros/index.html", {
        "registros": Registro.objects.all()
    })

def registro(request, registro_id):
    registro = Registro.objects.get(id=registro_id)
    return render(request, "registros/registro.html", {
        "registro": registro,
        "clientes": registro.clientes.all()
    })