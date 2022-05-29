import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { QuesitonComponent } from './pages/quesiton/quesiton.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { QuestionResolver } from './resolvers/question.resolver';
import { SurveyResolver } from './resolvers/survey.resolver';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: ':id',
    component: SurveyComponent,
    resolve: { survey: SurveyResolver },
    children: [
      {
        path: 'questions/:id',
        component: QuesitonComponent,
        resolve: { questionResponse: QuestionResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
