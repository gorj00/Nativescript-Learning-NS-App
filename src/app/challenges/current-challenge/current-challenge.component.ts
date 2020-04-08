import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '~/app/shared/ui.service';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.css'],
})
export class CurrentChallengeComponent {
  constructor(private modalDialog: ModalDialogService,
              private vcRef: ViewContainerRef,
              private uiService: UIService) {}
  // ViewContainerRef of this component in a tab, tabs are not replaced

  // onEdit() {
  //     this.router.navigate(['/challenges/edit'], {
  //         transition: { name: 'slideLeft' }
  //     });
  // }

  onChangeStatus() {
    // To open a modal, loads a component
    // DayModalComponent is not by a selector or tag, Angular doesn't know it is supposed to create it → entryComponents in app.module
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
}
