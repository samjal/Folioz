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
      console.log('firebase ready-> ', this.database);
  }
}
