self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(
    fetch(e.request.url,{cache:'no-store'}).then(function(r){
      var c=r.clone();
      caches.open('mm-app').then(function(x){x.put(e.request.url.split('?')[0],c)});
      return r;
    }).catch(function(){
      return caches.match(e.request.url.split('?')[0]).then(function(m){return m||caches.match('./')||caches.match('index.html')});
    })
  );
});
