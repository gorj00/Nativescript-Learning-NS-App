import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "~/app/shared/shared.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [{ path: '', component: ChallengeEditComponent }];

@NgModule({
    declarations: [ChallengeEditComponent],
    imports: [
        NativeScriptCommonModule,
        // For routes only
        NativeScriptRouterModule.forChild(routes),
        // Unlocks ns-router-link and such
        // NativeScriptRouterModule,
        SharedModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ChallengeEditModule {}
