import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from '../config.module';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private basePath:string = path.path;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }

  //HANDLE ERROR
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      console.error(
      `Backend returned code ${error.status}, ` +
      `body was: `, error.error);
    }
    return throwError(
      'Algo malo sucedio, por favor intentarlo más tarde D:');
  };

  //GET ALL
  getAll() : Observable<any> {
    let url = `${this.basePath}evaluacion`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getSingle(id:number) : Observable<any> {
    let url = `${this.basePath}evaluacion/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getByDetalleCurso(id:number) : Observable<any> {
    let url = `${this.basePath}evaluacion/asignacion/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //CREATE
  public create(data:any) : Observable<any> {
    let url = `${this.basePath}evaluacion`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //CREATE
  public update(data:any) : Observable<any> {
    let url = `${this.basePath}evaluacion/${data.id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //DELETE
  public delete(id:number) : Observable<any> {
    let url = `${this.basePath}evaluacion/${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    );
  }

}
