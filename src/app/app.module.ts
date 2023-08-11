import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlltemplatesadminComponent } from './BackOffice/alltemplatesadmin/alltemplatesadmin.component';
import { SidebaradminComponent } from './BackOffice/sidebaradmin/sidebaradmin.component';
import { HeaderadminComponent } from './BackOffice/headeradmin/headeradmin.component';
import { FooteradminComponent } from './BackOffice/footeradmin/footeradmin.component';
import { BodyadminComponent } from './BackOffice/bodyadmin/bodyadmin.component';
import { ListapplicationComponent } from './BackOffice/listapplication/listapplication.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationComponent } from './BackOffice/application/application.component';
import { DetailsAppComponent } from './BackOffice/details-app/details-app.component';
import { UpdateAppComponent } from './BackOffice/update-app/update-app.component';

import { DropDownInputsComponent } from './drop-down-inputs/drop-down-inputs.component';
import { UpdatePathComponent } from './BackOffice/update-path/update-path.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SetUpComponent } from './BackOffice/set-up/set-up.component';
@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,

    AlltemplatesadminComponent,
    SidebaradminComponent,
    HeaderadminComponent,
    FooteradminComponent,
    BodyadminComponent,
    ListapplicationComponent,
    DetailsAppComponent,
 
    DropDownInputsComponent,
    UpdatePathComponent,

    UpdateAppComponent,

    SetUpComponent


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ConfirmDialogModule,
    ConfirmDialogModule,
    ToastModule,
    BrowserAnimationsModule,
    

  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],

})
export class AppModule { }
