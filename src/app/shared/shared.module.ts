import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { SurveyFilterComponent } from './components/survey-filter/survey-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';

const Modules = [
  CommonModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  HttpClientModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTableModule,
  MatSelectModule,
  MatIconModule,
  MatPaginatorModule,
  NgxSpinnerModule
];

const Components = [
  SurveyFilterComponent
]

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
exports: [
    ...Modules,
    ...Components
  ],
})
export class SharedModule {}
