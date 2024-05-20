// app-routing.module.ts
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrecalculationComponent} from "./components/precalculation/precalculation.component";
import {ApplicationFormComponent} from "./components/application-form/application-form.component";

const routes: Routes = [
  {path: '', component: PrecalculationComponent, data: {title: 'Pricing Calculator'}},
  {path: 'application-form', component: ApplicationFormComponent, data: {title: 'Membership Application'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
