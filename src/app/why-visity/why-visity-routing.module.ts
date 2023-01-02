import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhyVisityPage } from './why-visity.page';

const routes: Routes = [
  {
    path: '',
    component: WhyVisityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhyVisityPageRoutingModule {}
