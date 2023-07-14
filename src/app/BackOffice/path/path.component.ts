import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { Parameterss } from 'src/app/entities/Parameterss';
import { Path } from 'src/app/entities/Path';
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
  keyss! :any;
  constructor(private fb: FormBuilder,private parametersService: ParametersService,private pathService: PathService,private router :Router) {}
  ngOnInit(): void {
   
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
    TypeReq: ['',
      //[Validators.required, Validators.minLength(8)]
    ],
    Keys: this.fb.array([]),

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
    console.log(this.form.value);
    this.keyss=this.form.value.Keys;
    this.pathService.registerPath(this.path)
    .subscribe((response: any) => {
     // console.log(response);
     for (let index = 0; index < this.keyss.length; index++) {
      let newParmaters= new Parameterss();
      newParmaters.clee=   this.keyss[index]["Key"] ;
      console.log(newParmaters);
      this.AddParamsAndAssign(newParmaters,response.id)
      //console.log(this.keyss[index]);
    }
    });
   // this.Addpath();
  }
  Addpath() {
    this.pathService.registerPath(this.path)
    .subscribe((response: any) => {
      console.log(response);
    });


  }
  AddParamsAndAssign(par: Parameterss,id :number) {
    this.parametersService.addParamsAndAssignToPaths(par,id)
    .subscribe((response: any) => {
      console.log(response);
    });


  }
}
