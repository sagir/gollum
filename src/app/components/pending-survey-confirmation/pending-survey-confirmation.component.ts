import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pending-survey-confirmation',
  templateUrl: './pending-survey-confirmation.component.html',
  styleUrls: ['./pending-survey-confirmation.component.scss']
})
export class PendingSurveyConfirmationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PendingSurveyConfirmationComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
