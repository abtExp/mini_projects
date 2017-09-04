const url_stack = [],
    visited_stack = [],
    text = [];

function crawl(url, keyword) {
    fetch(url, {
            'method': 'GET',
            'mode': 'no-cors',
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
            // 'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
        })
        .then(res => {
            // console.log(res.url);
            console.log(res);
            if (res.status === 200) {
                console.log("Request Successfully recieved");
            }
        })
        .catch(err => {
            console.error('Error connecting ', err);
        })
}



window.onload = crawl('https://abtexp.github.io/vecto/');