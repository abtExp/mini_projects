var button = document.getElementById("submit");
button.onclick = ()=>{
  reset();
  var text = document.getElementById("search").value;
  console.log(text);
  var custom_search = make_searchable(text);
  var search_query = `https://www.googleapis.com/customsearch/v1?cx=014277323514955061643:ssgpdieesgc&key=AIzaSyCTY_ojDB2y_n66tcDhKV8J8qmSq6jf6oQ&q=${custom_search}`;
  var req_prom = new Promise((resolve,reject)=>{
    var xml_req = new XMLHttpRequest();
    xml_req.open('GET',search_query);
    xml_req.onreadystatechange = ()=>{
      var data = xml_req.responseText;
      if(data){
        console.log("Got Response. Resolving....");
        var parse = JSON.parse(data);
        resolve(parse);
      }
    }
    xml_req.send();
  })
  .then((data)=>{
    console.log(data);
    show_results(data);
  })
  .catch((err)=>{
    throw new Error("Can't Search" + err);
  });
};

function make_searchable(qry){
  var src_qry = qry.replace(" ","+");
  return src_qry;
}


function show_results(data){
  var title = document.getElementById("results");
  data.items.forEach((i)=>{
    var responseDiv = document.createElement('div');
    responseDiv.className = 'desc';
    var link = document.createElement('a');
    link.setAttribute('href',i.link);
    link.innerHTML = i.title + '<br />';
    responseDiv.appendChild(link);
    var description = document.createElement('p');
    description.innerHTML = i.snippet;
    responseDiv.appendChild(description);
    title.appendChild(responseDiv);
  });
}

function reset(){
  var title = document.getElementById("results");
  title.innerHTML = "";
}