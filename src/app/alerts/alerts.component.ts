import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertsComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

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
