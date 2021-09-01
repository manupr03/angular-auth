import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User} from './user.model'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  constructor(private _http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this._http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4cEzpl-HnmLiJgAy8pAVxw869vWBWl7E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError),tap(resData =>{
        this.handleAuthentication(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
      }))
  }

  login(email: string, password: string) {
    return this._http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4cEzpl-HnmLiJgAy8pAVxw869vWBWl7E',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(this.handleError),tap(resData =>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
    }));
  }

  private handleAuthentication(
    email:string,
    userId:string,
    token:string,
    expiresIn:number
  ){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email,userId,token,expirationDate)
    this.user.next(user)

  }

  private handleError(errorRes: HttpErrorResponse){
    let errMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email already exists';
          break
      case 'EMAIL_NOT_FOUND':
        errMessage = 'this email not exists'
          break
      case 'INVALID_PASSWORD':
        errMessage ='this password is not correct'
          break
      
    }
    return throwError(errMessage);
  }
}
