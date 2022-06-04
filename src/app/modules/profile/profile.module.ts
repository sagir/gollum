import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileContainerComponent } from './layout/profile-container/profile-container.component';
import { MySurveysComponent } from './pages/my-surveys/my-surveys.component';
import { TakenSurveysComponent } from './pages/taken-surveys/taken-surveys.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { SaveSurveyFormComponent } from './components/save-survey-form/save-survey-form.component';
import { EditSurveyComponent } from './pages/edit-survey/edit-survey.component';
import { SaveQuestionComponent } from './components/save-question/save-question.component';
import { TakenSurveyComponent } from './pages/taken-survey/taken-survey.component';
import { MySurveyComponent } from './pages/my-survey/my-survey.component';


@NgModule({
  declarations: [
    ProfileContainerComponent,
    MySurveysComponent,
    TakenSurveysComponent,
    CreateSurveyComponent,
    SaveSurveyFormComponent,
    EditSurveyComponent,
    SaveQuestionComponent,
    TakenSurveyComponent,
    MySurveyComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
