import {Directive, Input, HostListener} from '@angular/core';
import {TrackerService} from "../../service/tracker/tracker.service";

@Directive({
    selector: '[tracker]',
})
export class tracker {

    @Input('tracker') key: string;

    constructor(private trackerService: TrackerService) {}

    @HostListener('click', ['$event'])
    clicked(ev: MouseEvent) {
        this.trackerService.addEvent(this.key, ev);
    }
}