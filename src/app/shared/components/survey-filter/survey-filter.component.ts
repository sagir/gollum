import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { SurveySortOptions } from 'src/app/modules/surveys/enums/SurveySortOptions';
import { SurveyStatuses } from 'src/app/modules/surveys/enums/SurveyStatuses';
import { SurveyFilterData } from 'src/app/modules/surveys/models/SurveyFilterData';

@Component({
  selector: 'app-survey-filter',
  templateUrl: './survey-filter.component.html',
  styleUrls: ['./survey-filter.component.scss'],
})
export class SurveyFilterComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  form!: FormGroup;
  statuses: Array<{ label: string; value: SurveyStatuses }> = [];
  sortOptions: Array<{ label: string; value: SurveySortOptions }> = [];

  @Input() hideStatus = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const statuses = Object.values(SurveyStatuses);
    Object.keys(SurveyStatuses).forEach((key, index) => {
      this.statuses.push({
        label: key,
        value: statuses[index],
      });
    });

    const sortOptions = Object.values(SurveySortOptions);
    Object.keys(SurveySortOptions).forEach((key, index) => {
      this.sortOptions.push({
        label: key,
        value: sortOptions[index],
      });
    });

    this.createSurveyFilterForm();
    this.form.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$), debounceTime(300))
      .subscribe((value: SurveyFilterData) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: value,
          queryParamsHandling: 'merge',
        });
      });
  }

  private createSurveyFilterForm(): void {
    const queryParamMap = this.route.snapshot.queryParamMap;

    this.form = this.fb.group({
      search: queryParamMap.get('search') || null,
      sortBy: queryParamMap.get('sortBy') || SurveySortOptions.Latest,
      status: !this.hideStatus ? SurveyStatuses.Published : 'all',
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
