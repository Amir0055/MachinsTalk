import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ParamType } from 'src/app/entities/ParamType';
import { Parameterss } from 'src/app/entities/Parameterss';
import { Path } from 'src/app/entities/Path';
import { ParametersService } from 'src/app/services/parameters.service';
import { PathService } from 'src/app/services/path.service';
import { Location } from '@angular/common';

import { application } from 'src/app/entities/application';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-path',
  templateUrl: './update-path.component.html',
  styleUrls: ['./update-path.component.css'],
})
export class UpdatePathComponent implements OnInit {
  idPath!: number;
  idApp!: number;
  path: Path = new Path();
  param: Parameterss = new Parameterss();
  ListParameters: Parameterss[] = [];

  constructor(
    private pathService: PathService,
    private parmeterService:ParametersService,
    private router: ActivatedRoute,
    private location: Location,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private routerr: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.idPath = +params['id'];
      this.idApp = +params['idApp'];
      
     
      if (!isNaN(this.idPath))
      this.retivePathData();  
    });
  
  }

  retivePathData() {
    this.pathService.findById(this.idPath).subscribe(
      (data) => {
        this.path = data;
        this.ListParameters = this.path.parameters;
      },
      (error) => {
        console.error('Error Fetching Path Data ', error);
      }
    );
  }
    Newpath(pat: Path) {
    this.path.parameters = this.ListParameters;
    const app = new application();
    app.id = this.idApp;
    this.path.application = app;
    this.pathService.registerPath(this.path).subscribe((data) => {
    this.path=data;

   
    });

  }

  setParametersData(parameters: Parameterss) {
    this.param = parameters;
  }
  isExictePath(id :number){ //Exict in the Url Id path
    if (!isNaN(id))
    return true;
  return  false;
  }  
  MakeChange(form: NgForm) {
    const isUnique = this.isUniqueKey(this.param.clee, this.ListParameters);
    if (this.isExictePath(this.idPath)) {
      if (isUnique) {// check unique of elements typing 
        const foundIndex = this.ListParameters.findIndex((element) => {
          return element.clee === this.param.clee;
        });

        if (foundIndex !== -1) {
         //Make change at the existing Parameters in liste
          this.ListParameters[foundIndex].clee = this.param.clee;
          this.ListParameters[foundIndex].paramType = this.param.paramType;
        } else {
     
          this.addParameterpath(form);
          this.param = new Parameterss();
        }
        this.path.parameters = this.ListParameters;
      } else {
        
        console.log('The Key not unike. Veuillez choisir une clé différente.');
      }
    } else {
      if (isUnique)    // Si l'idPath est NaN, appelez simplement la fonction "addParameterpath"
      this.addParameterpath(form);
    }
    this.param = new Parameterss();
  }

  isUniqueKey(Key: string, list: Parameterss[]): boolean {
    const foundIndex = list.findIndex((element) => {
      return element.clee === Key;
    });

    return foundIndex === -1; // Renvoie true si la clé est unique, sinon false.
  }
  affectPathToApp(pat: Path) {//-- REGISTER PATH
    this.path.parameters = this.ListParameters;
    const app = new application();
    app.id = this.idApp;
    this.path.application = app;
    this.AddPath(this.path);

  }
  RedirectionTo(idPath:number){
    if (!isNaN(idPath))
      window.location.reload();
    this.location.back();
 
  }
  
  addParameterpath(form: NgForm) {
    let parma: Parameterss = new Parameterss();
    parma.clee = form.value.clee;

    if (form.value.paramType == 'PATH_VARIABLE')
      parma.paramType = ParamType.PATH_VARIABLE;
    else parma.paramType = ParamType.QUERRY_PARAM;
    this.ListParameters.push(parma);
  
  }
  remove(param:Parameterss){//(Remove)
    this.ListParameters=this.ListParameters.filter((elem)=> elem !==param)
  }
  AddPath(path: Path){
    this.pathService.registerPath(path).subscribe((data) => {
      this.path = data;
     
    },(error) =>{
      console.error('Failed Add Path Data ', error);
    });}
  /*confirm2(param:Parameterss) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Application?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.parmeterService.Delete(param.id).subscribe(
          () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.routerr.navigate(['updatePath/'+this.idPath]);// Rediriger vers la liste des applications après la suppression
            
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
            this.routerr.navigate(['updatePath/'+this.idPath]); // Rediriger vers la liste des applications après la suppression
            setTimeout(() => {
              this.routerr.navigate(['updatePath/'+this.idPath]);
            }, 900);
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            this.routerr.navigate(['updatePath/'+this.idPath]); // Rediriger vers la liste des applications après la suppression
            setTimeout(() => {
              this.routerr.navigate(['updatePath/'+this.idPath]);
            }, 900);
            break;
        }
      }
    });
  }*/

}
