import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyStatuses } from '../../enums/SurveyStatuses';
import { SurveySortOptions } from '../../enums/SurveySortOptions';
import { SurveyListItem } from './../../models/SurveyListItem';
import { PaginatorData } from 'src/app/core/models/PaginatorData';
import { PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  surveys!: SurveyListItem[];
  paginatorData!: PaginatorData;
  userId = 0;

  displayColumns = ['title', 'questions', 'time_limit', 'total_taken', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.loadSurveys());

    this.authService.userObservable$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((user) => this.userId = user?.id || 0)
  }

  private async loadSurveys(): Promise<void> {
    try {
      this.spinner.show('my-surveys');
      const queryParamMap = this.route.snapshot.queryParamMap;
      const { data, meta } = await this.surveyService.getSurveys({
        page: Number(queryParamMap.get('page') || 0) || 1,
        perPage: Number(queryParamMap.get('perPage') || 10) || 10,
        search: queryParamMap.get('search') || '',
        status: SurveyStatuses.Published,
        sortBy: (queryParamMap.get('sortBy') || SurveySortOptions.Latest) as SurveySortOptions,
        notTakenBy: this.userId
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
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
