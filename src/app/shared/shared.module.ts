import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ActionBarComponent } from './ui/action-bar/action-bar.component';

@NgModule({
  // NativeScriptCommonModule for ngId and such ...
  // NativeScriptRouterModule for routing in declared component elements
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
})
export class SharedModule {}
