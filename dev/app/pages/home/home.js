/**
* @Author: Samir Jalaleddine <webmaster-samir>
* @Date:   14-02-2017
* @Email:  samirj@outlook.com
* @Last modified by:   webmaster-samir
* @Last modified time: 14-02-2017
*/

import { PortfolioPage } from '../../pages/portfolio/portfolio';
import { FavoritesPage } from '../../pages/favorites/favorites';
import { MarketsPage } from '../../pages/markets/markets';
import { BuildPage } from '../../pages/build/build';

export class HomePage {

  constructor(appBody,formInput){
    this.appBody = appBody
    this.formData = formInput
    this.pageTitle = 'Welcome';
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
        <div class="container">
          <h1>${this.pageTitle}</h1>
          <div class="row">
            <div class="col s6"><div class="waves-effect waves-light btn">Portfolios</div></div>
            <div class="col s6"><div class="waves-effect waves-light btn">Favorites</div></div>
          </div>
          <div class="row">
            <div class="col s6"><div class="waves-effect waves-light btn">Markets</div></div>
            <div class="col s6"><div class="waves-effect waves-light btn">Build Portfolio</div></div>
          </div>
          <div class="row">
            <div class="col s6"><div class="waves-effect waves-light btn">Sectors</div></div>
            <div class="col s6"><div class="waves-effect waves-light btn">Strategies</div></div>
          </div>
          <div class="row">
            <div class="col s12"><div class="waves-effect waves-light btn">Others</div></div>
          </div>
        </div>
      </section>`;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    this.loadEventUI()

    }

  loadEventUI(){

    // let googleBtn = document.getElementById("googleBtn");
    // googleBtn.addEventListener("click",  event => this.googleAuth(event), false)

  }

  // onLogin(event){
  //   event.preventDefault()
  //   let validationInput = 0
  //   let formInput = {}
  //   let form = document.forms[0].elements
  //   for (let i = 0; i < form.length; i++) {
  //     if(form[i].value){
  //       formInput[form[i].name] = form[i].value
  //       validationInput++
  //     }
  //   }
  //   console.log(formInput)
  //   if(validationInput === 2){
  //     console.log('load UserPage')
  //     new HomePage(this.appBody,formInput);
  //   }
  //}

  // googleAuth(event){
  //   event.preventDefault();
  //   console.log('google auth')
  //   this.fbService.googleAuth()
  //   .then((result) => {
  //     // This gives you a Google Access Token.
  //     // You can use it to access the Google API.
  //     let token = result.credential.accessToken;
  //     // The signed-in user info.
  //     let user = result.user;
  //     console.log('signed-in user info-> ', user)
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     let errorCode = error.code;
  //     let errorMessage = error.message;
  //     // The email of the user's account used.
  //     let email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     let credential = error.credential;
  //     console.log('Auth Handle Errors-> ', error)
  //     // ...
  //   });
  //
  // }

}
