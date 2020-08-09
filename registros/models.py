from django.db import models

# Create your models here.
class Empresas(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    address = models.CharField(max_length=200)
    name = models.CharField(max_length=101)
    grade = models.IntegerField()
    longitude = models.FloatField()
    latitude = models.FloatField()

    def __str__(self):
        return f"ID: {self.id} NOME: {self.name} ENDEREÇO: {self.address} NOTA_FINAL: {self.grade} COORDENADAS: (lng,lat)=({self.longitude},{self.latitude})"

class Usuários(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    name = models.CharField(max_length=64)
    email =  models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    user = models.CharField(max_length=64)

    def __str__(self):
        return f"ID: {self.id} NOME: {self.name} EMAIL: {self.email} SENHA: {self.password} USUÁRIO: {self.user}"

class Avaliações(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    user = models.ManyToManyField(Usuários, blank=True, related_name="usuário")
    empresa = models.ManyToManyField(Empresas, blank=True, related_name="empresa")
    comment = models.CharField(max_length=300, default='Não deixou comentários sobre o estabelecimento.')
    grade = models.IntegerField()

    def __str__(self):
        return f"ID: {self.id} {self.empresa} DE: {self.user} PARA: {self.empresa} NOTA: {self.grade} COMENTÁRIO: {self.comment}"
