import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RsvpPageRoutingModule } from './rsvp-routing.module';

import { RsvpPage } from './rsvp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RsvpPageRoutingModule
  ],
  declarations: [RsvpPage]
})
export class RsvpPageModule {}
