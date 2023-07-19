import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyadminComponent} from './BackOffice/bodyadmin/bodyadmin.component';
import {AlltemplatesadminComponent} from './BackOffice/alltemplatesadmin/alltemplatesadmin.component';
import {ListapplicationComponent} from './BackOffice/listapplication/listapplication.component';
import { ApplicationComponent } from './BackOffice/application/application.component';
import { AjoutAppComponent } from './BackOffice/ajoutApp/ajoutApp.component';
import { DetailsAppComponent } from './BackOffice/details-app/details-app.component';
import { UpdateAppComponent } from './BackOffice/update-app/update-app.component';
import { PathComponent } from './BackOffice/path/path.component';
import { DropDownInputsComponent } from './drop-down-inputs/drop-down-inputs.component';
import { UpdatePathComponent } from './BackOffice/update-path/update-path.component';
import { WarningComponent } from './warning/warning.component';
import { WellDoneComponent } from './well-done/well-done.component';

const routes: Routes = [{
  path: 'admin', component: AlltemplatesadminComponent, children: [

    {
      path: 'home', component: BodyadminComponent
    },
    {
      path: 'listapp', component: ListapplicationComponent
    },
    {path:"application", component:ApplicationComponent  
  },
  {path:"Addapplication", component:AjoutAppComponent  
},
{path:"Detailsapp/:id", component:DetailsAppComponent  
},
{path:"updateApp", component:UpdateAppComponent  
},
{
  path: 'Path/:id', component: PathComponent
},
{
  path: 'updatePath/:id', component: UpdatePathComponent
},
{
  path: 'Warnign', component: WarningComponent
},
{
  path: 'sucess', component: WellDoneComponent
},
 

  ]
}, {path: '', redirectTo: '/admin/home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
