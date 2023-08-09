import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setup } from '../entities/Setup';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) { }

  public registerSetup(request: Setup) {
    return this.http.post<Setup>(this.baseUrl + '/setup', request);
  }
}
