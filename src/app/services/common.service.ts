import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  showSnackBar: boolean = false;
  snackBarMessage: string = '';

  openSnackBar(message: string): void {
    this.snackBarMessage = message;
    this.showSnackBar = true;
    setTimeout(() => {
      this.showSnackBar = false;
    }, 3000);
  }

  modifyReqValue(req: any): string {
    return JSON.parse(JSON.stringify(req));
  }
}
