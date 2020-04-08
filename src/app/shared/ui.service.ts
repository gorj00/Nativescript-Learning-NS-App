import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIService {
  private _drawerState = new BehaviorSubject<void>(null);
  private _rootVCRef: ViewContainerRef;

  get drawerState() {
    return this._drawerState.asObservable();
  }

  toggleDrawer() {
    this._drawerState.next();
  }

  // So the entire app with tabs is replaced by the modal, not just the current component
  setRootVCRef(vcRef: ViewContainerRef) {
    this._rootVCRef = vcRef;
  }

  getRootVCRef() {
    return this._rootVCRef;
  }
}
