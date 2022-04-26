import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './usser/dashboard/dashboard.component';
import { DiseasesComponent } from './usser/diseases/diseases.component';
import { HomeComponent } from './usser/home/home.component';
import { QuestionsComponent } from './usser/questions/questions.component';
import { RulesComponent } from './usser/rules/rules.component';
import { SuggestionsComponent } from './usser/suggestions/suggestions.component';
import { SymptomsComponent } from './usser/symptoms/symptoms.component';
import { VeterinaryComponent } from './usser/veterinary/veterinary.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },{
    path : 'dashboard',
    component : DashboardComponent,
    children: [
    {
      path : 'home',
      component : HomeComponent
    },
    {
      path : 'symptoms',
      component : SymptomsComponent
    },
    {
      path : 'questions',
      component : QuestionsComponent
    },
    {
      path : 'diseases',
      component : DiseasesComponent
    },
    {
      path : 'rules',
      component : RulesComponent
    },
    {
      path : 'veterinary',
      component : VeterinaryComponent
    },
    {
      path : 'suggestions',
      component : SuggestionsComponent
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
