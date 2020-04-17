import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss'],
})
export class ChallengeEditComponent implements OnInit {
  // Possible to retrieve the paramater as in a web Angular app (subscribing to paramMap)
  isCreating = true;

  constructor(private pageRoute: PageRoute,
              private router: RouterExtensions) {}

  onSubmit(title: string, description: string) {
    console.log(title, ' ', description);
    this.router.backToPreviousPage();
  }

  ngOnInit(): void {
    this.pageRoute.activatedRoute.subscribe((activatedRoute) => {
      activatedRoute.paramMap.subscribe((paramMap) => {
        if (!paramMap.has('mode')) {
          this.isCreating = true;
        } else {
          this.isCreating = paramMap.get('mode') !== 'edit';
        }
      });
    });
  }
}
