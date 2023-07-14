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
  path: 'Path', component: PathComponent
},
 
 

  ]
}, {path: '', redirectTo: '/admin/home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
