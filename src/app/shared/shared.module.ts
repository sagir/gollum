import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
