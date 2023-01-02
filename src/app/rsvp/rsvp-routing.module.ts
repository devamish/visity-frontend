import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RsvpPage } from './rsvp.page';

const routes: Routes = [
  {
    path: '',
    component: RsvpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RsvpPageRoutingModule {}
