import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { path } from '../config.module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
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
    let url = `${this.basePath}usuario`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getAllAdmin() : Observable<any> {
    let url = `${this.basePath}usuario/admin`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getAllAux() : Observable<any> {
    let url = `${this.basePath}usuario/auxiliar`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET ALL
  getAllStudent() : Observable<any> {
    let url = `${this.basePath}usuario/estudiante`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //GET SINGLE
  getSingle(id:number) : Observable<any> {
    let url = `${this.basePath}usuario/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //CREATE
  public create(data:any) : Observable<any> {
    let url = `${this.basePath}usuario`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //CREATE
  public createType(data:any) : Observable<any> {
    let url = `${this.basePath}tipo-usuario`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //CREATE
  public update(data:any) : Observable<any> {
    let url = `${this.basePath}usuario/${data.id}`;
    return this.http.put(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //DELETE
  public delete(id:number) : Observable<any> {
    let url = `${this.basePath}usuario/${id}`;
    return this.http.delete(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  //CHANGE PASSWORD
  public changePassword(data:any) : Observable<any> {
    let url = `${this.basePath}usuario/${data.id}/changepassword`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  //RESET PASSWORD
  public resetpassword(data:any) : Observable<any> {
    let url = `${this.basePath}usuario/password/reset`;
    return this.http.post(url, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
}
