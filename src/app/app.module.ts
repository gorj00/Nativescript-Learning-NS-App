// To play 4-7
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { StackComponent } from './layouts/stack/stack.component';
import { FlexboxComponent } from './layouts/flexbox/flexbox.component';
import { GridComponent } from './layouts/grid/grid.component';
import { AbsoluteComponent } from './layouts/absolute/absolute.component';
import { AuthComponent } from './auth/auth.component';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { SharedModule } from './shared/shared.module';
import { ChallengeActionsModule } from './challenges/challenge-actions/challenges-actions.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    NativeScriptUISideDrawerModule,
    SharedModule,
    ChallengeActionsModule,
  ],
  declarations: [
    AppComponent,
    StackComponent,
    FlexboxComponent,
    GridComponent,
    AbsoluteComponent,
    AuthComponent,
    DayModalComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [DayModalComponent],
})

export class AppModule {}
