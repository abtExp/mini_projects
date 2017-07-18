const url_stack = [],
visited_stack = [],
text = [];

function crawl(url,keyword){
    fetch(url,{
        headers : {
            'Content-type':'text/html',
            'Access-Control-Allow-Origin' : 
        }
    })
    .then(res=>{
        if(res.status === 200){
            console.log("Request Successfully recieved");
        }
    })
    .catch(err=>{
        console.error('Error connecting ',err);
    })
}


window.onload = crawl('https://github.com');