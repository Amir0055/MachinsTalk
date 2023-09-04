import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setup } from '../entities/Setup';
import { Directory } from '../entities/Directory';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  private Raport = new Subject<Blob>();
  private isRapportGenerated= false;
  private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) {
    
   }

  public registerSetup(request: Setup) {
    return this.http.post(this.baseUrl + '/setup', request,{
     observe:'response' ,responseType: 'blob'
    });
  }
  
  downloadRapport(directoryurl: Directory): Observable<Blob> {
    return this.http.post(this.baseUrl+"/setup/rapport", directoryurl, {
      responseType: 'blob'
    });
  }



  sendData(data: any) {
    this.Raport.next(data);
    this.isRapportGenerated=true;
  }

  getData() {
    return this.Raport.asObservable();
  }
  getIsRapportGenerated() {
    return this.isRapportGenerated;
  }
}
