import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { PaginatorData } from 'src/app/core/models/PaginatorData';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SurveySortOptions } from 'src/app/modules/surveys/enums/SurveySortOptions';
import { SurveyStatuses } from 'src/app/modules/surveys/enums/SurveyStatuses';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { SurveyListItem } from './../../../surveys/models/SurveyListItem';

@Component({
  selector: 'app-taken-surveys',
  templateUrl: './taken-surveys.component.html',
  styleUrls: ['./taken-surveys.component.scss']
})
export class TakenSurveysComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  userId?: number;
  paginatorData?: PaginatorData;
  surveys: SurveyListItem[] = [];

  displayColumns = ['title', 'questions', 'time_limit', 'publish_at', 'taken_at', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.authService.userObservable$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((user) => (this.userId = user?.id));

    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.loadTakenSurveys();
    });
  }

  async loadTakenSurveys(): Promise<void> {
    if (!this.userId) {
      this.snackBar.open('Unable to load user surveys', 'Close', {
        duration: 3000,
      });
      return;
    }

    try {
      this.spinner.show('my-surveys');
      const queryParamMap = this.route.snapshot.queryParamMap;
      const { data, meta } = await this.surveyService.getSurveys({
        page: Number(queryParamMap.get('page') || 0) || 1,
        perPage: Number(queryParamMap.get('perPage') || 10) || 10,
        search: queryParamMap.get('search') || '',
        status: 'all' as SurveyStatuses,
        sortBy: (queryParamMap.get('sortBy') || SurveySortOptions.Latest) as SurveySortOptions,
        takenBy: this.userId
      });
      this.surveys = data;
      this.paginatorData = meta;
    } catch (error) {
      this.snackBar.open('Somehting went wrong. Please try again', 'Close', { duration: 3000 })
    } finally {
      this.spinner.hide('my-surveys');
    }
  }

  onPaginatorChange(event: PageEvent) {
    this.router.navigate([], {
      queryParams: {
        page: event.pageIndex,
        perPage: event.pageSize
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
