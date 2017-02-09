
/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 08-02-2017
*/

import * as firebase from "firebase";
import { FB_CONFIG } from './providers/firebase/fb-config';
import { HomePage } from './pages/home/home';

class MyApp {

  constructor(){
    // Initialize Firebase
    firebase.initializeApp(FB_CONFIG);
    this.appBody = document.getElementsByTagName("app")[0];
  }

  start(){
    // init HomePage
    let homePage = new HomePage(this.appBody);
  }

}

let myApp = new MyApp();
myApp.start();
