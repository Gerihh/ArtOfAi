import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  APIURL = 'https://art-of-ai-auction.jedlik.cloud';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIURL}/api/categories`);
  }

  getPaintingsByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIURL}/api/paintings/${categoryId}`);
  }

  getBidsByPainting(paintingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIURL}/api/bids/${paintingId}`);
  }

  sendBid(model: any): Observable<any> {
    return this.http.post(`${this.APIURL}/api/bid`, model);
  }
}
