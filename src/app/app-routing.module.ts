import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyadminComponent} from './BackOffice/bodyadmin/bodyadmin.component';
import {AlltemplatesadminComponent} from './BackOffice/alltemplatesadmin/alltemplatesadmin.component';
import {ListapplicationComponent} from './BackOffice/listapplication/listapplication.component';
import { DetailsAppComponent } from './BackOffice/details-app/details-app.component';
import { UpdateAppComponent } from './BackOffice/update-app/update-app.component';
import { UpdatePathComponent } from './BackOffice/update-path/update-path.component';
import { WarningComponent } from './warning/warning.component';
import { WellDoneComponent } from './well-done/well-done.component';
import { SetUpComponent } from './BackOffice/set-up/set-up.component';

const routes: Routes = [{
  path: 'admin', component: AlltemplatesadminComponent, children: [

    {
      path: 'home', component: ListapplicationComponent
    },
    {
      path: 'listapp', component: ListapplicationComponent
    }, 
{ path: "Detailsapp/:idApp", component: DetailsAppComponent },

// Add Path Parameters
{ path: "Detailsapp/:idApp/updatePath/:id", component: UpdatePathComponent },
{
  path: 'Path/:idApp', component: UpdatePathComponent
},
// =======
{path:"updateApp/:idApp", component:UpdateAppComponent  
  
},
{path:"Setup/:id", component:SetUpComponent  
},

{path:"AjoutApp", component:UpdateAppComponent  
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
