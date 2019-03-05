import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  public response: any = '';

  public alert: boolean;

  ngOnInit() {
    this.response = this.data.response;
    this.alert = this.data.alert;
    setTimeout(() => { this.dialogRef.close(); }, 5000)
  }

  onClose() {
    return this.dialogRef.close();
  }

}
