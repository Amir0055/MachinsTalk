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

constructor(private _service: ApplicationService,private srv: PathService,private router: ActivatedRoute,   private route: Router) { }
ngOnInit(): void {
 this.router.params.subscribe(params=>{
this.id=+params['id'];
this._service.idApp=this.id;
this._service.findById(this.id).subscribe((data)=>{

this.app=data;
console.log(this.app);
});
 })
 
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
}
