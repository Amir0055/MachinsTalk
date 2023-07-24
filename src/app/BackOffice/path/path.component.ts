import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, NgForm, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ParamType } from 'src/app/entities/ParamType';
import { Parameterss } from 'src/app/entities/Parameterss';
import { Path } from 'src/app/entities/Path';
import { application } from 'src/app/entities/application';
import { ApplicationService } from 'src/app/services/application.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { PathService } from 'src/app/services/path.service';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit{
  idApp!: number;
  path : Path = new Path();
  ListParameters: Parameterss[] = [];

  constructor(private pathService: PathService,private router: ActivatedRoute,
    private routerr: Router) {}
    
  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.idApp=+params['id'];
       });
  }


  affectPathToApp(pat: Path) {
    this.path.parameters = this.ListParameters;
    const app = new application();
    app.id = this.idApp;
    this.path.application = app;
    //console.log("Before Register     :"+this.path)
    this.pathService.registerPath(this.path).subscribe((data) => {
    this.path=data;
    console.log(this.path)
    });

  }
  
  addParameterpath(form: NgForm){
    let parma: Parameterss = new Parameterss();
    parma.clee=form.value.clee;
    // this.path.parameters.push(parma);
    if (form.value.paramType == 'PATH_VARIABLE')
    parma.paramType = ParamType.PATH_VARIABLE;
    else parma.paramType = ParamType.QUERRY_PARAM;
    this.ListParameters.push(parma);
  }


  registerParmaPath(path: Path){
   

    this.pathService.registerPath(path).subscribe((data)=>{
      console.log(data);
      
      });

  }











}
