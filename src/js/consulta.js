function printAll() {
    var tabla = document.getElementById('tablaAll');
    //const user = firebase.auth().currentUser;
    
    //db.collection('posts').doc(user.uid).collection('private_post').get()
    db.collection('posts').doc('2n53GrXHIggQrrWg58CPiD4qevj1').get()
    .then((snapshot) => {
      console.log(snapshot);
     
    })
}