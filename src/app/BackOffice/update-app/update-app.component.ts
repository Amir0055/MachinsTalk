import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { application } from 'src/app/entities/application';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.css']
})
export class UpdateAppComponent implements OnInit{
  app: application = new application();
  operation="This is an Application Register .";
  idApp!: number;
  error = "";

  constructor(
    private _service: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idApp = +params['idApp'];
      this._service.idApp = this.idApp;
      if (!isNaN(this.idApp)) {
        this.operation="This is an Application Update ."
        this.getAppData();
      }
    });
  }

  onSubmit(): void {
    if (!isNaN(this.idApp)) {
      this.update(this.app);
      this.router.navigate(['admin/listapp']);

    } else {
      this.save(this.app);
    }
  }

  save(app: application): void {
    console.log(this.app);
    this._service.save(this.app).subscribe(
      (data) => {
        this.app = data;
       
        this.router.navigate(['admin/listapp']);
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Application Added' });
      },
      
    );
  }

  update(app: application): void {
    this._service.update(this.app).subscribe(
      () => {
        console.log(this.app);
        this.router.navigate(['admin/Detailsapp']);
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'Application updated' });
      },
      (error) => {
        this.error = error.error.message;
      }
    );
  }

  getAppData(): void {
    this._service.findById(this.idApp).subscribe(
      (data) => {
        this.app = data;
        console.log(this.app);
      },
      (error) => {
        console.error('Error while fetching application data:', error);
      }
    );
  }
  goBack(): void {
    if(!isNaN(this.idApp))
    this.router.navigate(['admin/Detailsapp/'+this.idApp]);
    else
    this.router.navigate(['admin/listapp']);
  }
  
}
