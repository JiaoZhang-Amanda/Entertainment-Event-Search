

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { GeoLocService } from './geo-loc.service';
import { AgmCoreModule } from '@agm/core';
//import { AutoCompService } from './Service/auto-comp.service';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TooltipModule} from "ngx-tooltip";

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltip,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { ResultTableComponent } from './result-form/result-form.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { NoneSpaceDirective } from './none-space.directive';

@NgModule({
  exports: [
    TooltipModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTooltip,
    MatTreeModule,
    ScrollingModule,
    CdkTreeModule,
    CdkTableModule,
    DragDropModule,
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatAutocompleteModule,
    RoundProgressModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCS17ICh_AhJVjBFGxPo6tqz7hnHI1Kirs'
    })
  ],
  declarations: [ AppComponent, SearchFormComponent, ResultTableComponent, NoneSpaceDirective],
  bootstrap:    [ AppComponent ],
  providers: [GeoLocService ]
})
export class AppModule { }

