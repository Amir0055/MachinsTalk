import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ParamType } from 'src/app/entities/ParamType';
import { Parameterss } from 'src/app/entities/Parameterss';
import { Path } from 'src/app/entities/Path';
import { ApplicationService } from 'src/app/services/application.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { PathService } from 'src/app/services/path.service';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit{
  path : Path = new Path();
  param : Parameterss= new Parameterss();
  parmType! :ParamType;
  keyss! :any;
  idApp !:number;
  constructor(private fb: FormBuilder,private parametersService: ParametersService,
    private pathService: PathService,private router: ActivatedRoute,private routerr: Router) {}
  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.idApp=+params['id'];
       });
  }

  form = this.fb.group({
    name: [
      '',
      {
       // validators: [Validators.required, Validators.pattern("")],
      },
    ],
    path: ['',
      //[Validators.required, Validators.minLength(8)]
    ],
    TypeReq: ['POST',
      //[Validators.required, Validators.minLength(8)]
    ],
    Keys: this.fb.array([]),
    paramType: ['QUERRY_PARAM',
    //[Validators.required, Validators.minLength(8)]
  ],

  });
  get KeysFieldAsFormArray(): any {
    return this.form.get('Keys') as FormArray;
  }

  key(): any {
    return this.fb.group({
      Key: this.fb.control(''),
    });
  }
  addControl(): void {
    this.KeysFieldAsFormArray.push(this.key());
  }
  remove(i: number): void {
    this.KeysFieldAsFormArray.removeAt(i);
  }


  formValue(): void {
    console.log(this.path);
    this.keyss=this.form.value.Keys;
    this.pathService.affect(this.idApp,this.path)
    .subscribe((response: any) => {
     // console.log("add path :"+response);

     for (let index = 0; index < this.keyss.length; index++) {
      let newParmaters= new Parameterss();
      newParmaters.clee=   this.keyss[index]["Key"] ;
      if(this.form.value.paramType == "PATH_VARIABLE")
     newParmaters.paramType =  ParamType.PATH_VARIABLE ;
     else
     newParmaters.paramType =  ParamType.QUERRY_PARAM ;
      console.log(newParmaters);
      this.AddParamsAndAssign(newParmaters,response.id)
      //console.log(this.keyss[index]);
    }
    this.routerr.navigate(['admin/Detailsapp/'+this.idApp]);
    });
   // this.Addpath();
  }



  AddParamsAndAssign(par: Parameterss,id :number) {
    this.parametersService.addParamsAndAssignToPaths(par,id)
    .subscribe((response: any) => {
      console.log(this.path);
    //  this.AsignePathToApp(this.idApp,this.path);

    });
  }

}
