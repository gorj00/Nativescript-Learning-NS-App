import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ns-challenge-actions',
  templateUrl: './challenge-actions.component.html',
  styleUrls: ['./challenge-actions.component.scss']
})
export class ChallengeActionsComponent implements OnInit {
  @Output() actionSelect = new EventEmitter<'complete' | 'fail' | 'cancel'>();
  @Input() cancelText = 'Cancel';

  constructor() { }

  onAction(action: 'complete' | 'fail' | 'cancel'): void {
    this.actionSelect.emit(action);
  }

  ngOnInit(): void {
  }

}
