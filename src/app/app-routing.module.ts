// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrecalculationComponent} from "./precalculation/precalculation.component";
import {ApplicationFormComponent} from "./application-form/application-form.component";

const routes: Routes = [
  { path: '', component: PrecalculationComponent },
  { path: 'application-form', component: ApplicationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
