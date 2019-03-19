(function (window, document){
  'use strict';
  const start = function(){
    let element = null,
        framework = null,
        routes = {},
        controllers = {},
        controllerCurrent = null,
        library = {
          getId: function(id){
            element = document.getElementById(id);
            return this;
          },
          get: function(id){
            return document.getElementById(id);
          },
          noSubmit: function(){
            element.addEventListener('submit',function(e){
              e.preventDefault();
            },false);
            return this;
          },
          controller: function(name, control){
            controllers[name] = {'controller': control};
          },
          getController: function(){
            return controllerCurrent;
          },
          router: function(){
            framework = element;
            return this;
          },
          route: function(route, template, controller, charge){
            routes[route] = {
              'template': template,
              'controller': controller,
              'charge': charge
            }
            return this;
          },
          routesManager: function(){
            let hash = window.location.hash.substring(1) || '/',
              posting = routes[hash],
              request = new XMLHttpRequest();

            if(posting && posting.template){
              if(posting.controller){
                controllerCurrent = controllers[posting.controller].controller;
              }
              request.addEventListener('load', function(){
                framework.innerHTML = this.responseText;
                setTimeout(function(){
                  if(typeof(posting.charge) === 'function'){
                    posting.charge();
                  }
                }, 500);
              }, false);
              request.open('get', posting.template, true);
              request.send(null);
            }else {
              window.location.hash = '#/';
            }
          }
        };
    return library;
  }
  if(typeof window.library === 'undefined'){
    window.library = window.$ = start();
    window.addEventListener('load', library.routesManager, false);
    window.addEventListener('hashchange', library.routesManager,false);
  }else{
    console.log('se esta llamando la libreria nuevamente');
  }
})(window, document)
