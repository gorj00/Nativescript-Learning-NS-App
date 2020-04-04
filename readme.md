# NativeScript

## # Basic Project Terminal Commands
```bash
# App runs on Android emulator
tns run adnroid --bundle

# For debugging
tns debug android --bundle
```
- `android` is interchangeable for `ios`

## # Text
```html
<Label
    class="title"
    text="The current challenge"
    horizontalAlignment="center"
></Label>
```
Properties:
- **horizontalAlignment**

## # Gesture Events
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

## # Navigation
Navigating to another page.

### Navigation with template
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

### Navigation with logic
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

### Page Router Outlet
```html
<!-- app.component.html -->
<page-router-outlet></page-router-outlet>
```

### Tab Navigation
- Initiated with a `<TabView>` tag,
  - position of tabs declared with `androidTabsPosition="position"` property,
  - tab text color with a `selectedTabTextColor` property,
  - tab underline color with a `androidSelectedTabHighlightColor` property (Android only)
- tab item declared with a `*tabItem="{ title: 'Tab Title' }"` directive on a layout tag,

**Non-routed content**:
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

**Routed content**:
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

## # Platform Recognition
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
### Platform recognition example
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


