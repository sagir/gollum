import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/Question';
import { QuestionResponse } from '../../models/QuestionResponse';

@Component({
  selector: 'app-quesiton',
  templateUrl: './quesiton.component.html',
  styleUrls: ['./quesiton.component.scss']
})
export class QuesitonComponent implements OnInit {
  question?: Question;
  nextQuestionId?: number;
  previousQuestionId?: number;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data['questionResponse'] as QuestionResponse | undefined;
    this.question = data?.quesiton;
    this.nextQuestionId = data?.nextQuestionId;
    this.previousQuestionId = data?.previousQuestionId;
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      id: [this.question?.id || null, Validators.required],
      options: this.fb.array([]),
      answer: [null]
    });
  }

}
