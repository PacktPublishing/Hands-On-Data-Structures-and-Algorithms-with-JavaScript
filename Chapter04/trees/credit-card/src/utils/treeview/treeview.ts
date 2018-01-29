import {Component, Input} from '@angular/core';

@Component ({
    selector: 'tree-view',
    templateUrl:'./treeview.html',
    styleUrls: ['./treeview.scss']
})
export class TreeView {
    @Input() data;
}