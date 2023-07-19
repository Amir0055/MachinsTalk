import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { application } from '../../entities/application';
import { ApplicationService } from '../../services/application.service';


@Component({
  selector: 'app-ajoutApp',
  templateUrl: './ajoutApp.component.html',
  styleUrls: ['./ajoutApp.component.css']
})
export class AjoutAppComponent implements OnInit {
  app : application= new application();

  error ="";
  constructor(private _service: ApplicationService,private router: Router) { 

  }


  onSubmit(): void {
    console.log(this.app);

    this._service.save(this.app)  .subscribe(
      () => {
        console.log(this.app);
        this.router.navigate(['/admin/application']);
      },
      (error) => {
        this.error = error.error.message;
      }
    );
      
      
  } 
  ngOnInit(): void {
  }
}
