import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss',  './theme.scss']
})
export class AppComponent {

    // defined the keyMap
    keyMap = new Map();

    // defined the keypressed
    keypress: string = '';

    timer: number;

    // add the HostListener
    @HostListener('document:keydown', ['$event'])
    onKeyDown(ev: KeyboardEvent) {

        // filter out all non CTRL key presses and
        // when only CTRL is key press
        if (ev.ctrlKey && ev.keyCode !== 17) {

            // display user selection
            this.highlightKeypress(`ctrl+${ev.key}`);

            // check if user selection is already registered
            if (this.keyMap.has(`ctrl+${ev.key}`)) {

                // extract the registered path
                const path = this.keyMap.get(`ctrl+${ev.key}`);

                // navigate
                this.router.navigateByUrl(path);
            }
        }
    }

    constructor(private router: Router) {
        // loop over the router configuration
        this.router.config.forEach((routerConf)=> {

            // extract the keymap
            const keyMap = routerConf.data ? routerConf.data.keymap : undefined;

            // if keymap exists for the route and is not a duplicate, add
            // to master list
            if (keyMap && !this.keyMap.has(keyMap)) {
                this.keyMap.set(keyMap, `/${routerConf.path}`);
            }
        })
    }

    highlightKeypress(keypress: string) {
        // clear existing timer, if any
        if (this.timer) {
            clearTimeout(this.timer);
        }

        // set the user selection
        this.keypress = keypress;

        // reset user selection
        this.timer = setTimeout(()=> {
            this.keypress = '';
        }, 5000);
    }

}
