from django.db import models

# Create your models here.
class Registro(models.Model):
    address = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    grade = models.IntegerField()

    def __str__(self):
        return f"{self.id}: {self.name} endereco: {self.address} nota: {self.grade}"

class Cliente(models.Model):
    first =  models.CharField(max_length=64)
    last = models.CharField(max_length=64)
    registros = models.ManyToManyField(Registro, blank=True, related_name="clientes")
    comment = models.CharField(max_length=300, default='Não deixou comentários sobre o estabelecimento.')
    grade = models.IntegerField(default=7)



    def __str__(self):
        return f"{self.first} {self.last} NOTA: {self.grade} {self.comment}"
