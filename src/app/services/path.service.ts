import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from '../entities/Path';
@Injectable({
  providedIn: 'root'
})
export class PathService {
  
  private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) { }

  getAllPaths() {
    return this.http.get<any>(this.baseUrl + '/paths');
  }
  findById(id:number){
    return this.http.get<any>(this.baseUrl + '/paths/'+id);
  }

 findByApplication_Id( id:number){
  return this.http.get<any>(this.baseUrl + '/paths/ListPathByApplicationId/'+id);
 }


  public registerPath(request: Path) {
    return this.http.post<Path>(this.baseUrl + '/paths', request);
  }
  affect(id: number,path: Path): Observable<any> {
    return this.http.post(this.baseUrl+"/paths/"+id,path);
  }
  //PUT http://localhost:8085/paths
  update(path: Path): Observable<any> {
    return this.http.put(this.baseUrl+"/paths",path);
  }
  updateWithParameters(path: Path): Observable<any> {
    return this.http.put(this.baseUrl+"/paths/Update-path-Parameters",path);
  }
}
