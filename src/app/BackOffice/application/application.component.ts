import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { application } from 'src/app/entities/application';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  list_app:any;

  constructor(private _service: ApplicationService,private router: Router) { }

  ngOnInit(): void {
    this.findAll()
  }
  findAll() { 
    this._service.findAll().subscribe(
      application => {
        this.list_app=application;
        console.log(application);
        // Do any additional handling of the response here
        //window.location.reload();
      },
      );
  }
  findById(id:any) { 
    this._service.findById(id).subscribe(
      application => {
        
        // Do any additional handling of the response here
        window.location.reload();
      },
      );
  }
  save(application:application) { 
    this._service.save(application).subscribe(
      application => {
        
        // Do any additional handling of the response here
        window.location.reload();
      },
      );
  }
  update(app : application) {

    this._service.update(app)
      .subscribe(
        update => {
          console.error('Application modifié');
          window.location.reload();
          this.router.navigate(['application']);

        },
        error => {
          console.error(error);
        }
      );
  }
  delete(application:application) { 
    this._service.delete(application.id).subscribe(
      () => {
        
        // Do any additional handling of the response here
        window.location.reload();
        this.router.navigate(['application']);
      },
      );
  }
  redirectToadd(){

    this.router.navigate(['admin/Addapplication']);
  }
}
