import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamType } from 'src/app/entities/ParamType';
import { Parameterss } from 'src/app/entities/Parameterss';
import { Path } from 'src/app/entities/Path';
import { ParametersService } from 'src/app/services/parameters.service';
import { PathService } from 'src/app/services/path.service';

import { application } from 'src/app/entities/application';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RequestType } from 'src/app/entities/RequestType';
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
  isKeyNotUnique: boolean = false;
  isReadyToUpdate: boolean = false;
  
  constructor(
    private pathService: PathService,
    private parmeterService:ParametersService,
    private router: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private routerr: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.idPath = +params['id'];
      this.idApp = +params['idApp'];
        this.path.requestType= RequestType.get;
        this.param.paramType = ParamType.PATH_VARIABLE;
      if (!isNaN(this.idPath))
      this.retivePathData();  
    });
  
  }
  setParametersData(parameters:Parameterss){
    this.param=parameters;
    this.removeUpdate(parameters);
    this.isReadyToUpdate=true;
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


  isExictePath(id :number){ //Exict in the Url Id path
    if (!isNaN(id))
    return true;
  return  false;
  }  

  MakeChange(form: NgForm) {

    const isUnique = this.isUniqueKey(this.param.clee, this.ListParameters);

      if (this.isReadyToUpdate) {// check click update Button 
        this.isReadyToUpdate=false;
        if(isUnique){
        this.messageService.add({ severity: 'success', summary: 'Parameter Updated', detail: 'Parameter was updated successfully.' });
        this.addParameterpath(form);

        this.param = new Parameterss();
        }
        else{
          this.messageService.add({ severity: 'warning', summary: 'Parameter Existe', detail: 'Parameter Existe.' });
        }
        return ;
      } else {
       
        if (isUnique){  //idPath = NaN, 
          this.addParameterpath(form);
          this.messageService.add({ severity: 'success', summary: 'Parameter Add', detail: 'Parameter was updated successfully.' });
          this.param = new Parameterss();
          return ;
          }
          this.messageService.add({ severity: 'warning', summary: 'Parameter Existe', detail: 'Parameter Existe.' });
        }



    this.param = new Parameterss();
  }
  
  MakeParmeterOperation(form: NgForm){
    const foundIndex = this.ListParameters.findIndex((element) => {
      return element.clee === form.value.clees;
    });

    if (foundIndex !== -1 ) {
     //Make change at the existing Parameters in liste
      this.ListParameters[foundIndex].clee = this.param.clee;
      this.ListParameters[foundIndex].paramType = this.param.paramType;
      this.messageService.add({ severity: 'success', summary: 'Parameter Updated', detail: 'Parameter was updated successfully.' });
    } else {
 
      this.addParameterpath(form);
      this.param = new Parameterss();

    }
    this.path.parameters = this.ListParameters;

  }


  isUniqueKey(Key: string, list: Parameterss[]): boolean {
    const foundIndex = list.findIndex((element) => {
      return element.clee === Key;
    });

    return foundIndex === -1; // true If Key unique
  }
  affectPathToApp(pat: Path) {//-- REGISTER PATH       boton submit
    this.path.parameters = this.ListParameters;
    const app = new application();
    app.id = this.idApp;
    this.path.application = app;
   
    this.AddPath(this.path);
    this.RedirectionTo(this.idPath)
  }
  RedirectionTo(idPath:number){
    if (!isNaN(idPath))
    this.routerr.navigate(["/admin/Detailsapp/"+this.idApp + "/updatePath/"+this.idPath]);
    else
  this.routerr.navigate(['/admin/Detailsapp/'+this.idApp]);
  }
  
  addParameterpath(form: NgForm) {
    let parma: Parameterss = new Parameterss();
    parma.clee = form.value.clees;

    if (form.value.paramType == 'PATH_VARIABLE')
      parma.paramType = ParamType.PATH_VARIABLE;
    else parma.paramType = ParamType.QUERRY_PARAM;
    this.ListParameters.push(parma);
 //   this.messageService.add({ severity: 'success', summary: 'Parameter Added', detail: 'Parameter was added successfully.' });
  
  }
  remove(param:Parameterss){//(Remove)
    this.ListParameters=this.ListParameters.filter((elem)=> elem !==param)
    this.messageService.add({ severity: 'success', summary: 'Parameter Removed', detail: 'Parameter was removed successfully.' });
  }
  removeUpdate(param:Parameterss){//(Remove)
    this.ListParameters=this.ListParameters.filter((elem)=> elem !==param)
  }
  AddPath(path: Path){
    this.pathService.registerPath(path).subscribe((data) => {
      this.path = data;
      this.routerr.navigate(['/admin/Detailsapp/'+this.idApp]);

    },(error) =>{
      console.error('Failed Add Path Data ', error);
    });}


    submited(pat: Path){
      this.messageService.clear();
      this.confirmationService.confirm({
        message: 'Are you sure you want to save?',
        accept: () => {
          this.affectPathToApp(pat)
          this.messageService.add({ severity: 'success', summary: 'saved Successfully', detail: 'The data was saved successfully.' });

        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'save Cancelled', detail: 'The action was cancelled.' });
          window.location.reload();
        }
      });
     

    }

    goBack(): void {
      this.routerr.navigate(['/admin/Detailsapp/'+this.idApp]);
    }
}
