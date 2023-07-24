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


  onSubmit(app:application): void {
    console.log(this.app);
    this._service.save(app).subscribe(

      app => {
        // Do any additional handling of the response here
      // window.location.reload();
        this.router.navigate(['admin/listapp']);

      },
      );


  }
  ngOnInit(): void {
  }
}
