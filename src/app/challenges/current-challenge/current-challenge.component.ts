import { Component } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
// To detect platform
import { isAndroid, isIOS, Page } from 'tns-core-modules/ui/page';

// Globally available to Nativescript
declare var android: any;

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
})

export class CurrentChallengeComponent {
    constructor(private router: RouterExtensions, private page: Page) { }

    onEdit() {
        this.router.navigate(['/edit-challenge']);
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButtton = androidToolbar.getNavigationIcon();
            if (backButtton) {
                backButtton.setColorFilter(android.graphics.Color.parseColor('#171717'), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
            }
        }
    }
}
