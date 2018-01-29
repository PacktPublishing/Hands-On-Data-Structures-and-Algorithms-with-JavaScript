import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { routes, navigatableComponents } from "./app.routing";
import { Stack } from "./utils/stack";

@NgModule({
    declarations: [
        AppComponent,
        ...navigatableComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,

        // material
        MatButtonModule
    ],
    providers: [
        Stack
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
