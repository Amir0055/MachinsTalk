import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { application } from 'src/app/entities/application';
import { ApplicationService } from 'src/app/services/application.service';



import {Message} from 'primeng/api';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-listapplication',
  templateUrl: './listapplication.component.html',
  styleUrls: ['./listapplication.component.css'],
  providers: [ConfirmationService]
})
export class ListapplicationComponent {
  list_app:any;
  msgs: Message[] = [];
  constructor(private _service: ApplicationService,private router: Router,  private confirmationService: ConfirmationService, private messageService: MessageService) { }

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

    this._service.update(app.id)
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
  /* delete(application:application) {
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
  }   */
  confirm2(application: application) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Application?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._service.delete(application.id).subscribe(
          () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.router.navigate(['listapp']); // Rediriger vers la liste des applications après la suppression
            setTimeout(() => {
              window.location.reload();
            }, 900);
          },
          error => {
            console.error('An error occurred while deleting the application.', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the application.' });
          }
        );
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            this.router.navigate(['listapp']); // Rediriger vers la liste des applications après la suppression
            setTimeout(() => {
              window.location.reload();
            }, 900);
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            this.router.navigate(['listapp']); // Rediriger vers la liste des applications après la suppression
            setTimeout(() => {
              window.location.reload();
            }, 900);
            break;
        }
      }
    });
  }
  redirectToadd(){

    this.router.navigate(['admin/AjoutApp']);
  }
}
