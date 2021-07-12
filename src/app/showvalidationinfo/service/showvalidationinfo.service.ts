import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarComponent } from '../component/snackbar/snackbar.component';
import { snackbar } from '../config/config.interface';


@Injectable({
  providedIn: 'root'
})
export class ShowvalidationinfoService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackBar(configuration:snackbar) {
		this.snackbar.openFromComponent(SnackbarComponent, {
		  duration: (configuration.duration?configuration.duration:1) * 1000,
      data: configuration.data,
      horizontalPosition:(configuration.horizontalPosition?configuration.horizontalPosition:'right'),
      verticalPosition:(configuration.verticalPosition?configuration.verticalPosition:'bottom'),
      panelClass:configuration.panelClass?configuration.panelClass:null ,
      
		});
    }
}
