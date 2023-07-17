import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParamType } from 'src/app/entities/ParamType';
import { Parameterss } from 'src/app/entities/Parameterss';
import { Path } from 'src/app/entities/Path';
import { ParametersService } from 'src/app/services/parameters.service';
import { PathService } from 'src/app/services/path.service';

@Component({
  selector: 'app-update-path',
  templateUrl: './update-path.component.html',
  styleUrls: ['./update-path.component.css']
})
export class UpdatePathComponent implements OnInit{
  path : Path = new Path();
  param : Parameterss= new Parameterss();
  resp:any;
  parmType! :ParamType;
  keyss! :any;
  idPAth !:number;
  constructor(private fb: FormBuilder,private parametersService: ParametersService,
    private pathService: PathService,private router: ActivatedRoute) {}
  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.idPAth=+params['id'];
       });
       this.pathService.findById(this.idPAth).subscribe((response:any)=>{
        this.resp=response;
        console.log( this.resp);
        for (let index = 0; index < this.resp.parameters.length; index++) {
          //const element = array[index];
          this.KeysFieldAsFormArray.push(this.key(this.resp.parameters[index]["clee"]));

          this.form.patchValue({
            paramType: this.resp.parameters[index]["paramType"]
          });
         } 
         for (let index = 0; index < this.resp.parameters.length; index++) {
          this.parametersService.Delete(this.resp.parameters[index]["id"]).subscribe((data)=>{
      
            console.log("Deleted : / ")
      
          });
         }      
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
    TypeReq: ['',
      //[Validators.required, Validators.minLength(8)]
    ],
    Keys: this.fb.array([]),
    paramType: ['',
    //[Validators.required, Validators.minLength(8)]
  ],

  });  setKey(index: number, value: string): void {
    const keysArray = this.form.get('Keys') as FormArray;
    if (keysArray.length > index) {
      keysArray.controls[index].setValue(value);
    } else {
      keysArray.push(this.fb.control(value));
    }
  }

  get KeysFieldAsFormArray(): any {
    return this.form.get('Keys') as FormArray;
  }

 /* key(): any {
    return this.fb.group({
      Key: this.fb.control(''),
    });
  }*/
  key(defaultValue: string = ''): FormGroup {
    return this.fb.group({
      Key: this.fb.control(defaultValue),
    });
  }
  addControl(): void {
    this.KeysFieldAsFormArray.push(this.key());
  }
  remove(i: number): void {
    this.KeysFieldAsFormArray.removeAt(i);
  }


  formValue(): void {
  this.path=this.resp;
    console.log(this.path);
    this.keyss=this.form.value.Keys;
    this.pathService.affect(1,this.path)
    .subscribe((response: any) => {
     // console.log("add path :"+response);

     for (let index = 0; index < this.keyss.length; index++) {
      let newParmaters= new Parameterss();
      newParmaters.clee=   this.keyss[index]["Key"];
      if(this.form.value.paramType == "PATH_VARIABLE")
     newParmaters.paramType =  ParamType.PATH_VARIABLE ;
     else
     newParmaters.paramType =  ParamType.QUERRY_PARAM ;
      console.log(newParmaters);
      this.AddParamsAndAssign(newParmaters,response.id)
      //console.log(this.keyss[index]);
    }
    });


   // this.Addpath();
  }



  AddParamsAndAssign(par: Parameterss,id :number) {
    this.parametersService.addParamsAndAssignToPaths(par,id)
    .subscribe((response: any) => {
      console.log(this.path);

    });
  }

}
