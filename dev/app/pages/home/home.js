/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 10-02-2017
*/

import { UserPage } from '../../pages/user/user';
import { FirebaseService } from '../../providers/firebase/firebase-service';

export class HomePage {

  constructor(appBody){
    this.appBody = appBody
    this.pageTitle = 'Welcome';
    this.fbService = new FirebaseService();
    this.initUI();
  }

  initUI(){
    // remove all section before display UI
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
    }
    // create page skeleton
    let pageSkeleton = `
      <section>
        <h1>${this.pageTitle}</h1>
        <form>
          <p>
            <label for="email">Email:</label> <input type="email" name="email" value="" placeholder="votreemail.ch"  /><br/>
            <label for="password">Password:</label> <input type="password" name="password" value=""  /><br/>
            <button>Login</button>
          </p>
        </form>
        <button id="googleBtn">Log with Google</button>
      </section>`;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    this.loadEventUI()

  }

  loadEventUI(){
    let loginForm = document.getElementsByTagName("form")[0];
    loginForm.addEventListener("submit",  event => this.onLogin(event), false)

    let googleBtn = document.getElementById("googleBtn");
    googleBtn.addEventListener("click",  event => this.googleAuth(event), false)

  }

  onLogin(event){
    event.preventDefault()
    let validationInput = 0
    let formInput = {}
    let form = document.forms[0].elements
    for (let i = 0; i < form.length; i++) {
      if(form[i].value){
        formInput[form[i].name] = form[i].value
        validationInput++
      }
    }
    console.log(formInput)
    if(validationInput === 2){
      console.log('load UserPage')
      new UserPage(this.appBody,formInput);
    }
  }

  googleAuth(event){
    event.preventDefault();
    console.log('google auth')
    this.fbService.googleAuth()
    .then((result) => {
      // This gives you a Google Access Token.
      // You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      console.log('signed-in user info-> ', user)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      console.log('Auth Handle Errors-> ', error)
      // ...
    });

  }

}
