import {Component, ViewEncapsulation} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Stack} from "./utils/stack";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', './theme.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(private stack: Stack, private router: Router) {

        this.router.events.subscribe((val) => {
            if(val instanceof NavigationEnd) {
                this.stack.push(val);
            }
        });
    }

    goBack() {
        let current = this.stack.pop();
        let prev = this.stack.peek();

        if (prev) {
            this.stack.pop();
            this.router.navigateByUrl(prev.urlAfterRedirects);
        } else {
            this.stack.push(current);
        }
    }
}
