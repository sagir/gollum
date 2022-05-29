import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { SurveyComponent } from './pages/survey/survey.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: ':id',
    component: SurveyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
