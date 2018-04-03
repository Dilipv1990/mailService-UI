import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  public mailUrl = "http://localhost:8000/api/send"
  constructor(private http: Http) { }

  sendEmail(data: any): Observable<any> {
    return this.http.post(this.mailUrl, data)
      .map((res: Response) => res.json().status)
      .catch((error: any) => Observable.throw(error.data || 'Server error'))
    
  }
}
