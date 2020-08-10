from django.db import models
from django.forms import ModelForm


# Create your models here.
class Customer(models.Model):
	Nota = models.CharField(max_length=200)
	Comentario = models.CharField(max_length=200)

	def __str__(self):
		return self.first_name + ' ' + self.last_name 

class Empresas(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    address = models.CharField(max_length=200)
    name = models.CharField(max_length=101)
    grade = models.IntegerField()

    def __str__(self):
        return f"{self.name}"

class Usuários(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    name = models.CharField(max_length=64)
    email =  models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    user = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"

class Avaliações(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    user = models.ManyToManyField(Usuários, blank=True, related_name="usuário")
    user_id = models.IntegerField(default=0)
    empresa = models.ManyToManyField(Empresas, blank=True, related_name="empresas")
    empresa_id = models.IntegerField(default=0)
    comment = models.CharField(max_length=300, default='Não deixou comentários sobre o estabelecimento.')
    grade = models.IntegerField()

    def __str__(self):
        return f"{self.user.name} NOTA: {self.grade} COMENTÁRIO: {self.comment}"

class CustomerForm(ModelForm):
	class Meta:
		model = Avaliações
		fields = ['comment', 'grade']