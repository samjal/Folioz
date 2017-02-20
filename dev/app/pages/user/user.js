
/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-09-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 10-02-2017
*/

import { userSkeleton } from './user.ui';
import { UnsplashService } from '../../providers/unsplash/unsplash-service';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { TimerComponent } from '../../components/timer-component';

export class UserPage {

  constructor(appBody,formInput){
    this.appBody = appBody;
    this.formData = formInput;
    this.pageTitle = this.greetings();
    this.userName = this.getUserName();
    this.database = new FirebaseService();
    this.initUI();
    this.watchDB(); // need DOM ready to add elements
  }

  initUI(){
    // remove all section before display UI
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
    }

    // format data
    let dataReady = {
      pageTitle: this.pageTitle,
      userName: this.userName,
      email: this.formData.email
    }
    // create page skeleton
    let pageSkeleton = userSkeleton(dataReady) ;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    $(".button-collapse").sideNav();
    this.loadEventUI()
    document.getElementsByTagName("section")[0].style.opacity = 0;
    new TimerComponent();
    this.getBackgroundIMG()
  }



  getBackgroundIMG(){
      let unsplash = new UnsplashService();
      let queryService = unsplash.getRandomImg()
      queryService.then((response)=>{
        //console.log('res 1 -> ', response)
         this.displayBackground(JSON.parse(response))
         return response
       })
       .then((response)=>{
         this.displayImgInfo(JSON.parse(response));
       })
  }

  displayBackground(data){
    console.log('service response-> ')
    console.log( data[0] )
    let pageContainer = document.getElementsByTagName("section")[0]
    if(pageContainer){
      // some css with JS for BG
      pageContainer.style.height = `100%`;
      pageContainer.style.width = `100%`;
      pageContainer.style.position = `absolute`;
      pageContainer.style.top = `0`;
      pageContainer.style.left = `0`;
      pageContainer.style.padding = `0px`;
      pageContainer.style.textAlign = `center`;
      pageContainer.style.color = `#fff`;
      pageContainer.style.opacity = `1`;
      pageContainer.style.background = `url(${data[0].urls.regular}) center center no-repeat`;
      pageContainer.style.backgroundSize = `cover`;

    }
  }

  displayImgInfo(data){
    console.log('displayImgInfo-> ',data)
    // add author info
    let addressContainer = document.getElementsByTagName("address")[0]
    if(addressContainer){
      addressContainer.style.cursor = 'pointer';
      addressContainer.style.textDecoration = 'underline';
      addressContainer.innerHTML = `${data[0].user.name}`
      addressContainer.addEventListener('click', event =>
        this.onGoToLink(event, data[0].user.links.html), false
      )
    }
    // add download link for img
    let downEl = document.getElementById("download")
    if(downEl){
      downEl.addEventListener('click', event =>
        this.onGoToLink(event, data[0].links.download), false
      )
    }
  }

  onGoToLink(event,url){
    event.preventDefault();
    let win = window.open(url, '_blank');
    win.focus();
  }

  greetings(){
    let time = new Date();
    let greetings;
    switch (true) {
      case time.getHours()>5 && time.getHours()<=10:
        greetings = 'Good morning'
        break;
      case time.getHours()>=11 && time.getHours()<=17:
        greetings = 'Hello'
        break;
      default:
        greetings = 'Good evening'
    }
    return greetings
  }

  getUserName(){
    // return usernal with first letter Cappitalized
    return this.formData.email.split("@")[0].split(' ').map(c => c.slice(0, 1).toUpperCase() + c.slice(1)).join(' ')
  }

  loadEventUI(){
    let linkSettingForm = document.getElementById('linkSettingForm')
    if(linkSettingForm){
      linkSettingForm.addEventListener('submit', (event)=> this.saveLinkData(event))
    }
    let linkList = document.getElementById('linkList')
    if(linkList){
      linkList.addEventListener('click', (event)=> this.detectClick(event))
    }

    let logout = document.getElementById('logout')
    if(logout){
      logout.addEventListener('click', _=> this.database.logOut())
    }
  }

  saveLinkData(event){
    event.preventDefault()
    let dataReady = {}
    let elementsForm = document.getElementById('linkSettingForm').elements
    for (var i = 0; i < elementsForm.length; i++) {
      if(elementsForm[i].value){
        //console.log(elementsForm[i].name, elementsForm[i].value);
        dataReady[elementsForm[i].name] = elementsForm[i].value
      }
    }
    console.log('dataReady-> ',dataReady);
    // is a update
    if(dataReady.key){
      // capture item.key
      let updateItemID = dataReady.key;
      // then remove key from dataReady
      delete dataReady.key;
      console.log(updateItemID, dataReady)
      let updatedItem = this.database.update('linksList/'+this.formData.uid, updateItemID, dataReady)
      updatedItem.then((error)=>{
        if(error){
          console.log('Error update result-> ', error)
        }
      })
    }
    // else if is a new item
    else {
      this.database.create('linksList/'+this.formData.uid,dataReady)
        .then(
          result => {
            console.log('success on added-> ', result.key);
          },
          error =>  {
            console.log('error on added');
          }
        )
    }

  }

  watchDB(){
    // defin DB ref()
    let linksListDB = this.database.read('linksList/'+this.formData.uid)

    // watch all child_added
    linksListDB.on('child_added',
      (response)=>{
        console.log('onChild_added: item-> ', response.val());
        this.displayLinkinAside(response)
        this.displayLinkinApp(response)
      },
      (error)=>{
        console.log('error read-> ', error);
      }
    )

    // watch all child_changed
    linksListDB.on('child_changed',
      (response)=>{
        console.log('onChild_changed: item-> ', response.val());
        this.displayLinkinAside(response)
        this.displayLinkinApp(response);
      },
      (error)=>{
        console.log('error read-> ', error);
      }
    )
  }

  displayLinkinAside(item){
    let linkList = document.getElementById('linkList')
    if(linkList){
      // remove default text on empty linkList
      if(document.getElementById("noLinks")){
        document.getElementById("noLinks").parentNode.removeChild(document.getElementById("noLinks"))
      }
      // test if item already exist
      if(document.getElementById(item.key)){
        document.getElementById(item.key).innerHTML = `
          <p>
            ${item.val().title}: ${item.val().url}
            <button>edit</button>
            <button class="dell">dell</button>
          </p>
        `;
      }
      // else is a new item element
      else {
        let itemSkeleton = `
          <div id="${item.key}">
            <p>
              ${item.val().title}: ${item.val().url}
              <button>edit</button>
              <button class="dell">dell</button>
            </p>
          </div>
        `
        linkList.insertAdjacentHTML('afterbegin', itemSkeleton)
      }

    }
  }

  displayLinkinApp(item) {
    let btnList = document.getElementById('btnList')
    if(btnList){
      console.log('ppp');
      let itemSkeleton = `
        <a class="waves-effect waves-light btn" href="${item.val().url}" target="_blank" title="${item.val().title}">
          ${item.val().title}
        </a>
      `;
      btnList.insertAdjacentHTML('afterbegin', itemSkeleton)
    }
  }
  detectClick(event){
    event.preventDefault();
    // if click is not on a btn
    if(event.target.nodeName != 'BUTTON'){
      return;
    }
    // if is click on dell btn (check if element have class name)
    if(event.target.className.indexOf('dell') > -1){
      this.dellItem(event)
      return;
    }
    // else is click on edit btn
    this.loadDataInForm(event)
  }

  loadDataInForm(event){

    let itemID = event.target.parentElement.parentElement.id;
    let itemData = this.database.read('linksList/'+this.formData.uid+'/'+itemID)
    itemData.once('value').then((item)=>{
      if(item.val() === null){
        return;
      }
      console.log('item finded-> ', item.val())
      // petit cadeau: document.querySelector()
      // à la jQuery style ;-)
      // doc => https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
      document.querySelector("input[name='key']").value = item.key
      document.querySelector("input[name='title']").value = item.val().title
      document.querySelector("input[name='url']").value = item.val().url
    })
  }

  dellItem(event){
    console.log('delete item')
    let itemID = event.target.parentElement.parentElement.id;
    let deleteItem = this.database.delete('linksList/'+this.formData.uid, itemID)
    deleteItem.then((error)=>{
      if(error){
        console.log('Error update result-> ', error)
      }
      else {
        // remove item from list with JS
        if(document.getElementById(itemID)){
          document.getElementById(itemID).parentNode.removeChild(document.getElementById(itemID))
        }
      }
    })
  }
}
