import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-survey-form',
  templateUrl: './save-survey-form.component.html',
  styleUrls: ['./save-survey-form.component.scss']
})
export class SaveSurveyFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
  }

}
