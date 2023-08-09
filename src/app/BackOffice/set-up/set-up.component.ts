import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from 'src/app/entities/Path';
import { Setup } from 'src/app/entities/Setup';
import { TypeTest } from 'src/app/entities/TypeTest';
import { PathService } from 'src/app/services/path.service';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.css']
})
export class SetUpComponent implements OnInit {
  typeTestChoising!:any;
  public pathOptions: string[] = []; 
  SetupFrom: FormGroup;
  id!:number;
  constructor(private fb:FormBuilder, 
    private setupService: SetupService, 
    private activatedRouter: ActivatedRoute,
    private pathService: PathService, 
    private router:Router) {
   
    this.SetupFrom = this.fb.group({
      name: '',
      cle: '',
      scenarios: this.fb.array([]) ,
    });
  }
  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {

      this.id = +params['id'];
    });

  console.log(this.typeTestChoising);
  this.pathService.findByApplication_Id(this.id).subscribe(
    (paths: Path[]) => {
      console.log("paths"); // Vérifiez si les données sont récupérées correctement
      console.log(paths); 
      this.pathOptions = paths.map(path => path.name);
    },
    error => {
      console.error(error); // Affichez les éventuelles erreurs dans la console
    }
  );
}


  newSen(): FormGroup {
    return this.fb.group({
      name: '',
      typeTest: '',
      scenario: '',
      erreurMsg: '',
      success: true,
      pauseTime:'',
      eapsedTime:'',
      duration:'',
      tryMax:'',
      path: [''],
      RadioTest:[''],
    })
  }
  scenarios() : FormArray {
    return this.SetupFrom.get("scenarios") as FormArray
  }
  addSen() {
    this.scenarios().push(this.newSen());
  }
   
  removeQuantity(i:number) {
    this.scenarios().removeAt(i);
  }
   
  onSubmit() {
    console.log(this.SetupFrom.value);
      const setupData: Setup = this.SetupFrom.value;
      console.log(setupData)
      this.addSetup(setupData);
 
  }
  addSetup(setup: Setup){
    
    this.setupService.registerSetup(setup).subscribe((data) => {  
    },(error) =>{
      console.error('Failed Add Setup Data ', error);
    });

  }
  setValue(value : any){
    console.log(value);
    
    this.typeTestChoising=value;
  }
  goBack(): void {
    
  

    this.router.navigate(['admin/listapp']);
  }
 
}
