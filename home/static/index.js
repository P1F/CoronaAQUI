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

    var form = document.getElementById('login-box')
    var formdata = new FormData(form)

})

document.getElementById('send-register').addEventListener('click', function(){
    document.getElementById('rotateregister').style.display = 'block'

    document.getElementById('erroemail').textContent = ''
    document.getElementById('errouser-register').textContent = ''
    document.getElementById('errosenha-register').textContent = ''
    document.getElementById('errorepetirsenha').textContent = ''

    var form = document.getElementById('register-box')
    var formdata = new FormData(form)
    if (formdata.get('senha-register') != formdata.get('repetirsenha')){
        document.getElementById('errorepetirsenha').textContent = 'As senhas devem ser idênticas.'
        document.getElementById('rotateregister').style.display = 'none'
        return
    }

})