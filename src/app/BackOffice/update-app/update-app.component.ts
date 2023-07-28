import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { application } from 'src/app/entities/application';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.css']
})
export class UpdateAppComponent implements OnInit{
  app : application= new application();

  error ="";
  constructor(private _service: ApplicationService,private router: Router) { 
  }
  onSubmit(): void {
    this._service.update(this.app)  .subscribe(
      () => {
        console.log(this.app);
        this.router.navigate(['/admin/Detailsapp']);
      },
      (error) => {
        this.error = error.error.message;
      }
    );
      
    
  }
  getByid(id:number){
    this._service.findById(id)  .subscribe(
      (response) => {
    
    // this.app.date = new Date(response.date).toISOString().split('T')[0];
     this.app=response;
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }
  
  ngOnInit(): void {
    
    this.getByid(this._service.idApp);
    console.log(this.app)

  }


}
