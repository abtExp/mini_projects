const btn = document.getElementById('send');
const usr;

btn.onclick = ()=>{
  let msg = document.getElementById('me').value;
  console.log(msg);
  let data = {
    'message' : msg,
    'sender' : usr,
    'time' : new Date()
  }
  display_and_cache(data);
  send_to_server(data);
}

function send_to_server(msg_data){
  console.log(msg_data);
  fetch('/index',{
    method : 'POST',
    body  : JSON.stringify(msg_data),
    headers : new Headers({
      'Content-type' : 'application/json'
    })
  })
  .then((res)=>{
    console.log('sent the post request');
  })
  .catch((err)=>{
    console.log('can\'t fetch');
  })
}

function display_and_cache(data){
  let container = document.getElementById('container');
  let mdiv = document.createElement('div');
  let msg = document.createElement('p');
  msg.innerHTML = data.message;
  let time = document.createElement('p');
  time.innerHTML = data.time;
  let usr_img = document.createElement('img');
  usr_img.setAttribute('src','');
  usr_img.setAttribute('alt','sender\'s image');
  mdiv.appendChild(msg);
  mdiv.appendChild(time);
  mdiv.appendChild(usr_img);
  container.appendChild(mdiv);
}
