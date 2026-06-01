import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  private readonly API_BASE = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065';
  private readonly API_KEY = 'CWA-0DF49296-2C40-408C-AE52-17D1EE4F5728';

  constructor(private http: HttpClient) {}

  getApi(): Observable<any> {
    return this.http.get(`${this.API_BASE}?Authorization=${this.API_KEY}`);
  }
}
