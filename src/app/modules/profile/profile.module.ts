import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileContainerComponent } from './layout/profile-container/profile-container.component';
import { MySurveysComponent } from './pages/my-surveys/my-surveys.component';
import { TakenSurveysComponent } from './pages/taken-surveys/taken-surveys.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSurveyComponent } from './pages/my-surveys/create-survey/create-survey.component';


@NgModule({
  declarations: [
    ProfileContainerComponent,
    MySurveysComponent,
    TakenSurveysComponent,
    CreateSurveyComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
