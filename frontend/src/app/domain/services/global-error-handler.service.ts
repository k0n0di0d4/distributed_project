import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = ""
    if (error.status === 0) {
      console.error('Error occured', error.error)
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      switch (error.status) {
        case 400:
          errorMessage = "Fields are invalid"
          break;
        case 401:
          this.router.navigate(['/login']);
          break;
        case 404:
          errorMessage = "User not found"
          break
      }

    }
    return throwError(() => new Error(errorMessage));
  }

}