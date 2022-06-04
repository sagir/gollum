import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { ProfileContainerComponent } from './layout/profile-container/profile-container.component';
import { MySurveysComponent } from './pages/my-surveys/my-surveys.component';
import { TakenSurveysComponent } from './pages/taken-surveys/taken-surveys.component';
import { EditSurveyComponent } from './pages/edit-survey/edit-survey.component';
import { MySurveyComponent } from './pages/my-survey/my-survey.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileContainerComponent,
    children: [
      { path: '', redirectTo: 'my-surveys' },
      {
        path: 'my-surveys',
        children: [
          {
            path: '',
            component: MySurveysComponent
          },
          {
            path: '":id',
            children: [
              {
                path: '',
                component: MySurveyComponent
              },
              {
                path: 'edit',
                component: EditSurveyComponent
              }
            ]
          },
          {
            path: 'create',
            component: CreateSurveyComponent
          }
        ]
      },
      {
        path: 'taken-surveys',
        children: [
          {
            path: '',
            component: TakenSurveysComponent
          },
          {
            path: ':id',
            component: TakenSurveysComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
