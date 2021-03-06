import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss'],
})
export class DayModalComponent implements OnInit {
  loadedDate: Date;

  constructor(private modalParams: ModalDialogParams) {}

  onHandleInput(action: 'complete' | 'fail' | 'cancel') {
    this.modalParams.closeCallback(action);
  }

  ngOnInit(): void {
    this.loadedDate = (this.modalParams.context as { date: Date }).date;
  }
}
