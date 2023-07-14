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

  public registerPath(request: Path) {
    return this.http.post<Path>(this.baseUrl + '/paths', request);
  }
}
