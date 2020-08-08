window.onload = function(){
    document.getElementById('entrar').addEventListener('click', function(){
        document.getElementById('register-container').style.display = 'none'
        var login = document.getElementById('login-container')
        if(login.style.display == 'block')
            login.style.display = 'none'
        else
            login.style.display = 'block'
    })

    document.getElementById('cadastrar').addEventListener('click', function(){
        document.getElementById('login-container').style.display = 'none'
        var login = document.getElementById('register-container')
        if(login.style.display == 'block')
            login.style.display = 'none'
        else
            login.style.display = 'block'
    })

    document.getElementById('send-login').addEventListener('click', function(){
        document.getElementById('rotatelogin').style.display = 'block'

        document.getElementById('errouser-login').textContent = ''
        document.getElementById('errosenha-login').textContent = ''

        var formdata = new FormData(document.getElementById('login-box'))
        var xhr = new XMLHttpRequest;
        xhr.open('POST', 'registros/usuario/entrar')
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText)
                if (!data['ok']){
                    Object.keys(data).forEach((key, index)=>{
                        if (key!='ok')
                            document.getElementById('erro'+key).textContent = data[key]
                    })
                }
                document.getElementById('rotatelogin').style.display = 'none'
            }
        };
        xhr.send(formdata)

    })

    //TRIGGER DE ENVIAR DADOS DO REGISTER PARA O BANCO DE DADOS
    document.getElementById('send-register').addEventListener('click', function(){
        //MOSTRA BOLINHA GIRANDO E LIMPA CAMPOS DE ERRO
        document.getElementById('rotateregister').style.display = 'block'
        document.getElementById('erronome').textContent = ''
        document.getElementById('erroemail').textContent = ''
        document.getElementById('errouser-register').textContent = ''
        document.getElementById('errosenha-register').textContent = ''
        document.getElementById('errorepetirsenha').textContent = ''

        //ADQUIRE OS DADOS DO FORMULARIO
        var formdata = new FormData(document.getElementById('register-box'))

        //VERIFICAÇÃO CLIENT SIDE
        if (formdata.get('senha-register') != formdata.get('repetirsenha')){
            document.getElementById('errorepetirsenha').textContent = 'As senhas devem ser idênticas.'
            document.getElementById('rotateregister').style.display = 'none'
            return
        }

        //REQUISIÇÃO AJAX
        var xhr = new XMLHttpRequest;
        xhr.open('POST', 'registros/usuario/registrar')
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText)
                if (!data['ok']){
                    Object.keys(data).forEach((key, index)=>{
                        if (key!='ok')
                            document.getElementById('erro'+key).textContent = data[key]
                    })
                }
                document.getElementById('rotateregister').style.display = 'none'
            }
        };
        xhr.send(formdata)

    })
}