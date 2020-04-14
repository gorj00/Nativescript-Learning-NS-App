import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '~/app/shared/ui.service';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: [
    './_current-challenge.component.common.scss',
    './current-challenge.component.scss',
  ],
})
export class CurrentChallengeComponent implements OnInit {
  private currentMonth: number;
  private currentYear: number;

  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  days: { dayInMonth: number; dayInWeek: number }[] = [];

  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService
  ) {}
  // ViewContainerRef of this component in a tab, tabs are not replaced

  // onEdit() {
  //     this.router.navigate(['/challenges/edit'], {
  //         transition: { name: 'slideLeft' }
  //     });
  // }

  onChangeStatus() {
    // To open a modal, loads a component
    // DayModalComponent is not created by a selector or tag, Angular doesn't know it is supposed to create it → entryComponents in app.module
    this.modalDialog
      .showModal(DayModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRootVCRef()
          ? this.uiService.getRootVCRef()
          : this.vcRef,
        // Passing data into the modal
        context: { date: new Date() },
        // Data passed from modal
      })
      .then((action: string) => console.log(action));
  }

  getRow(
    index: number,
    day: { dayInMonth: number; dayInWeek: number }
  ): number {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
    return startRow + weekRow + irregularRow;
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    for (let i = 1; i < daysInMonth + 1; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      const dayInWeek = date.getDay();
      this.days.push({ dayInMonth: i, dayInWeek });
    }
  }
}
