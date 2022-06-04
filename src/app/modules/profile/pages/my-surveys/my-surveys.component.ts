import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { SurveyStatuses } from 'src/app/modules/surveys/enums/SurveyStatuses';
import { SurveySortOptions } from 'src/app/modules/surveys/enums/SurveySortOptions';
import { SurveyListItem } from './../../../surveys/models/SurveyListItem';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorData } from 'src/app/core/models/PaginatorData';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.scss'],
})
export class MySurveysComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();
  private userId?: number;

  surveys: SurveyListItem[] = [];
  paginatorData?: PaginatorData;
  displayColumns = ['title', 'questions', 'time_limit', 'created_at', 'publish_at', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private surveyService: SurveyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.authService.userObservable$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((user) => (this.userId = user?.id));

    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.loadMySurveys();
    });
  }

  private async loadMySurveys(): Promise<void> {
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
        status: (queryParamMap.get('status') || 'all') as SurveyStatuses,
        sortBy: (queryParamMap.get('sortBy') || SurveySortOptions.Latest) as SurveySortOptions,
        user: this.userId
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
