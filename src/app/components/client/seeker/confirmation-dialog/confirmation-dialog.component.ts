import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  options: any = {
    path: 'assets/lotties/54092-success.json',
    loop: false
  }; 

  constructor() { }

  ngOnInit(): void {
  }

}
