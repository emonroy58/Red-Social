(function(window, document){

    libreria.getID('vista').enrutar()
            .ruta('/','vistas/inicio.html',null,null)
            .ruta('/registro','vistas/procesos/registro.html','procesos',function(){
                libreria.getID('registroUser').noSubmit();
            })
            .ruta('/login','vistas/procesos/login.html','procesos',function(){
                libreria.getID('logUser').noSubmit();
            })
            .ruta('/red-social', 'vistas/procesos/editprofile.html','procesos',function(){
                libreria.getCtrl().observer();
            })
           

})(window, document);