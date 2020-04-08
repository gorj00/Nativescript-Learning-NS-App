import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css'],
})
export class ChallengeTabsComponent implements OnInit {
  constructor(private router: RouterExtensions,
              private active: ActivatedRoute,
              private page: Page) {}

  ngOnInit(): void {
    this.router.navigate(
      [
        {
          outlets: {
            'current-challenge': ['current-challenge'],
            today: ['today'],
            // Would work too...
            // 'today': ['today']
          },
        },
      ],
      {
        relativeTo: this.active,
      }
    );
    // To hide the second ActioBar
    // Must use router-outlet instead of page-router-outlet and wrap normal router-outlets to StackLayouts and put *tabItem directive on them
    // Action bar doesn't change title, rerendered only with a new page, therefore, must use page-router-outlet
    // Now, there are two action bars - we hide the second one
    this.page.actionBarHidden = true;
  }
}
