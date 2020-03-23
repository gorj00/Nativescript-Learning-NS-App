import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    activeChallenge = '';

    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
        console.log(challengeDescription);
    }
 }
