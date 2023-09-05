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
      this.apiService.setupComplete$.subscribe(() => {
        this.PopUpModel();
       console.log("NIIICEE I RECIVE THAT U completed ");
      });
    });
  }

  downloadRapport() {
    let a = document.createElement('a');
    a.download="Rapport.zip";
    a.href=window.URL.createObjectURL(this.receivedData);
    a.click();
  }
    
  
  PopUpModel() {
    const modelDiv = document.getElementById('myModal1');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal1');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    } }

}
