import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  value: any = ""; 

  constructor() { }



  ngOnInit() {


    let array = [
      "events attendance",
      "visitor management",
      "customer onboarding",
      "employee onboarding",
      "co-working spaces",
      "sport academies",
      "corporate offices",
      "college & university"
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
