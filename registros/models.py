from django.db import models

# Create your models here.
class Registro(models.Model):
    address = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    grade = models.IntegerField()

    def __str__(self):
        return f"{self.id}: {self.name} endereco: {self.address} nota: {self.grade}"


