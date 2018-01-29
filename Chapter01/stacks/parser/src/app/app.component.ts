import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './theme.scss'],
    encapsulation: ViewEncapsulation.None

})
export class AppComponent {
    worker: any;
    code: any = `(1 + 1) * 2`;
    result: any;

    constructor() {
        this.setUpParser();
        this.codeChange();
    }
    
    codeChange() {
        this.worker.postMessage(this.code);
    }

    private setUpParser() {
        this.worker = new Worker('scripts.bundle.js');

        this.worker.addEventListener('message', (e) => {
            this.result = e.data;
        });
    }


}
