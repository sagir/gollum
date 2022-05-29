import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { SurveyStorageService } from '../../services/survey-storage.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  timer$?: Observable<string>;
  survey?: SurveyDetails;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surveyStorageService: SurveyStorageService
  ) { }

  ngOnInit(): void {
    this.survey = this.route.snapshot.data['survey'];

    if (this.survey) {
      this.timer$ = this.surveyStorageService.startTimer(this.survey.id, this.survey.time_limit);

      if (!this.route.firstChild) {
        this.router.navigateByUrl(`surveys/${this.survey.id}/questions/${this.survey.questions[0].id}`)
      }
    }
  }

}
