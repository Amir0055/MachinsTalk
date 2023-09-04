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
import { application } from 'src/app/entities/application';

@Component({
  selector: 'app-set-up',
  templateUrl: './set-up.component.html',
  styleUrls: ['./set-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetUpComponent implements OnInit {
  Senddata!:Blob;
  typeTestChoising!:any;
   pathSelectOptions: Path[] = [];
    ValuesSaisie: number[] = [];
    ParamterArray!:any;
  SetupFrom: FormGroup;
  idApp!:number;
  listParameters_A_Remplire : Parameterss[] = [];
  setup: Setup = new Setup();
  formDataJson!: any;

 
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
      valueSaisie: this.fb.array([]) ,
      tokenValue:'',
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
        path: this.fb.group({
        id: '',
        name: '',
        path: '',
        requestType: RequestType.get, 
        application:application,
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
      this.prepareObjectToSend();
      this.saveSetupData(this.formDataJson);
  }
  saveSetupData(setup: Setup){
    this.setupService.registerSetup(setup).subscribe( (response) => {
      this.downloadRapport(response);
    },
    (error) => {
      console.error('Error:', error);
    }
  );

  }
  downloadRapport(data: any) {
    let blob:Blob=data.body as Blob
    this.setupService.sendData(blob);
    let a = document.createElement('a');
    a.download="Rapport.zip";
    a.href=window.URL.createObjectURL(blob);
    a.click();
  }

  checkWichType(scenario:any){
    if(scenario.controls.typeTest.value == "CONSTANT_LOAD_TEST")
      return "CONSTANT_LOAD_TEST";
    if(scenario.controls.typeTest.value == "STRESS_LOAD_TEST")
      return "STRESS_LOAD_TEST";
    if(scenario.controls.typeTest.value == "SOAK_LOAD_TEST")
      return "SOAK_LOAD";
      if(scenario.controls.typeTest.value == "Step_Load_Model")
      return "STEP_LOAD_TEST";
      if(scenario.controls.typeTest.value == "BURST_TEST")
      return "BURST_LOAD";
      if(scenario.controls.typeTest.value == "Exponential_Load_Test")
      return "Exponential_Load_Test";
      if(scenario.controls.typeTest.value == "SPIKE_LOAD_TEST")
      return "SPIKE_LOAD";
      if(scenario.controls.typeTest.value == "CAPACITY_TEST")
      return "CAPACITY_TEST";
      if(scenario.controls.typeTest.value == "RAMP_LOAD_TEST")
      return "RAMP_LOAD_TEST";
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
      'SpikeLoadModel': { severity: 'info', summary: 'Information', detail: 'En general for exemple : where they get a sudden spike with a large group of users accessing during the first few hours To WebSite', sticky: true },
      'CapacityLoadModel': { severity: 'info', summary: 'Information', detail: 'Learn how your application scales and monitor when your performances start to decrease and how.', sticky: true },
      'RampLoadModel': { severity: 'info', summary: 'Information', detail: 'Learn how your application scales and monitor when your performances start to decrease and how.', sticky: true },
    };
  
    const messageDetail = messageDetails[Type];
  
    if (messageDetail) {
      this.messageService.add(messageDetail);
    }
  
    console.log('CLICK ☻☺');
}

  getListparamter(Senario:any){
   let selectedPath_X2 = this.pathSelectOptions.find(option => option.name === Senario.value.path.name);
   let listExisteParamters=Senario.value.path.parameters;
   const parameters = selectedPath_X2?.parameters || [];
     const pathFormGroup = Senario.get('path') as FormGroup;
     const idControl = pathFormGroup.get('id');
     const pathControl = pathFormGroup.get('path');
     const appControl = pathFormGroup.get('application');
     idControl?.setValue(selectedPath_X2?.id);
     pathControl?.setValue(selectedPath_X2?.path);
     appControl?.setValue(selectedPath_X2?.application);
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
  getValueSaisie() : FormArray {
    return this.SetupFrom.get("valueSaisie") as FormArray
  }
  getPathParameters(scenarioIndex: number): FormArray {
    const pathControl = this.getPathControl(scenarioIndex);
    return pathControl.get('parameters') as FormArray;
  }
  setParamterValue(){
    console.log("Take Chose ☺");
  }
  handlingInputsTestType(event: any, index: number): void {
    this.ValuesSaisie[index] = event.value;
    console.log(this.ValuesSaisie);
  }
  storageKeyValue(ListParamter:any,event: any, index: number): void {
    console.log("ListParamter");
    ListParamter[index].value=event.value;
    this.ParamterArray=ListParamter;
    console.log(ListParamter);
  }
  prepareObjectToSend(){
    this.formDataJson = this.SetupFrom.getRawValue();
    this.formDataJson.valueSaisie=this.ValuesSaisie;
    this.formDataJson.scenarios ;

    console.log(this.formDataJson); 
  }





  
  PopUpModel() {

    
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    } }

}

