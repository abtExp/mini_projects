var btn = document.getElementById('send');
var usr = 'user';

btn.onclick = ()=>{
  var msg = document.getElementById('me').value;
  console.log(msg);
  var data = {
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
  var container = document.getElementById('container');
  var mdiv = document.createElement('div');
  var msg = document.createElement('p');
  msg.innerHTML = data.message;
  var time = document.createElement('p');
  time.innerHTML = data.time;
  var usr_img = document.createElement('img');
  usr_img.setAttribute('src','');
  usr_img.setAttribute('alt','sender\'s image');
  mdiv.appendChild(msg);
  mdiv.appendChild(time);
  mdiv.appendChild(usr_img);
  container.appendChild(mdiv);
}
