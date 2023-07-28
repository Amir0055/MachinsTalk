import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parameterss } from '../entities/Parameterss';


@Injectable({
  providedIn: 'root'
})
export class ParametersService {
 
  private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) { }

  getAllParamters() {
    return this.http.get<any>(this.baseUrl + '/parameters');
  }
 GetbyId(id: number){
  return this.http.get<any>(this.baseUrl + '/parameters'+id);
 }
  public registerParamters(request: Parameterss) {
    return this.http.post<Parameterss>(this.baseUrl + '/parameters', request);
  }
  public Delete(id: number) {
    return this.http.delete<Parameterss>(this.baseUrl + '/parameters/'+ id );
  }

  public addParamsAndAssignToPaths(request: Parameterss,id: number) {
    return this.http.post<Parameterss>(this.baseUrl + '/parameters/'+id, request);
  }
}
