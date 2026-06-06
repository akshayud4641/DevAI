import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from './cache-service';

const API_URL = 'http://127.0.0.1:8000'

@Injectable({
  providedIn: 'root',
})
export class HttpServices {
  
  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ){}

  getHeaders() {
    let userToken = localStorage.getItem(this.cacheService.userTokenKey);
    return {
      Authorization: `Bearer ${userToken}`,
    }
  }
  
  register(data: {Name:string, username: string; password: string }): Observable<any> {
      return this.http.post(`${API_URL}/register`, data);
  }

  
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/login`, data);
  }

  getUer(): Observable<any> {
    return this.http.get(`${API_URL}/getUser`, {headers: this.getHeaders()});
  }

  async askAI(requirement: string, onChunk: (data: string) => void) {
    let url = `${API_URL}/ask_ai?requirement=${encodeURIComponent(requirement)}`;
    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: this.getHeaders()
      }
    );
    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, {stream: true});
      onChunk(chunk)
    }
  }


}
