import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from 'src/app/entities/Path';
import { Setup } from 'src/app/entities/Setup';
import { PathService } from 'src/app/services/path.service';
import { SetupService } from 'src/app/services/setup.service';
import {Message} from 'primeng/api';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Parameterss } from 'src/app/entities/Parameterss';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.css']
})
export class SetUpComponent implements OnInit {
  FormArray: { [TypeTestChoising: string]: FormGroup } = {
};
  typeTestChoising!:any;
  public pathOptions: Path[] = []; 
  SetupFrom: FormGroup;
  id!:number;
  idScenario : number=0;
   selectedPath!: any;
   ListParamters : Parameterss[] = [];
   typeTestChoising2 :any[] = []; 
   radioIndices: number[] = [1];
 
  constructor(private fb:FormBuilder, 
    private setupService: SetupService, 
    private activatedRouter: ActivatedRoute,
    private pathService: PathService, 
    private messageService: MessageService,
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
      this.pathOptions = paths;
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
    this.idScenario=this.idScenario+1;
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
  setValue(event : any, scenario: any){
    console.log("scenario", scenario)
    this.typeTestChoising2[scenario]=event.target.value;
    console.log("where i add ☺ :",event.target.value);
    console.log("this.typeTestChoising2")
    console.log(this.typeTestChoising2)

   // this.typeTestChoising=value;
  }
  checkWichType(arryaOfChose:any,index:any){

    if(arryaOfChose[index] == "CONSTANT_LOAD")
      return "CONSTANT_LOAD";
    if(arryaOfChose[index] == "STRESS_LOAD_TEST")
      return "STRESS_LOAD_TEST";
    if(arryaOfChose[index] == "SOAK_LOAD")
      return "SOAK_LOAD";
  return;
  }
  goBack(): void {
    this.router.navigate(['admin/listapp']);
  }

  selectPath(event: Event) {
    const selectedOptionName = (event.target as HTMLSelectElement)?.value;
    if (selectedOptionName) 
      this.selectedPath = this.pathOptions.find(option => option.name === selectedOptionName);
    this.displayparamters(this.selectedPath);
  }
  displayparamters(path :any){
    this.ListParamters=path.parameters;
    console.log(this.ListParamters);
    

  }
  explication_TypeTest(Type:string){
    const messageDetails: { [key: string]: any } = {
      'constantloadTest': { severity: 'info', summary: 'Information', detail: 'test where a consistent number of simulated users generate traffic at a steady rate over a set period.', sticky: true },
      'stressLoadTest': { severity: 'info', summary: 'Information', detail: 'It helps in determining the system’s maximum capacity and uncovering potential performance bottlenecks.', sticky: true },
      'soakLoadTest': { severity: 'info', summary: 'Information', detail: 'This model involves applying a consistent load on the system for an extended period, typically several hours or even days (Endurance testing). ', sticky: true }
    };
  
    const messageDetail = messageDetails[Type];
  
    if (messageDetail) {
      this.messageService.add(messageDetail);
    }
  
    console.log('CLICK ☻☺');
}
setValueInPlace(i:number,Value:string){
  console.log(Value)
  this.ListParamters[i].value = Value;
  console.log( this.ListParamters)
}

}
