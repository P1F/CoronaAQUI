from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.http import HttpResponse
from django.http import JsonResponse
import re

from .models import Empresas, Usuários, Avaliações
# Create your views here.

def index(request):
    return render(request, "registros/index.html", {
        "empresas": Empresas.objects.all()
    })

def avaliacao(request, empresa_id):
    empresa = Empresas.objects.get(id=empresa_id)
    avaliacao = Avaliações.objects.all()
    return render(request, "registros/avaliacao.html", {
        "empresa": empresa,
        "avaliadores": Avaliações.user.all()
        })

def registrar_usuario(request):
    if request.method == 'POST':
        erros = {}
        data = dict(request.POST)
        nome = data['nome'][0]
        email = data['email'][0]
        user = data['user-register'][0]
        senha = data['senha-register'][0]

        if len(nome) == 0:
            erros['nome'] = 'Inserir nome'
        elif len(nome) > 64:
            erros['nome'] = 'Nome muito grande'

        regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
        if not re.search(regex, email):
            erros['email'] = 'Email invalido'
        if len(email) > 64:
            erros['email'] = 'Email muito grande'
        
        if Usuários.objects.filter(user=user).count() != 0:
            erros['user-register'] = 'Usuario ja cadastrado'
        if len(user) > 64:
            erros['user-register'] = 'Nome de usuario muito grande'

        if len(senha) < 4 or len(senha)>64:
            erros['senha-register'] = 'A senha deve ter entre 5 e 64 caracteres'
        
        if len(erros.keys())>0:
            erros['ok'] = False
            return JsonResponse(erros)
        else:
            Usuários(name=nome, email = email, password = senha, user = user).save()
            request.session['username'] = user
            return JsonResponse({'ok': True, 'user':user})
    else:
        return JsonResponse({'erros':'metodo invalido'})

def entrar(request):
    if request.method == 'POST':
        erros = {}
        data = dict(request.POST)
        user = data['user-login'][0]
        senha = data['senha-login'][0]

        pw = Usuários.objects.filter(user=user).values('password')
        
        if pw.count() == 0:
            erros['user-login'] = 'Usuario nao encontrado'
        elif list(pw)[0]['password'] != senha:
            erros['senha-login'] = 'Senha incorreta'
        
        if len(erros.keys())>0:
            erros['ok'] = False
            return JsonResponse(erros)
        else:
            request.session['username'] = user
            return JsonResponse({'ok': True, 'user':user})
    else:
        return JsonResponse({'erros':'metodo invalido'})

def finalizar_sessao(request):
    request.session.pop('username', None)
    return JsonResponse({'ok':True})