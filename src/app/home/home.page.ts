import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { log } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  value: any = '';
  param: any = '';
  url: any = 'http://localhost:8000';
  // url: any = 'https://api.visity.io';
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((data) => {
      console.log(data.get('id'));
      this.param = data.get('id');
    });
  }
  validURL(str: any) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  ngOnInit() {
    if (!!this.param && this.param !== 'home') {
      try {    
        axios.get(`${this.url}/public/${this.param}`).then((data: any) => {
          let url = data.data.url;
          if (this.validURL(url)) {
            window.location.href = url;
          }
        })
      } catch (error) {
        console.log("error while redirect ",error)
      }
    }
    let array = [
      'events attendance',
      'visitor management',
      'customer onboarding',
      'employee onboarding',
      'co-working spaces',
      'sport academies',
      'corporate offices',
      'college & university',
    ];

    // setInterval(() => {

    //   let random: any = 0;
    //   random = Math.floor(Math.random() * (7 - 0)) + 0;
    //   console.log("Random: "+random);
    //   console.log(array[random]);

    //   this.value = array[random];

    // }, 2500);
  }
}
