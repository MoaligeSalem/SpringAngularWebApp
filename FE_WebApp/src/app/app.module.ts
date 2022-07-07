import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling'
import {MatIconModule} from '@angular/material/icon'
import { routingComponents, AppRoutingModule } from './app-routing.module';

import 'ag-grid-enterprise';
import 'ag-grid-community';
import {AgGridModule} from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ComparaisonComponent } from './comparaison/comparaison.component';
import { CompaComponent } from './compa/compa.component';
import { DataService } from './data.service';

import {FusionChartsModule} from 'angular-fusioncharts';

// Import FusionCharts library and chart modules

import * as FusionCharts from "fusioncharts";;

import * as Charts from "fusioncharts/fusioncharts.charts";

import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AuthenticationComponent,
    ComparaisonComponent,
    CompaComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    HttpClientModule,
    ScrollingModule,
    MatIconModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    AppRoutingModule,
    FusionChartsModule
    
  ],
  providers: [routingComponents,DataService],

  bootstrap: [AppComponent]
})
export class AppModule { }
