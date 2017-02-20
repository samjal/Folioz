/**
* @Author: Samir Jalaleddine <webmaster-samir>
* @Date:   14-02-2017
* @Email:  samirj@outlook.com
* @Last modified by:   webmaster-samir
* @Last modified time: 14-02-2017
*/

//Barchart API
    var mes_option = ['GCM17', 'CLM17'];
    let symbol, endDate, type, maxRecords, interval,order;
    var hist_data = [symbol='GCM17',endDate='20170217',type='minutes',maxRecords='50',interval='10',order='asc'];
    var onDemand = new OnDemandClient();
    console.log(onDemand);
    onDemand.setAPIKey('d5b8a9ab15a1f94f122c3b0681bf88e5');
    onDemand.setJsonP(true);

    /* get a quote for AAPL and GOOG */
    onDemand.getQuote({symbols: mes_option.join(',')}, function (err, data) {
    //onDemand.getHistory({symbol:'GCM17',endDate:'20170217',type:'minutes',maxRecords:50,interval:10,order:'asc'}, function (err, data) {
        console.log('response-> ', data);
        var quotes = data.results;
        for (var i = 0; i < quotes.length; i++) {
            console.log(quotes[i].symbol, quotes[i].lastPrice);
            //console.log(quotes[i].symbol+ " [" + quotes[i].name + "] = " + JSON.stringify(quotes[i]));
        }
    });

import { buildSkeleton } from './build.ui';
import { HomePage } from '../../pages/home/home';

export class BuildPage {

  constructor(appBody,formInput){
    this.appBody = appBody
    this.formData = formInput
    this.pageTitle = 'Build Your Portfolio';
    this.initUI();
  }

  initUI(){
    // remove all section before display UI
    if(document.getElementsByTagName("section")[0]){
      document.getElementsByTagName("section")[0].parentNode.removeChild(document.getElementsByTagName("section")[0])
      $(document).ready(function(){
          $('.collapsible').collapsible();
        });
    }

    // format data
    let dataReady = {
      pageTitle: this.pageTitle,
      //userName: this.userName,
      //email: this.formData.email
    }
    // create page skeleton
    let pageSkeleton = buildSkeleton(dataReady) ;
    // add page skeleton in body
    this.appBody.insertAdjacentHTML( 'afterbegin', pageSkeleton )
    this.loadEventUI()

  }

  loadEventUI(){
      let productList = document.getElementsByTagName("ul")[0];
      //if(productList){
      productList.addEventListener("change",  event => this.hasChanged(event), false)
      console.log(productList);
      //}
  }

  hasChanged(event){
    console.log("target-->", event.target);
      let inputs = document.getElementsByTagName("input");
      console.log("start");
      console.log(inputs.length);
      //event.preventDefault()
      let listFolio = []
      let prod = {}
      //let form = this.input[0].elements
        for (let i = 0; i < inputs.length; i++) {

            if(inputs[i].getAttribute('name')==="product"){
                if(inputs[i].checked){
                  console.log(inputs[i].getAttribute('name'))
                  console.log(inputs[i].getAttribute('class'))
                  console.log(inputs[i].getAttribute('id'));
                  prod.symbol = inputs[i].getAttribute('id')
                  console.log("name",prod.symbol)
                  console.log(inputs[i].parentNode.nextSibling);
                  inputs[i].parentNode.nextSibling.style.display="block";
                  console.log(document.getElementById("qty").value)
                  let showPos = (inputs[i].getAttribute('id')+"Pos");
                  console.log(showPos)
                  let showQty = (inputs[i].getAttribute('id')+"Qty");
                  console.log(showQty)
                  //console.log(document.getElementById(showQty).value)
                } else {
                  inputs[i].parentNode.nextSibling.style.display="none";
                    $(inputs[i]).change(function(){
                    console.log("The text has been changed.");
                    });
                  //let showHide = document.getElementById('showId')
                  //showHide.style.display = showId.checked ? "block" : "none";
                  //console.log(showHide)
                  let newInput = inputs[i].getAttribute('id');
                  listFolio.push(newInput);
                  console.log(listFolio)
                }
            } else {
            //inputs[i].parentNode.nextSibling.style.display="none";
                console.log("no");
            }
        }

  }

  hasChanged1(event){
    console.log("target-->", event.target);
      let inputs = document.getElementsByTagName("input");
      console.log("start");
      console.log(inputs.length);
      //event.preventDefault()
      let listFolio = []
      let prod = {}
      //let form = this.input[0].elements
        for (let i = 0; i < inputs.length; i++) {

            if(inputs[i].getAttribute('name')==="product"){
                if(inputs[i].checked){
                  console.log(inputs[i].getAttribute('name'))
                  console.log(inputs[i].getAttribute('class'))
                  console.log(inputs[i].getAttribute('id'));
                  prod.symbol = inputs[i].getAttribute('id')
                  console.log("name",prod.symbol)
                  console.log(inputs[i].parentNode.nextSibling);
                  inputs[i].parentNode.nextSibling.style.display="block";
                  console.log(document.getElementById("qty").value)
                  let showPos = (inputs[i].getAttribute('id')+"Pos");
                  console.log(showPos)
                  let showQty = (inputs[i].getAttribute('id')+"Qty");
                  console.log(showQty)
                  //console.log(document.getElementById(showQty).value)
                } else {
                  inputs[i].parentNode.nextSibling.style.display="none";
                    $(inputs[i]).change(function(){
                    console.log("The text has been changed.");
                    });
                  //let showHide = document.getElementById('showId')
                  //showHide.style.display = showId.checked ? "block" : "none";
                  //console.log(showHide)
                  let newInput = inputs[i].getAttribute('id');
                  listFolio.push(newInput);
                  console.log(listFolio)
                }
            } else {
            //inputs[i].parentNode.nextSibling.style.display="none";
                console.log("no");
            }
        }

  }
}
