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
    let id = mail.value,
    passw = pass.value,
    creds = false,
    isOK = check(id,passw),
    succ = false;

    if(isOK){
        creds = true;
    }
    else{
        generate_errors();
    }

    if(creds){
        fetch(`/user_base/${id}`,{
            method : 'POST'
        })
        .then(res=>{
            if(res.status === 200){
                succ = true;
                console.log('Success');
                console.log(res.cred);
            }
        })
        .catch(err=>{
            console.error('Error finding the user');
        })
    }

    if(succ){
        fetch(`/home/${creds.id}`)
        .catch(err =>{
            console.error("An Error Occured");
        })
    }
    else{
        console.log("NAH< NOR +T");
    }


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