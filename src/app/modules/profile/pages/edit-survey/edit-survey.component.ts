import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { NgxSpinnerService } from 'ngx-spinner';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveQuestionComponent } from '../../components/save-question/save-question.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { Question } from 'src/app/modules/surveys/models/Question';
import { MatTable } from '@angular/material/table';
import { QuesitonTypes } from 'src/app/modules/surveys/enums/QuestionTypes';
import { SurveyStatuses } from 'src/app/modules/surveys/enums/SurveyStatuses';
import { detailExpand } from 'src/app/core/animations/detail-expand';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss'],
  animations: [detailExpand],
})
export class EditSurveyComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  form!: FormGroup;
  survey!: SurveyDetails;
  expandedElement: Question | null = null;

  readonly questionTypes = QuesitonTypes

  questionDisplayColumns = ['text', 'answerType', 'actions'];

  @ViewChild(MatTable) table!: MatTable<Question>;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadSurvey();
    this.form = this.surveyService.createSurveyForm(this.survey);
  }

  private async loadSurvey(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    try {
      this.spinner.show('global');
      this.survey = await this.surveyService.getSurvey(id);
    } catch (error) {
      this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 400 })
    } finally {
      this.spinner.hide('global');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open('Invalid data', 'Close', { duration: 3000 });
      return;
    }

    try {
      this.spinner.show('global');
      await this.surveyService.updateSurvey(this.survey.id, this.form.value);
      this.snackBar.open('Survey updated successfully', 'Close', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 3000 });
    } finally {
      this.spinner.hide('global');
    }
  }

  addQuestion() {
    const dialog = this.dialog.open(SaveQuestionComponent, {
      width: '500px',
      maxWidth: 'calc(100% - 32px)',
      data: {
        title: 'Create Question',
        surveyId: this.survey.id
      }
    });

    dialog.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$), filter(Boolean))
      .subscribe((question: Question) => {
        this.survey.questions.push(question);
        this.table.renderRows();
      });
  }

  editQuestion($event: Event, question: Question) {
    $event.stopPropagation();
    const dialog = this.dialog.open(SaveQuestionComponent, {
      width: '500px',
      maxWidth: 'calc(100% - 32px)',
      data: {
        title: 'Update Question',
        surveyId: this.survey.id,
        question
      }
    });

    dialog.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$), filter(Boolean))
      .subscribe((question: Question) => {
        const index = this.survey.questions.findIndex(({ id }) => id === question.id);
        this.survey.questions.splice(index, 1, question);
        this.table.renderRows();
      });
  }

  async publishSurvey(): Promise<void> {
    try {
      this.spinner.show('global');
      await this.surveyService.publishSurvey(this.survey.id);
      this.survey.publish_at = (new Date()).toISOString();
      this.survey.status = SurveyStatuses.Published;
      this.snackBar.open('Survey published successfully.', 'Close', { duration: 3000 });
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong. Please try again', 'Close', { duration: 3000 });
    } finally {
      this.spinner.hide('global');
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  expand(element: Question): void {
    if (this.expandedElement === element || element.answer_type == QuesitonTypes.Text) {
      this.expandedElement = null;
    } else {
      this.expandedElement = element;
    }
  }

  async deleteQuestion($event: Event, questionId: number): Promise<void> {
    $event.stopPropagation();

    try {
      this.spinner.show('global');
      await this.surveyService.deleteQuestion(this.survey.id, questionId);
      const questionIndex = this.survey.questions.findIndex(question => question.id == questionId);
      this.survey.questions.splice(questionIndex, 1); // removing deleted question
      this.snackBar.open('Question deleted successfully.', 'Close', { duration: 3000 });
      this.table.renderRows();
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong. Please try again.');
    } finally {
      this.spinner.hide('global');
    }
  }

}
