const area = document.querySelector('#text'),
    button = document.getElementById('play'),
    stack = [],
    tags = [{ name: 'a', auto_close: false },
        { name: 'abbr', auto_close: false },
        { name: 'address', auto_close: false },
        { name: 'area', auto_close: false },
        { name: 'article', auto_close: false },
        { name: 'aside', auto_close: false },
        { name: 'audio', auto_close: false },
        { name: 'b', auto_close: false },
        { name: 'base', auto_close: true },
        { name: 'bdi', auto_close: false },
        { name: 'bdo', auto_close: false },
        { name: 'blockquote', auto_close: false },
        { name: 'body', auto_close: false },
        { name: 'br', auto_close: true },
        { name: 'button', auto_close: false },
        { name: 'canvas', auto_close: false },
        { name: 'caption', auto_close: false },
        { name: 'cite', auto_close: false },
        { name: 'code', auto_close: false },
        { name: 'col', auto_close: true },
        { name: 'colgroup', auto_close: false },
        { name: 'command', auto_close: false },
        { name: 'div', auto_close: false },
        { name: 'em', auto_close: false },
        { name: 'footer', auto_close: false },
        { name: 'form', auto_close: false },
        { name: 'h1', auto_close: false },
        { name: 'h2', auto_close: false },
        { name: 'h3', auto_close: false },
        { name: 'h4', auto_close: false },
        { name: 'h5', auto_close: false },
        { name: 'h6', auto_close: false },
        { name: 'head', auto_close: false },
        { name: 'header', auto_close: false },
        { name: 'html', auto_close: false },
        { name: 'i', auto_close: false },
        { name: 'img', auto_close: false },
        { name: 'input', auto_close: true },
        { name: 'link', auto_close: true },
        { name: 'li', auto_close: false },
        { name: 'meta', auto_close: true },
        { name: 'nav', auto_close: false },
        { name: 'noscript', auto_close: false },
        { name: 'p', auto_close: false },
        { name: 'script', auto_close: false },
        { name: 'style', auto_close: false },
        { name: 'title', auto_close: false },
        { name: 'textarea', auto_close: false }
    ];

let s_div = document.getElementById('u'),
    suggestions = [];

class tag {
    constructor() {
        this.name = '';
        this.gotName = false;
        this.isOpen = true;
    }
}

let checkState = false,
    end = 0;

area.addEventListener('keypress', e => {
    // 60 - < , 47 - / , 62 - >

    end = area.selectionEnd;

    //creation of a new tag (<)
    let t;
    if (e.keyCode === 60) {
        checkState = true;
        return;
    }

    //checking if the tag is being closed (</)
    if (checkState && e.keyCode === 47) {
        e.preventDefault();
        re_render(e.key, `${stack.pop().name}>`)
        checkState = false;
    }

    //checking for braces and brackets ({},[])
    if (e.keyCode === 123 || e.keyCode === 91) {
        e.preventDefault();
        re_render(e.key, String.fromCharCode(e.keyCode + 2));
    }

    //checking for parantheses (())
    if (e.keyCode === 40) {
        e.preventDefault();
        re_render(e.key, String.fromCharCode(41));
    }

    //DOCTYPE TAG
    if (checkState && e.keyCode === 33) checkState = false;

    //getting tag name
    if (checkState && e.keyCode !== 47) {
        t = new tag();
        stack.push(t);
        checkState = false;
    }

    //adding to tag name	
    if (e.keyCode === 62 && !stack[stack.length - 1].gotName) {
        stack[stack.length - 1].gotName = true;
        let [found, val] = search(stack[stack.length - 1], true);
        if (found) {
            e.preventDefault();
            re_render(e.key, val);
        }
    }

    //checking for quotes
    if (e.keyCode === 39 || e.keyCode === 34) {
        e.preventDefault();
        re_render(e.key, e.key);
    } else if (stack.length > 0 && !stack[stack.length - 1].gotName) {
        stack[stack.length - 1].name += e.key;
        if (e.keyCode === 32) {
            stack[stack.length - 1].gotName = true;
            stack[stack.length - 1].name = stack[stack.length - 1].name.trim();
        }
        let [found, val] = search(stack[stack.length - 1]);
        if (found) {
            e.preventDefault();
            re_render(e.key, val);
        }
    }
})

area.addEventListener('keydown', e => {
    if (e.which === 8 && stack.length > 0 && stack[stack.length - 1].gotName === false) {
        console.log('you deleted');
        stack[stack.length - 1].name = stack[stack.length - 1].name.slice(0, -1);
    }
})

function search(key, closed = false) {
    console.log('Searching');
    s_div.innerHTML = '';
    suggestions = [];
    let found = false,
        val = '';
    for (let i of tags) {
        if (i.name.includes(key.name)) {
            suggestions.push(i.name);
        }
        if (i.name === key.name) {
            found = true;
            if (i.auto_close === false && closed === true) {
                stack.pop();
                val = `</${key.name}>`;
            } else if (i.auto_close) {
                stack.pop();
                val = ' />';
            }
        }
    }

    show_suggestions(suggestions);
    return [found, val];
}

function show_suggestions(s) {
    for (let i of s) {
        let li = document.createElement('li');
        li.innerHTML = i;
        s_div.appendChild(li);
    }
}

function re_render(key, val) {
    let preval = area.value.substring(0, end);
    end++;
    preval += key + val;
    preval += area.value.substring(end - 1, area.value.length);
    area.value = preval;
    area.selectionEnd = end;
}

button.addEventListener('click', () => {
    let html = area.value;
    if(determine(html)){
        let win = window.open();
       win.document.write(html);
    }
    else eval(html);
})


function determine(text){
    return text.match(/\<|\>/);
}
