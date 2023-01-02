import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhyVisityPageRoutingModule } from './why-visity-routing.module';

import { WhyVisityPage } from './why-visity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhyVisityPageRoutingModule
  ],
  declarations: [WhyVisityPage]
})
export class WhyVisityPageModule {}
