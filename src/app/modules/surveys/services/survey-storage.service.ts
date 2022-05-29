import { Injectable } from '@angular/core';
import { interval, map, Observable, takeUntil, timer, BehaviorSubject } from 'rxjs';
import { Question } from '../models/Question';
import { SurveyResultStore } from '../models/SurveyResultStore';
import { LocalStorageService } from './../../../core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyStorageService {
  timer$?: Observable<string>;

  private answersSubject$!: BehaviorSubject<SurveyResultStore | null>;
  answersObservable$!: Observable<SurveyResultStore | null>;

  constructor(private storageService: LocalStorageService) {
    const survey = this.storageService.getItem<SurveyResultStore>('_survey');
    this.answersSubject$ = new BehaviorSubject(survey || null);
    this.answersObservable$ = this.answersSubject$.asObservable();
  }

  startTimer(surveyId: number, timeLimit: number): Observable<string> {
    const survey = this.answersSubject$.value;
    let expandedTime = 0;

    if (survey && survey.id === surveyId) {
      expandedTime = this.storageService.getItem<number>('_timer') || 0;
    }

    this.storageService.setItem('_surveyId', surveyId);

    const date = new Date();
    const timerDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() + timeLimit,
      date.getSeconds() - expandedTime
    );

    this.timer$ = interval(1000).pipe(
      takeUntil(timer(timerDate)),
      map(value => {
        // saving in localstorage in every second
        if (value % 5 === 0) {
          this.storageService.setItem('_timer', value);
        }

        return this.convertToTimeString(60 * timeLimit - value)
      })
    );

    return this.timer$;
  }

  private convertToTimeString(totalSeconds: number): string {
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalSeconds / 60 / 60);
    const minutes = Math.floor(totalSeconds / 60) - (hours * 60);
    return `${hours}:${minutes}:${seconds}`;
  }
}
