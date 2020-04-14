import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute } from 'nativescript-angular/router';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss'],
})
export class ChallengeEditComponent implements OnInit {
  // Possible to retrieve the paramater as in a web Angular app (subscribing to paramMap)
  isCreating = true;

  constructor(private activatedRoute: ActivatedRoute,
              private pageRoute: PageRoute) {}

  // When going back to this page, page is cached, not run with ngOnInit (calling subscription therefore not available)
  ngOnInit(): void {
    // this.activatedRoute.paramMap.subscribe(paramMap => {
    //     console.log(paramMap.get('mode'));
    // });

    // Whenever this page is active (cached or created)
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
