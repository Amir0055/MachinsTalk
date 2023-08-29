import { ChangeDetectorRef, Component, NgZone, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from 'src/app/entities/Path';
import { Setup } from 'src/app/entities/Setup';
import { PathService } from 'src/app/services/path.service';
import { SetupService } from 'src/app/services/setup.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Parameterss } from 'src/app/entities/Parameterss';
import { RequestType } from 'src/app/entities/RequestType';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetUpComponent implements OnInit {
  FormArray: { [TypeTestChoising: string]: FormGroup } = {
};
  typeTestChoising!:any;
   pathSelectOptions: Path[] = [];
  SetupFrom: FormGroup;
  idApp!:number;
  listParameters_A_Remplire : Parameterss[] = [];
  setup: Setup = new Setup();

 
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
      this.idApp = +params['id'];
    });


  this.pathService.findByApplication_Id(this.idApp).subscribe(
    (paths: Path[]) => {
      this.pathSelectOptions = paths;
    },
    error => {
      console.error(error,"♦ Error Geting Path By App id !"); // Affichez les éventuelles erreurs dans la console
    }
  );
}

  newSen(): FormGroup {
    return this.fb.group({
      name: '',
      typeTest: '',
    //  scenario: '',
   //   erreurMsg: '',
   //   success: true,
   //   pauseTime:'',
     // eapsedTime:'',
     // duration:'',
     // tryMax:'',
        path: this.fb.group({
        id: '',
        name: '',
        path: '',
        requestType: RequestType.get, 
        parameters: this.fb.array([]),
      }),
 
    })
  }

  parametersArray(scenarioIndex: number): FormArray {
    const scenarioGroup = this.getScenarios().at(scenarioIndex) as FormGroup;   
    return scenarioGroup.get('path.parameters') as FormArray;
  }
  addSen() {
    this.getScenarios().push(this.newSen());
  }
   
  removeSen(i:number) {
    this.getScenarios().removeAt(i);
  }
   
  onSubmit() {
  
      const setupData: Setup = this.SetupFrom.value;
    console.log(this.getPathParameters(0)); 
   //   this.addSetup(setupData);
  }
  addSetup(setup: Setup){
    this.setupService.registerSetup(setup).subscribe((data) => { 
    },(error) =>{
      console.error('Failed Add Setup Data ', error);
    });
  }

  checkWichType(scenario:any){
    if(scenario.controls.typeTest.value == "CONSTANT_LOAD")
      return "CONSTANT_LOAD";
    if(scenario.controls.typeTest.value == "STRESS_LOAD_TEST")
      return "STRESS_LOAD_TEST";
    if(scenario.controls.typeTest.value == "SOAK_LOAD")
      return "SOAK_LOAD";
      if(scenario.controls.typeTest.value == "Step_Load_Model")
      return "STEP_LOAD_TEST";
      if(scenario.controls.typeTest.value == "BURST_TEST")
      return "BURST_LOAD";
      if(scenario.controls.typeTest.value == "Exponential_Load_Test")
      return "Exponential_Load_Test";
  return ;
  }
  goBack(): void {
    this.router.navigate(['admin/listapp']);
  }

  explication_TypeTest(Type:string){
    const messageDetails: { [key: string]: any } = {
      'constantloadTest': { severity: 'info', summary: 'Information', detail: 'test where a consistent number of simulated users generate traffic at a steady rate over a set period.', sticky: true },
      'stressLoadTest': { severity: 'info', summary: 'Information', detail: 'It helps in determining the system’s maximum capacity and uncovering potential performance bottlenecks.', sticky: true },
      'soakLoadTest': { severity: 'info', summary: 'Information', detail: 'This model involves applying a consistent load on the system for an extended period, typically several hours or even days (Endurance testing). ', sticky: true },
      'ExponentialLoadTest': { severity: 'info', summary: 'Information', detail: 'In this model, the rate of growth continuously accelerates (a compounding growth),This type of load model is used to simulate scenarios where the load on the system keeps on growing', sticky: true },
      'BurstTest': { severity: 'info', summary: 'Information', detail: 'It simulates bursts of user activity followed by normal load periods and there can be multiple bursts in a session,Test the ability to handle varying loads over time (rapid increases and idle periods)', sticky: true },
      'StepLoadModel': { severity: 'info', summary: 'Information', detail: 'Step Load is gradually increased by adding virtual users or requests in predefined steps ', sticky: true },
    };
  
    const messageDetail = messageDetails[Type];
  
    if (messageDetail) {
      this.messageService.add(messageDetail);
    }
  
    console.log('CLICK ☻☺');
}
storageKeyValue(Senario:any,i:number,Value:string){
  this.listParameters_A_Remplire[i].value = Value;

}


  getListparamter(Senario:any){
    console.log(Senario);
    
   let selectedPath_X2 = this.pathSelectOptions.find(option => option.name === Senario.value.path.name);
   let listExisteParamters=Senario.value.path.parameters;
   const parameters = selectedPath_X2?.parameters || [];
     const pathFormGroup = Senario.get('path') as FormGroup;
     const idControl = pathFormGroup.get('id');
     idControl?.setValue(selectedPath_X2?.id);
 /* parameters.forEach((value) => {
    const found = listExisteParamters.find((obj :Parameterss) => {
      return obj.clee === value.clee;
    });
    if(!found)
    this.pushParameterToFormGroupe(value);
  });*/
  this.pushParameterToFormGroupe(parameters);
    return parameters;
  }

  createFormGroupe_Parameter(parameters: Parameterss): FormGroup {
    return this.fb.group({
      clee: [parameters.clee],  
      value: [parameters.value],
    });
    }
  addParameter(pathGroup: FormGroup,parameters: Parameterss[]) {
    const parametersArray = pathGroup.get('parameters') as FormArray;
    //vide la list before 
    parametersArray.clear();
    parameters.forEach((value) => {
      parametersArray.push(this.createFormGroupe_Parameter(value));
    });

  }

  pushParameterToFormGroupe(parameters: Parameterss[]) {
    const scenariosArray = this.getScenarios();
    const lastScenarioGroup = scenariosArray.at(scenariosArray.length - 1) as FormGroup;
    const pathGroup = lastScenarioGroup.get('path') as FormGroup;
    this.addParameter(pathGroup,parameters);
  }

  SetValueParamter(scenario:any){
    console.log(scenario);
  }
  
  getPathControl(scenarioIndex: number) {
    return (this.getScenarios().controls[scenarioIndex] as FormGroup).get('path') as FormGroup;
  }
  getScenarios() : FormArray {
    return this.SetupFrom.get("scenarios") as FormArray
  }
  getPathParameters(scenarioIndex: number): FormArray {
    const pathControl = this.getPathControl(scenarioIndex);
    return pathControl.get('parameters') as FormArray;
  }
  setParamterValue(){
    console.log("Take Chose ☺");
    
  }
}

