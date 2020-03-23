import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ns-challenge-edit',
    templateUrl: './challenge-edit.component.html',
    styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent implements OnInit {

    @Output() input = new EventEmitter<string>();

    constructor() { }

    challengeDescription = '';

    onSetChallenge() {
        this.input.emit(this.challengeDescription);
    }

    ngOnInit(): void {
    }

}
