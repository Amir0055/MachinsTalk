import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { application } from '../entities/application';
import { Observable } from 'rxjs';
import { Path } from '../entities/Path';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  usersUrl="http://localhost:8085/applications";
  idApp !:number;
 
  constructor(private _http:HttpClient,
    private router: Router
    ) { }
    findAll()  {
      return this._http.get<any>(this.usersUrl);
      }
    findById(id: any): Observable<application> {
      return this._http.get<application>(`${this.usersUrl}/${id}`);
      
    }
    save(application: application): Observable<any> {
      return this._http.post(`${this.usersUrl}`,application);
    }
    update(application: application): Observable<application> {
      return this._http.put<application>(`${this.usersUrl}`, application);
    }
    delete(id: any): Observable<any> {
      return this._http.delete(`${this.usersUrl}/${id}`);
    }
    usersUrl1="http://localhost:8085/paths";
     deletee(id: any): Observable<any> {
      return this._http.delete(`${this.usersUrl1}/${id}`);
    }

}
