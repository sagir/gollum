import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Subject, takeUntil } from 'rxjs';
import { QuesitonTypes } from '../../enums/QuestionTypes';
import { Question } from '../../models/Question';
import { QuestionResponse } from '../../models/QuestionResponse';
import { QuestionResultStore, SurveyResultStore } from '../../models/SurveyResultStore';
import { SurveyStorageService } from '../../services/survey-storage.service';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-quesiton',
  templateUrl: './quesiton.component.html',
  styleUrls: ['./quesiton.component.scss']
})
export class QuesitonComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();
  readonly questionTypes = QuesitonTypes;

  question!: Question;
  nextQuestionId?: number;
  previousQuestionId?: number;
  questionResult!: QuestionResultStore;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private surveyStorageService: SurveyStorageService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      const data = this.route.snapshot.data['questionResponse'] as QuestionResponse | undefined;
      this.question = data?.question as Question;
      this.nextQuestionId = data?.nextQuestionId;
      this.previousQuestionId = data?.previousQuestionId;

      this.surveyStorageService.answersObservable$
        .pipe(map(survey => survey?.questions.find(({ id }) => id === this.question.id)), first())
        .subscribe((question) => {
          if (question) {
            this.questionResult = question
            return;
          }

          this.questionResult = { id: this.question.id };
          if (this.question.answer_type === this.questionTypes.Text) {
            this.questionResult.answer = '';
          } else {
            this.questionResult.options = [];
          }
        });
    });

    this.surveyStorageService.timer$?.subscribe(null, null, () => {
      this.submit();
    })
  }

  get nextable(): boolean {
    return !!((this.questionResult.answer?.length || 0) >= 3 || this.questionResult.options?.length);
  }

  onRadioChange($event: MatRadioChange): void {
    this.questionResult.options = [Number($event.value)];
  }

  onCheckboxChange($event: MatCheckboxChange): void {
    const value = Number($event.source.value);

    if ($event.checked) {
      this.questionResult.options?.push(value);
    } else {
      this.questionResult.options = this.questionResult.options?.filter(item => item !== value);
    }
  }

  next(): void {
    if (this.nextable) {
      this.surveyStorageService.addQuestionResult(this.questionResult);
      this.router.navigateByUrl(`surveys/${this.question.survey_id}/questions/${this.nextQuestionId}`);
    }
  }

  async submit(): Promise<void> {
    if (this.nextable) {
      this.surveyStorageService.addQuestionResult(this.questionResult);
    }
    await this.surveyService.takeSurvey(this.surveyStorageService.getPendingSurvey() as SurveyResultStore);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
