import { CUSTOM_ELEMENTS_SCHEMA, NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlltemplatesadminComponent } from './BackOffice/alltemplatesadmin/alltemplatesadmin.component';
import { SidebaradminComponent } from './BackOffice/sidebaradmin/sidebaradmin.component';
import { HeaderadminComponent } from './BackOffice/headeradmin/headeradmin.component';
import { FooteradminComponent } from './BackOffice/footeradmin/footeradmin.component';
import { BodyadminComponent } from './BackOffice/bodyadmin/bodyadmin.component';

import { ListapplicationComponent } from './BackOffice/listapplication/listapplication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AjoutAppComponent } from './BackOffice/ajoutApp/ajoutApp.component';
import { ApplicationComponent } from './BackOffice/application/application.component';
import { DetailsAppComponent } from './BackOffice/details-app/details-app.component';
import { UpdateAppComponent } from './BackOffice/update-app/update-app.component';
import { PathComponent } from './BackOffice/path/path.component';


@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    AjoutAppComponent,
    AlltemplatesadminComponent,
    SidebaradminComponent,
    HeaderadminComponent,
    FooteradminComponent,
    BodyadminComponent,
    ListapplicationComponent,
    DetailsAppComponent,
    UpdateAppComponent,
    PathComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
