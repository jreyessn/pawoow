import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CheckPermissionGuard } from './shared/permissions-handler/permissions.guard';
import { DashboardComponent } from './usser/dashboard/dashboard.component';
import { DiseasesComponent } from './usser/diseases/diseases.component';
import { HomeComponent } from './usser/home/home.component';
import { QuestionsComponent } from './usser/questions/questions.component';
import { RulesComponent } from './usser/rules/rules.component';
import { SuggestionsComponent } from './usser/suggestions/suggestions.component';
import { SymptomsComponent } from './usser/symptoms/symptoms.component';
import { UsersComponent } from './usser/users/users.component';
import { VeterinaryComponent } from './usser/veterinary/veterinary.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivateChild: [CheckPermissionGuard],
    children: [
      {
        path : 'home',
        component : HomeComponent,
      },
      {
        path : 'symptoms',
        component : SymptomsComponent,
        data: {
          codModulo: "M05",
        }
      },
      {
        path : 'questions',
        component : QuestionsComponent,
        data: {
          codModulo: "M08",
        }
      },
      {
        path : 'diseases',
        component : DiseasesComponent,
        data: {
          codModulo: "M06",
        }
      },
      {
        path : 'rules',
        component : RulesComponent,
        data: {
          codModulo: "M09",
        }
      },
      {
        path : 'veterinary',
        component : VeterinaryComponent,
        data: {
          codModulo: "M11",
        }
      },
      {
        path : 'suggestions',
        component : SuggestionsComponent,
        data: {
          codModulo: "M10",
        }
      },
      {
        path : 'users',
        component : UsersComponent,
        data: {
          codModulo: "M03",
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
