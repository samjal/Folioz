
/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 10-02-2017
*/

//import * as firebase from "firebase";
//import { FB_CONFIG } from './providers/firebase/fb-config';
//import { HomePage } from './pages/home/home';
import { IndexPage } from './pages/index/index';
import { BuildPage } from './pages/build/build';

class MyApp {

  constructor(){
    // Initialize Firebase
    //firebase.initializeApp(FB_CONFIG);
    this.appBody = document.getElementsByTagName("app")[0];
  }

  start(){
    //new IndexPage(this.appBody);
    new BuildPage(this.appBody);
    // firebase.auth().onAuthStateChanged((user) =>{
    //   if (user) {
    //     // User is signed in.
    //     console.log('User IS log-> ', user)
    //     let userDataReady = {
    //       name: user.displayName,
    //       email: user.email
    //     }
    //     // init UserPage
    //     new IndexPage(this.appBody,userDataReady);
    //   } else {
    //     // No user is signed in.
    //     console.log('User NOT log.')
    //     // init HomePage
    //     let homePage = new HomePage(this.appBody);
    //   }

    };


}

let myApp = new MyApp();
myApp.start();
