import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage{

  // url: any = "https://visity-backend.herokuapp.com";
  url: any = "https://api.visity.io";
  // url: any = "http://localhost:8000";
  token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NJZCI6IjYzOWFlZDg5NWMyOTYzMTNmY2I0MDkwNCIsImNsaWVudElkIjoiNjM5YWM3ZjU3ZDRmZWE0MDFiZWFlMzZmIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNjcxMTc1MjQzLCJleHAiOjMzMjA3MTc1MjQzfQ.B0t709EWafN0E0AhKQrA0PgaM36pWaIIQpFU251bxng";

  config : any = {};

  params: any = {};

  rsvpId: any = "";
  rsvpInfo: any = {};

  ShowLoading: boolean = true; 
  ShowError: boolean = false;
  ShowLogo: boolean = false;
  ShowDefaultRSVP: boolean = false;
  ShowSuccess: boolean = false;
 
  ShowSpinner: boolean = false;

  Comment: any = "";
   
  QRCodeValue = "";

  UserInfo: any = {};



  // For QR Code
  ShowEventInfo: boolean = false;
  ShowQRCode: boolean = false;
  ShowEmpInfo: boolean = false;

  ShowCheckMark: boolean = false;
  ShowRedCarpet: boolean = false;

  constructor(private alertController: AlertController, private route: ActivatedRoute, public router: Router, private socket: Socket) {}

  ngOnInit() {
  	console.log("ngOnInit");

    this.config = {
      headers:{
        Authorization: this.token,
      }
    };

    this.route.queryParams.subscribe(async params => {
      this.params = params;
      this.rsvpId = this.params.id;
      this.socketSetup()
      console.log("RSVP ID: "+this.rsvpId);

      if(params){

        this.GetRSVPInfo();

      }else{

        this.ShowError = true;
        this.ShowLoading = false;

      }

    });

  
  }
  socketSetup() {
    this.socket.connect();
    this.socket.fromEvent(`${this.rsvpId}`).subscribe(data => {
      console.log("updated data",data)
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
  GetRSVPInfo(){
    console.log("Get RSVP Info Function...");

    axios.get(
      this.url+ `/public/rsvp/`+this.rsvpId
      ).then(response => {
        console.log("Get RSVP Info API Response");

        console.log(response)
        this.ShowLoading = false;

        this.rsvpInfo = response.data;

        this.QRCodeValue = this.rsvpId;

        // update that they have opened the link
        this.UpdateRSVP();

        this.ShowLogo = true;
        this.ShowDefaultRSVP = true;


      }).catch(e => {

        console.log("Error :"+JSON.stringify(e));

        this.ShowLoading = false;
        this.ShowDefaultRSVP = false;
        this.ShowError = true;

      });


  }


  UpdateRSVP(){

    console.log("Update RSVP");

    let info: any = {
      linkOpened: true
    };

    axios.put(this.url + `/rsvp/`+this.rsvpId, info, this.config).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.log("error is : " + e)
    })

    


  }

}
 