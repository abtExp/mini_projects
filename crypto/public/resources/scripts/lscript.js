const mail = document.getElementById('mail'),
pass = document.getElementById('pass'),
btn = document.getElementById('login'),
glin = document.getElementById('glin'),
flin = document.getElementById('flin'),
pop = document.getElementById('pop_form'),
container = document.getElementById('form_container');

btn.addEventListener('click',_=>{
    let id = mail.value,
    passw = pass.value,
    isOK = check(id,passw),
    creds = null,
    succ = false;

    if(isOK){
        creds = {
            mail : id,
            pass : passw,
            time : new Date().getTime()
        }
    }
    else{
        generate_errors();
    }

    if(creds){
        fetch(`/user_base/${id}`,{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : {
                cred : JSON.stringify(creds)
            }
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