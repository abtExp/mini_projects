const mail = document.getElementById('mail'),
pass = document.getElementById('pass'),
btn = document.getElementById('login'),
form = document.getElementById('form'),
glin = document.getElementById('glin'),
flin = document.getElementById('flin'),
pop = document.getElementById('pop_form'),
container = document.getElementById('form_container');
//dasda
btn.addEventListener('click',_=>{
    fetch(`userbase/${mail.value}`,{
        method : 'POST'
    })
    .then(res=>{
        if(res.status === 200){
            console.log('Logged in');
        }
    })
    .catch(err=>{
        console.log(err);
    })

    // form.submit();
})

function check(id,pass){
    if(id === '' || id === null || id.indexOf('@') === -1){
        return false;
    }
    if(pass === '' || pass === null || pass.length < 8){
        return false;
    }
    return true;
}

function generate_errors(){
    let err = document.createElement('p');
    err.innerHTML = 'Incorrect Username or Password';
    err.className = 'err';
    container.appendChild('err');
}