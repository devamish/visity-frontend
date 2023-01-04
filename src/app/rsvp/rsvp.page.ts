import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import axios from 'axios';
import { info } from 'console';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.page.html',
  styleUrls: ['./rsvp.page.scss'],
})
export class RsvpPage{

  url: any = "https://api.visity.io";
  // url: any = "https://visity-backend.herokuapp.com";
  // url: any = "https://ffqpg5rkag.execute-api.ap-south-1.amazonaws.com/dev";
  token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NJZCI6IjYzOWFlZDg5NWMyOTYzMTNmY2I0MDkwNCIsImNsaWVudElkIjoiNjM5YWM3ZjU3ZDRmZWE0MDFiZWFlMzZmIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNjcxMTc1MjQzLCJleHAiOjMzMjA3MTc1MjQzfQ.B0t709EWafN0E0AhKQrA0PgaM36pWaIIQpFU251bxng";

  config : any = {};

  params: any = {};
  
  eventId: any = "";
  eventInfo: any = {};
  FormInfo: any = {};

  rsvpId: any = "";
  shortURL: any = "";


  ShowLoading: boolean = true;
  ShowError: boolean = false;
  ShowLogo: boolean = false;
  ShowDefaultRSVP: boolean = false;
  ShowSuccess: boolean = false;
 
  ShowSpinner: boolean = false;

  Comment: any = "";
   
  QRCodeValue = "";

  constructor(private alertController: AlertController, private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
  	console.log("ngOnInit");

    this.config = {
      headers:{
        Authorization: this.token,
      }
    };

    this.route.queryParams.subscribe(async params => {
      this.params = params;
      this.eventId = this.params.id;
      console.log("Event ID: "+this.eventId);

      if(params){

        this.GetEventInfo();

      }else{

        this.ShowError = true;
        this.ShowLoading = false;

      }



    });

  }

  GetEventInfo(){
    console.log("Get Event Info Function...");

    axios.get(
      this.url+ `/public/event/`+this.eventId).then(response => {
        console.log("Get Event Info API Response");

        console.log(response)
        this.ShowLoading = false;

        this.eventInfo = response.data;

        console.log("--------------------");
        // console.log("SMS Event Name: "+this.eventInfo.customFields.smsEventName);
        console.log("--------------------");

        this.ShowLogo = true;
        this.ShowDefaultRSVP = true;

      }).catch(e => {

        console.log("Error :"+JSON.stringify(e));

        this.ShowLoading = false;
        this.ShowDefaultRSVP = false;
        this.ShowError = true;

      });


  }


  Submit(){

    this.ShowSpinner = true;

    console.log("Submit");
    console.log(this.FormInfo);

    // alert("Development in progress");

    // Check if user exists by calling the register user API

    axios.get(
      this.url+ `/checkuser/`+this.FormInfo.mobile).then(response => {
        console.log("Check if Mobile Exists API Response");

        console.log(JSON.stringify(response));

        let resp: any = response;

        
        if(resp.data.exist == false){

          console.log("User Exists: "+resp.data.exist);
          console.log("User Does Not Exist. Create New User...");
          this.CreateUser();

        }else{

          console.log("User Exists");
          console.log("UserId: "+resp.data._id);

          let info: any = {
            userId: resp.data._id,
            clientId: this.eventInfo.clientId._id,
            eventId: this.eventId,
            RSVP: "Not Arrived",
            status: "Not Arrived"
          }

          console.log("Add RSVP Payload: "+info);
          console.log(JSON.stringify(info));

          this.addRsvp(info);

        }


      }).catch(e => {

        console.log("Error :"+JSON.stringify(e));

        this.ShowLoading = false;


      });



  }


  CreateUser(){

    axios.post(
      this.url+ `/user`, this.FormInfo).then(response => {
        console.log("Create User API Response");

        console.log(JSON.stringify(response));

        console.log("UserId: "+response.data._id);

        this.FormInfo.userId = response.data._id;
        this.FormInfo.clientId = this.eventInfo.clientId._id;
        this.FormInfo.eventId = this.eventId;
        this.FormInfo.comments = "";
        this.FormInfo.RSVP = "Not Arrived";
        this.FormInfo.status = "Not Arrived";

        let info: any = {
          userId: response.data._id,
          clientId: this.eventInfo.clientId._id,
          eventId: this.eventId,
          RSVP: "Not Arrived",
          status: "Not Arrived"
        }

        console.log("add RSVP Payload: "+JSON.stringify(info));

        console.log(info);

        this.addRsvp(info);

      }).catch(e => {

        alert("Oops, something went wrong!");
        console.log("Create User API Error :"+JSON.stringify(e));

      });

  }


  addRsvp(info: any){

    axios.post(
      this.url+ `/rsvp`, info).then(response => {
        console.log("Add RSVP API Response");

        console.log(JSON.stringify(response));

        console.log(response.data._id);

        this.rsvpId = response.data._id;

        this.ShortenURL(this.rsvpId);

        // this.ShowLogo = false;
        // this.ShowDefaultRSVP = false;
        // this.ShowSuccess = true;
      


      }).catch(e => {

        alert("Oops, something went wrong!");
        console.log("Add RSVP API Error :"+JSON.stringify(e));

      });


  }


  // 1pt.co
  ShortenURLDEP2(rsvpId: any){

    console.log("Shorten URL"); 

    axios.get("https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url=https://visity.io/qrcode?id="+rsvpId)
    .then((response)=>{

      console.log("Shorten URL API Response");

      console.log(response);

      let data = response.data;

      this.shortURL = "https://1pt.co/"+data.short;
      console.log("Short URL is: "+this.shortURL);
      this.SendSMS();

    }).catch(e => {

      // alert("Oops, SMS !");
      console.log("Shorten URL Error :"+JSON.stringify(e));

    });


  }


    // visity.io
    ShortenURL(rsvpId: any){

      console.log("Shorten URL");
      console.log("RSVP ID: "+rsvpId);
  
      let info = {
        orgUrl: "https://visity.io/qrcode?id="+rsvpId
      };
  
      console.log("Payload: "+info);
  
      axios.post(
        'https://api.visity.io/public/shortUrl', info
        ).then(response => {
          console.log("Short URL API Response");
  
          console.log(response);
          console.log(response.data.shortUrl);
  
          this.shortURL = response.data.shortUrl;
  
          if(response.data != "Error"){
            
            console.log("Shortening Successful");
            console.log("Trigger Send SMS");
            this.SendSMS();
  
            this.ShowLogo = false;
            this.ShowDefaultRSVP = false;
            this.ShowSuccess = true;
  
          }      
  
        }).catch(e => {
  
          alert("Oops, something went wrong!");
          console.log("Shorten URL API Error :"+JSON.stringify(e));
  
        });
  
  
    }


  // short.io
  ShortenURLDEP(rsvpId: any){

    console.log("Shorten URL");
    console.log("RSVP ID: "+rsvpId);

    let info = {
      longURL: "https://qrcode.visity.io/home?id="+rsvpId
    };

    console.log("Payload: "+info);

    axios.post(
      'https://us-central1-visity-fcbd6.cloudfunctions.net/widgets/shortio-shorten-url', info
      ).then(response => {
        console.log("Short URL API Response");

        console.log(response);
        console.log(response.data);

        this.shortURL = response.data;

        if(response.data != "Error"){
          
          console.log("Shortening Successful");
          console.log("Trigger Send SMS");
          this.SendSMS();

          this.ShowLogo = false;
          this.ShowDefaultRSVP = false;
          this.ShowSuccess = true;

        }      

      }).catch(e => {

        alert("Oops, something went wrong!");
        console.log("Shorten URL API Error :"+JSON.stringify(e));

      });


  }



  SendSMS(){

    console.log("Send SMS");

    // this.FormInfo.name = "Amish Guy",
    // this.FormInfo.mobile = "8128332291",
    // this.shortURL = "https://go.visity.io/Zq8HeZ"

    let info = {
      Name: this.FormInfo.name,
      Mobile: this.FormInfo.mobile,
      EventName: this.eventInfo.customFields.smsEventName,
      eTicketURL: this.shortURL
    };

    axios.post(
      'https://us-central1-visity-fcbd6.cloudfunctions.net/widgets/even-registration-eticket', info
      ).then(response => {
        console.log("Send SMS API Response");

        console.log(response);
        console.log(response.data);
        this.ShowSpinner = false;
        this.ShowSuccess = true;
        this.ShowLogo = false;
        this.ShowDefaultRSVP = false;


      }).catch(e => {

        // alert("Oops, SMS !");
        console.log("Send SMS API Error :"+JSON.stringify(e));

      });


  }

}
 