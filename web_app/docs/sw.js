var cache_name = 'cache_v';
var cache_items = ['/',
'/home.html',
'/style.css',
'/web_app.js',
'/about.html'
];

var data_cache_name = 'data_cache';

self.addEventListener('install',(e)=>{
  console.log('Installing Service worker...');
  console.log(`Caching files : `);
  e.waitUntil(
    caches.open(cache_name)
    .then((cache)=>{
      console.log('adding files now .... ');
      cache.addAll(cache_items);
      console.log("Files cached.");
    })
    .catch((err)=>{
      console.log("Can't Cache files. Error : " + err);
    })
  );

});

self.addEventListener('activate',(e)=>{
  console.log("Service worker activated... Removing Obsolete data....");
  e.waitUntil(
    caches.keys().then((keys)=>{
      return Promise.all(keys.map((key)=>{
        if(key !== cache_name && key !== data_cache_name){
          console.log("Removing old cache... ",key);
          return caches.delete(key);
        }
      }))
    })
  )
  return self.clients.claim();
});

self.addEventListener('fetch',(e)=>{
  //direct fetch requests for cache first and then network apprach
  console.log(`Fetching ${e.request.url}`);
  var url = 'https://api.github.com/users/abt10/repos';
  if(e.request.url.indexOf(url) > -1){
    e.respondWith(
      caches.open(data_cache_name).then((cache)=>{
        return fetch(e.request).then((res)=>{
          cache.put(e.request.url,res.clone());
          return res;
        });
      })
    );
  }

  else{
    e.respondWith(caches.match(e.request).then((res)=>{
      return res || fetch(e.request);
  })
)
}
});
