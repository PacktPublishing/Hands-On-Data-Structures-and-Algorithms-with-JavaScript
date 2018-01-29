import {Injectable} from "@angular/core";
import { maxBy, uniq, map, filter, without, keys, size, chain, find, countBy } from "lodash";

@Injectable()
export class ID3 {
    
    constructor() {

    }

    public train(trainingData, target, attributes) {
        // extract all targets from data set e.g.
        // Yes or No
        var allTargets = uniq(map(trainingData, target));

        // only Yes or No is remaining e.g. leaf node found
        if (allTargets.length == 1){
            return { leaf: true, value: allTargets[0] };
        }

        // calculate root node from current list of attributes
        var currentRootNode = this.getCurrentRootNode(
                                    trainingData, target, attributes);

        // form node for current root
        var node: any = { name: currentRootNode, leaf: false };

        // remove currentRootNode from list of all attributes
        // e.g. remove creditScore or whatever the root node was
        // from the entire list of attributes
        // this allows us to skip currentRootNode from re-calculation
        var remainingAttributes = without(attributes, currentRootNode);

        // get unique branch names for currentRootNode
        // e.g creditScore has the branches Excellent, Good,
        // Average, Poor
        var branches = uniq(map(trainingData, currentRootNode));

        // recursively repeat the process for each branch
        node.branches = map(branches, (branch) => {

            // take each branch training data
            // e.g training data where creditScore is Excellent
            var branchTrainingData = filter(trainingData, [currentRootNode, branch]);

            // create node for each branch
            var branch: any = { name: branch, leaf: false };

            // initialize branches for node
            branch.branches = [];

            // train and push data to subbranch
            branch.branches.push(this.train(
                    branchTrainingData, target, remainingAttributes));

            // return branch as a child of parent node
            return branch;

        });

        return node;
    }

    private getCurrentRootNode(trainingData, target, attributes) {
        
        // get max extropy attribute
        return maxBy(attributes, (attr) => {

            // calculate information gain at each attribute
            // e.g. 'creditScore', 'creditAge' etc
            return this.gain(trainingData, target, attr);
        });
    }

    private gain(trainingData, target, attr) {
        // calculate target branches entropy e.g. approved
        var targetEntropy = this.entropy(map(trainingData, target));

        // calculate the summation of all branches entropy
        var sumOfBranchEntropies =
            chain(trainingData)

                // extract branches for the given attribute
                // e.g creditScore has the branches Excellent, Good,
                // Average, Poor
                .map(attr)

                // make the values unique
                .uniq()

                // for each unique branch calculate the branch entropy
                // e.g. calculate entropy of Excellent, Good, Average, Poor
                .map((branch) => {

                    // extract only the subset training data
                    // which belongs to current branch
                    var branchTrainingData = filter(trainingData, [attr, branch]);

                    // return (probability of branch) * entropy of branch
                    return (branchTrainingData.length / trainingData.length)
                        * this.entropy(map(branchTrainingData, target));
                })

                // add all branch entropies
                // e.g. add entropy of Excellent, Good, Average, Poor
                .reduce(this.genericReducer, 0)

                // return the final value
                .valueOf();

        return targetEntropy - sumOfBranchEntropies;
    }

    private entropy(vals) {

        // take all values
        return chain(vals)

            // make them unique
            // e.g. an array of Yes and No
            .uniq()

            // calculate probability of each
            .map((x) => this.probability(x, vals))

            // calculate entropy
            .map((p) => -p * Math.log2(p))

            // reduce the value
            .reduce(this.genericReducer, 0)

            // return value
            .valueOf();
    }

    private probability(val, vals){

        // calculate total number of instances
        // e.g. Yes is 100 out of the 300 values
        var instances = filter(vals, (x) => x === val).length;

        // total values passed e.g. 300
        var total = vals.length;

        // return 1/3
        return instances/total;
    }

    private genericReducer(a, b) {

        // add and return
        return a + b;
    }

    public predict(tree, input) {
        var node = tree;

        // loop over the entire tree
        while(!node[0].leaf){

            // take node name e.g. creditScore
            var name = node[0].name;

            // take value from input sample
            var inputValue = input[name];

            // check if branches for given input exist
            var childNode = filter(node[0].branches, ['name', inputValue]);

            // if branches exist return branches or default to No
            node = childNode.length ?
                childNode[0].branches : [{ leaf: true, value: 'No'}];
        }

        // return final leaf value
        return node[0].value;
    }
}