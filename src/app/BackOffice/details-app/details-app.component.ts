import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from 'src/app/entities/Path';
import { application } from 'src/app/entities/application';
import { ApplicationService } from 'src/app/services/application.service';
import { PathService } from 'src/app/services/path.service';

@Component({
  selector: 'app-details-app',
  templateUrl: './details-app.component.html',
  styleUrls: ['./details-app.component.css']
})
export class DetailsAppComponent  implements OnInit{
id !:number
app !:application;


constructor(private _service: ApplicationService,private srv: PathService,
  private router: ActivatedRoute,   private route: Router) { }

ngOnInit(): void {
 this.router.params.subscribe(params=>{
this.id=+params['idApp'];
this._service.idApp=this.id;
this.getAppData();
 })
 
}

private getAppData(): void {
  this._service.findById(this.id).subscribe(
    (data) => {
      this.app = data;
      console.log(this.app);
      this.listPaths();
    },
    (error) => {
      console.error('Error while fetching application data:', error);
    
    }
  );
}
redirectToUpdate(){
  this.route.navigate(['admin/updateApp']);
} 

deletee(path:Path)  {
  this._service.deletee(path.id).subscribe(
    () => {

      // Do any additional handling of the response here
      window.location.reload();
      this.route.navigate(['admin/DetailsApp']);
    },
    );
}

listPaths(){
  this.srv.findByApplication_Id(this.id).subscribe((data)=>{
    console.log(data);
    this.app.paths=data;
    },
  (error) => {
    console.error('Error while fetching paths:', error);
  })
}


}
