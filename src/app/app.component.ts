import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  ViewContainerRef,
} from '@angular/core';
import { UIService } from './shared/ui.service';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(RadSideDrawerComponent, { static: false })
  drawerComponent: RadSideDrawerComponent;

  private drawerSub: Subscription;
  private drawer: RadSideDrawer;
  private vcRef: ViewContainerRef;

  activeChallenge = '';

  constructor(
    private uiService: UIService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  onChallengeInput(challengeDescription: string) {
    this.activeChallenge = challengeDescription;
    console.log(challengeDescription);
  }

  onLogout() {
    this.uiService.toggleDrawer();
  }

  ngOnInit() {
    this.drawerSub = this.uiService.drawerState.subscribe(() => {
      if (this.drawer) this.drawer.toggleDrawerState();
    });
    this.uiService.setRootVCRef(this.vcRef);
  }

  ngAfterViewInit() {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.drawerSub) this.drawerSub.unsubscribe();
  }
}
