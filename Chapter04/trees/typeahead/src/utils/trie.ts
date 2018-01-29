import {Injectable} from "@angular/core";

@Injectable()
export class Trie {
    tree: any = {};

    constructor() {}

    add(input) {
        // set to root of tree
        var currentNode = this.tree;

        // init value
        var nextNode = null;

        // take 1st char and trim input
        var curChar = input.slice(0,1);
        input = input.slice(1);

        // find first new character, until then keep triming input
        while(currentNode[curChar] && curChar){
            currentNode = currentNode[curChar];

            // update remainder array, this will exist as we added the node earlier
            currentNode.remainder.push(input);

            // trim input
            curChar = input.slice(0,1);
            input = input.slice(1);
        }

        // while next character is available keep adding new branches and prune till end
        while(curChar) {
            // new reference in each loop
            // create remainder array starting with current input
            // so when adding the node `a` we add to the remainder `dam` and so on
            nextNode = {
                remainder: [input]
            };

            // assign to current tree node
            currentNode[curChar] = nextNode;

            // hold reference for next loop
            currentNode = nextNode;

            // prepare for next iteration
            curChar = input.slice(0,1);
            input = input.slice(1);
        }
    }

    search(input) {
        // get the whole tree
        var currentNode = this.tree;
        var curChar = input.slice(0,1);

        // take first character
        input = input.slice(1);

        // keep extracting the subtree based on the current character
        while(currentNode[curChar] && curChar){
            currentNode = currentNode[curChar];
            curChar = input.slice(0,1);
            input = input.slice(1);
        }

        // reached the end and no subtree found
        // i.e. no data found
        if (curChar && !currentNode[curChar]) {
            return {
                remainder: []
            };
        }

        // return the node found
        return currentNode;
    }
}