import { Component, Input, OnInit } from '@angular/core';
import { SetupService } from 'src/app/services/setup.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit{

  receivedData!:Blob;

  constructor(private apiService: SetupService) { }
  ngOnInit(): void {
    this.apiService.getData().subscribe((data) => {
      this.receivedData = data;
     let isfinishGeneration= this.apiService.getIsRapportGenerated();
     if(isfinishGeneration)
     this.PopUpModel();
    });
  }

  downloadRapport() {
    let a = document.createElement('a');
    a.download="Rapport.zip";
    a.href=window.URL.createObjectURL(this.receivedData);
    a.click();
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
