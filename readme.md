# NativeScript Docs

### Basic Project Terminal Commands
```bash
# App runs on Android emulator
tns run adnroid --bundle

# For debugging
tns debug android --bundle
```
- `android` is interchangeable for `ios`

## 1. TEXT
```html
<Label
    class="title"
    text="The current challenge"
    horizontalAlignment="center"
></Label>
```
Properties:
- **horizontalAlignment**

## 2. GESTURE EVENTS
```html
<Button text="edit" (tap)="onEdit()"></Button>
```
Gesture events list:
- **(tap)**="methodName($event)",
- **(doubleTap)**="methodName($event)",
- **(longPress)**="methodName($event)",
- **(swipe)**="methodName($event)",
- **(pan)**="methodName($event)",
- **(pinch)**="methodName($event)",
- **(rotation)**="methodName($event)",
- **(touch)**="methodName($event)"

## 3. NAVIGATION
Navigating to another page.

### 3.1. Navigation with template
- `nsRouterLink` property,
  - `pageTransition` property,
    - `curl`, `curlUp` (iOS),
    - `curlDown` (iOS),
    - `explode` (Android Lolliopp+),
    - `fade`,
    - `flip`, `flipRight`,
    - `flipLeft`,
    - `slide`, `slideLeft`,
    - `slideRight`,
    - `slideTop`,
    - `slideBottom`
  - `clearHistory` property

```html
<Button
    text="today works!"
    class="btn btn-primary"
    nsRouterLink="/current-challenge"
    pageTransition="slideLeft"
    clearHistory="true"
></Button>
```

### 3.2. Navigation with logic
- import `RouterExtensions` from **nativescript-angular/router**,
- `clearHistory` option to **create new stack** of pages,

```typescript
import { RouterExtensions } from 'nativescript-angular/router';

  // ... code ...

  // wrapper around Angular router
  constructor(private router: RouterExtensions) { }

  navigate() {
      // Creates new stack of pages
    this.router.navigate(['/today'], {
      clearHistory: true,
      transition:  { name: 'slideLeft' }
      });
  }
```

### 3.3. Page Router Outlet
```html
<!-- app.component.html -->
<page-router-outlet></page-router-outlet>

<!-- possible to name them as well -->
<page-router-outlet name="today"></page-router-outlet>
```

### 3.4. Tab Navigation
- Initiated with a `<TabView>` tag,
  - position of tabs declared with `androidTabsPosition="position"` property,
  - tab text color with a `selectedTabTextColor` property,
  - tab underline color with a `androidSelectedTabHighlightColor` property (Android only)
- tab item declared with a `*tabItem="{ title: 'Tab Title' }"` directive on a layout tag,

**3.4.1. Non-routed content**:
```html
<TabView>
  <StackLayout *tabItem="{ title: 'Today' }">
    <Label text="Tab 1"></Label>
  </StackLayout>
  <StackLayout *tabItem="{ title: 'Current Challenge' }">
    <Label text="Tab 2"></Label>
  </StackLayout>
</TabView>
```

**3.4.2. Routed content**:
```html
<!-- .html file -->

<!-- normal router-outlet wrapped in StackLayout -->

<TabView
  androidTabsPosition="bottom"
  androidSelectedTabHighlightColor="purple"
  selectedTabTextColor="purple"
>
  <StackLayout *tabItem="{ title: 'Today' }">
    <router-outlet name="today"></router-outlet>
  </StackLayout>
  <StackLayout *tabItem="{ title: 'Current Challenge' }">
    <router-outlet name="current-challenge"></router-outlet>
  </StackLayout>
</TabView>
```

```typescript
// .ts file

// router from RouterExtensions
// active router from ActivatedRoute

// to route to both of the tab contents on page load
ngOnInit(): void {
    this.router.navigate([
        {
            outlets:  {
                'current-challenge': ['current-challenge'],
                'today': ['today']
            }
        }],
        {
            relativeTo: this.active
        }
    );
```

### 3.5. Side Drawer
1. Must install a plugin `tns plugin add nativescript-ui-sidedrawer
`,
1. must declare it in _Module_ file:
```typescript
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
@NgModule({
    imports: [
        ....
        NativeScriptUISideDrawerModule,
        ....
    ],
    declarations: [
        ....
    ]
})
```
3. use as a `<RadSideDrawer>` tag in the template:
```html
<!-- app.component.html -->

<RadSideDrawer>
    <FlexboxLayout tkDrawerContent class="drawer-container">
        <Button text="Logout"></Button>
    </FlexboxLayout>
    <StackLayout tkMainContent>
        <page-router-outlet></page-router-outlet>
    </StackLayout>
</RadSideDrawer>
```
  - define a `tkDrawerContent` directive,
  - define a `tkMainContent` directive

4. set up an **UIService** with _RxJS_'s subject to let Angular know, when Side Drawer is supposed to pop up:
```typescript
// ui.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);

    get drawerState() {
        return this._drawerState.asObservable();
    }

    toggleDrawer() {
        this._drawerState.next();
    }
}
```

5. set up the Side Drawer with the use of **ViewChild**:
```typescript
// app.component.ts

...
import {
    AfterViewInit,
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ChangeDetectorRef
} from "@angular/core";
import { UIService } from "./shared/ui.service";
import {
    RadSideDrawerComponent
} from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(RadSideDrawerComponent, { static: false }) drawerComponent: RadSideDrawerComponent;

  private drawerSub: Subscription;
  private drawer: RadSideDrawer;

  constructor(private uiService: UIService,
              private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.drawerSub = this.uiService.drawerState.subscribe(() => {
        if (this.drawer) this.drawer.toggleDrawerState();
    });
  }

  ngAfterViewInit() {
      this.drawer = this.drawerComponent.sideDrawer;
      this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy() {
      if (this.drawerSub) this.drawerSub.unsubscribe();
  }
}
```

6. **toggle** drawer in you navigation with the **service** methods:
```html
<!-- .html file  -->

<ActionItem (tap)="onToggleMenu()">
  <Label text="Menu"></Label>
</ActionItem>
```
```typescript
// .ts file

import { UIService } from '../../ui.service';

export class ExampleComponent {
  constructor(private uiService: UIService) { }

  onToggleMenu() {
    this.uiService.toggleDrawer();
  }
}
```

### 3.6. Hiding ActionBar
```typescript
// Must inject page to constructor

this.page.actionBarHidden = true;
```

### 3.7. Show/Not-show Back Button in ActionBar
```typescript
// Inside typescript ActionBarComponent class

@Input() showBackButton = true;

    constructor(rivate router: RouterExtensions) { }

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }
```
```html
<ns-action-bar
    title="Today's Challenge"
    [showBackButton]="false"
></ns-action-bar>
```


## 4. PLATFORM RECOGNITION
To detect, whether you are on a Android or iOS device only (to affect only specific styles of functionality)

**1. step**
```typescript
import { isAndroid, isIOS, Page } from 'tns-core-modules/ui/page';
```
**2. step**
- after imports and before Component decorator, declare a **Global Android variable** `declare var android: any;`,
  - may be used to write **native** code,

**3. step**
- used as a condition statement:
```typescript
if (isAndroid) {
  // Android specific code ...
} else if (ios) {
  // iOS specific code ...
}
```
### 4.1. Platform recognition example
Android black back arrow navigation in Ation Bar.

Also with:
- **canGoBack** property,
- **onGoBack()** method,
- router's **backToPreviousPage()** method

```html
<!-- .html file -->
<NavigationButton
  text="Back"
  android.systemIcon="ic_menu_back"
  *ngIf="canGoBack"
  (tap)="onGoBack()"
></NavigationButton>
```
```typescript
// .ts file

import { isAndroid, isIOS, Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

// Globally available to Nativescript
declare var android: any;

@Component({
    // code ...
})
export class AnyComponent {
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

}

```
## 5. CSS, STYLING & THEMING
### 5.1. Selectors
- type,
- .class,
- #id,
- hierarchical .selectors,
- [attribute],
- :pseudo (only :highlighted and :disabled)

### 5.2. Properties
- most common ones

### 5.3. Platform Specific Styles
1. platform-specific **stylesheets**,
   - `styles.component.ios.css`,
   - `styles.component.android.css`
1. platform-specific **markup blocks**,
   - `<ios> ... </ios>`,
   - `<android> ... </android>`
1. platform-specific **attributes**,
   - not limited only to style attribute,
   - `<Label ios:style="...">`,
   - `<Label android:style="...">`
1. platform-specific **CSS rules** _requires plugin_
   - `.ios .mystyle { ... }`,
   - `.android .mystyle { ... },`

### 5.4. Global Specific-platform Stylesheets
- delete _app.css_,
- create:
  - app.ios.css,
  - app.android.css,
  - app.common.css,
- import _app.common.css_ to the platform specific stylesheets

### 5.5. Component Specific-platform Stylesheets
- delete _xxx.component.css_,
- create:
  - xxx.component.ios.css,
  - xxx.component.ioandroids.css,
  - xxx.component.common.css,
- in **.ts file**, define **common stylesheet**:
```typescript
styleUrls: [
  './xxx.component.common.css', // only common stylesheet to add
  './xxx.component.css' // Nativescript compiles ios and android to this
]
```
## 6. PASSING DATA
- Regular methods provided by Angular (Input, Output, RxJS's subjects etc.)

### 6.1. PARAMETER
- You have a dynamic **parameter** seteup in the route, example:
```typescript
{ path: ':mode', component: ExampleComponent },
```
- you can access it in the **.ts file**, either with regular web Angular **paramMap**,
  - used when parameter doesn't change on reload (user activity)
```typescript
// When going back to this page, page is cached, not run with ngOnInit (calling subscribtion therefore not available)
import { ActivatedRoute } from '@angular/router';

export class ExampleComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(paramMap => {
            console.log(paramMap.get('mode'));
        });

    }
}
```
- or with Nativescript's **PageRoute**:
  - used when parameter is changed whether it is cached or created (recommended)
```typescript
// Whenever this page is active (cached or created)
import { PageRoute } from 'nativescript-angular/router';

export class ExampleComponent implements OnInit {

    constructor(private pageRoute: PageRoute) { }

    ngOnInit(): void {

      this.pageRoute.activatedRoute.subscribe(activatedRoute => {
            activatedRoute.paramMap.subscribe(paramMap => {
                if (!paramMap.has('mode')) {
                    this.isCreating = true;
                } else {
                    this.isCreating = paramMap.get('mode') !== 'edit';
                }
            });
        });

    }
}
```

## 7. MODAL


