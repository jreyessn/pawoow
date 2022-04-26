import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { UsserRoutingModule } from './usser-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { QuestionsComponent } from './questions/questions.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { RulesComponent } from './rules/rules.component';
import { VeterinaryComponent } from './veterinary/veterinary.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';
import { AddSymptomsComponent } from './add-symptoms/add-symptoms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSymptomsComponent } from './edit-symptoms/edit-symptoms.component';
import { AddDiseasesComponent } from './add-diseases/add-diseases.component';
import { EditDiseasesComponent } from './edit-diseases/edit-diseases.component';
import { MatSelectModule } from '@angular/material/select';
import { AddRecomendationComponent } from './add-recomendation/add-recomendation.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddQuestionsComponentComponent } from './add-questions-component/add-questions-component.component';
import { EditQuestionsComponentComponent } from './edit-questions-component/edit-questions-component.component';
import { EditVeterinaryComponent } from './edit-veterinary/edit-veterinary.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { AddRulesComponent } from './add-rules/add-rules.component';
import { EditRulesComponent } from './edit-rules/edit-rules.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    SymptomsComponent,
    QuestionsComponent,
    DiseasesComponent,
    RulesComponent,
    VeterinaryComponent,
    SuggestionsComponent,
    AddSymptomsComponent,
    EditSymptomsComponent,
    AddDiseasesComponent,
    EditDiseasesComponent,
    AddRecomendationComponent,
    AddQuestionsComponentComponent,
    EditQuestionsComponentComponent,
    EditVeterinaryComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    ErrorPopupComponent,
    AddRulesComponent,
    EditRulesComponent
  ],
  imports: [
    CommonModule,
    UsserRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [AddSymptomsComponent,EditSymptomsComponent,AddDiseasesComponent,EditDiseasesComponent,AddRecomendationComponent]
})
export class UsserModule { }
