import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_BASE = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get(`${API_BASE}/lines`);
  }
}
