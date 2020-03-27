import { Component, Input, OnInit} from '@angular/core';
// To detect platform
import { isAndroid, isIOS, Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

// Globally available to Nativescript
declare var android: any;

@Component({
    selector: 'ns-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
    @Input() title: string;
    @Input() showBackButton = true;

    constructor(private page: Page, private router: RouterExtensions) { }

    // behaves like a property (canGoBack instead of canGoBack())
    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }

    onGoBack() {
        this.router.backToPreviousPage();
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

    ngOnInit(): void {
    }

}
