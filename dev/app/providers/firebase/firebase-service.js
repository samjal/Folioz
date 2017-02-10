/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   08-02-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-02-2017
*/

import * as firebase from "firebase";

export class FirebaseService{

  constructor(){
    this.database = firebase.database();
    this.auth = firebase.auth();
    console.log('firebase ready-> ', this.database);
  }

  create(collection, datasObject) {
    // define firebase collection with correct style
    collection = `${collection}/`;

    return new Promise((resolve, reject) => {
        let created = this.database.ref(collection).push(datasObject);
        if(created) {
            resolve(created);
        }
        else {
            reject("The write operation failed");
        }
    });
  }

  read(collection){
    return this.database.ref(collection);
  }

  update(collection, key, datasObject){
    collection = `${collection}/`;
    return this.database.ref(collection).child(key).update(datasObject);
  }

  delete(collection, key){
    collection = `${collection}/`;
    return this.database.ref(collection).child(key).remove();
  }

  googleAuth(){
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(googleProvider)
  }

  logOut(){
    let confirmBox = window.confirm("Realy want to logout??");
    if (confirmBox != true) {
      return;
    }
    this.auth.signOut().then(() => {
      // Sign-out successful.
      console.log('Sign-out successful')
    }, (error) => {
      // An error happened.
      console.log('Sign-out error happened')
    });
  }
}
