import { Component, OnInit } from '@angular/core';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from '../../models/Question';
import { detailExpand } from 'src/app/core/animations/detail-expand';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations: [detailExpand]
})
export class ReportComponent implements OnInit {
  survey?: SurveyDetails;
  takenBy = 0;
  questionDisplayColumns = ['text', 'answerType'];
  expandedElement: Question | null = null;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.spinner.show('global');
      this.survey = await this.surveyService.getSurveyReport(this.route.snapshot.params['id']);
      this.setTakenBy();
      this.setOptionsChosenBy();
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong. Please try again later.', 'Close');
    } finally {
      this.spinner.hide('global');
    }
  }

  private setTakenBy(): void {
    const takenByUsers: number[] = [0];

    this.survey?.questions.forEach(question => {
      question.answers?.forEach(answer => {
        if (!takenByUsers.includes(answer.user_id)) {
          takenByUsers.push(answer.user_id);
        }
      });
    });

    this.takenBy = Math.max(...takenByUsers);
  }

  private setOptionsChosenBy(): void {
    this.survey?.questions.forEach(({ options, answers }) => {
      console.log(answers);
      options.forEach(option => {
        option.chosen_by = answers?.reduce((total, answer) => {
          if (answer.option_id === option.id) {
            return total + 1;
          }
          return total;
        },0)
      })
    })
  }

  expand(element: Question): void {
    if (this.expandedElement === element) {
      this.expandedElement = null;
    } else {
      this.expandedElement = element;
    }
  }

}
