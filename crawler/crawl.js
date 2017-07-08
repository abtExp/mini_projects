let init_url = 'https://abtexp.github.io/web_app',
visited_stack = [];
url_stack = [];

url_stack.push(init_url);
url_stack.map(i=>{
    if(visited_stack.find(i)) i = '';
    else crawl(i);
})


function crawl(url){
    fetch(url,{
         headers : {
             'Content-type' : 'text/html'
         }   
    })
    .then(data=>{
        visited_stack.push(url);
        url_stack.pop();
        let links = document.getElementsByTagName('a');
        links.forEach(i=>{
            url_stack.push(i);
        })
    })
}