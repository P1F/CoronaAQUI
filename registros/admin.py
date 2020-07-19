from django.contrib import admin

# Register your models here.

from .models import Registro, Cliente

admin.site.register(Registro)
admin.site.register(Cliente)