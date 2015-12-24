

// local imports
import createNewCrio from './utils/createNewCrio';
import CrioCollection from './CrioCollection';

// local partial imports
import {
    isValueless
} from './utils/checkers';

import {
    coalesceCrioValue,
    getCrioInstance
} from './utils/crioFunctions';

import {
    forEach,
    forEachRight,
    splice,
    thaw
} from './utils/functions';

class CrioList extends CrioCollection {
    constructor(obj) {
        super(obj);
    }

    /**
     * Returns true if every item in the array finds a match based on the return from the callback
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns {boolean}
     */
    every(callback: Function, thisArg: ?Object) : boolean {
        return this.thaw().every.call(thisArg, callback);
    }

    /**
     * Executes standard filter function (as filter returns new array)
     *
     * @param callback<Function>
     * @param args<Array>
     * @returns filteredArray<CrioList>
     */
    filter(callback: Function, ...args: Array) : CrioList {
        const values = this.thaw().filter(callback, ...args);

        return getCrioInstance(this, createNewCrio(values));
    }

    /**
     * Finds first item in array that returns a value, and returns a new Crio of it
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns {any}
     */
    find(callback: Function, thisArg: ?Object) : any {
        let match: any;

        forEach(this.thaw(), (value, index, arr) => {
            if (callback.call(thisArg, value, index, arr)) {
                match = getCrioInstance(this, createNewCrio(value));
                return false;
            }
        });

        return match;
    }

    /**
     * Finds first item in array that returns a value, and returns index of it in array
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns {number}
     */
    findIndex(callback: Function, thisArg: ?Object) : number {
        let matchIndex: number = -1;

        forEach(this.thaw(), (value, index, arr) => {
            if (callback.call(thisArg, value, index, arr)) {
                matchIndex = index;
                return false;
            }
        });

        return matchIndex;
    }

    /**
     * Executes forEach over values stored in this.object
     *
     * @param fn<Function>
     * @param thisArg<Object[optional]>
     */
    forEach(fn: Function, thisArg: ?Object) {
        forEach(thaw(this), fn, thisArg);

        return this;
    }

    /**
     * Convenience function for checking if array includes value or not
     *
     * @param value
     * @returns includesMatch<Boolean>
     */
    includes(value: any) : boolean {
        return this.indexOf(value) !== -1;
    }

    /**
     * Returns index of first matching element in this.object
     *
     * @param value<Any>
     * @returns indexOfMatch<Number>
     */
    indexOf(value: any) : number {
        if (isValueless(value)) {
            return -1;
        }

        return this.object.indexOf(value);
    }

    /**
     * Joins array values into string separated by joiner
     *
     * @param joiner<String>
     * @returns joinedArray<String>
     */
    join(joiner: string = ',') : string {
        return this.object.join(joiner);
    }

    /**
     * Same as .indexOf(), except returns last item in array that matches instead of first
     *
     * @param value<Any>
     * @returns lastIndexMatch<Number>
     */
    lastIndexOf(value: any) : number {
        if (isValueless(value)) {
            return -1;
        }

        return this.object.lastIndexOf(value);
    }

    /**
     * Executes standard map function (as map returns new array)
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns mappedArray<CrioList>
     */
    map(callback: Function, thisArg: ?Object) : CrioList {
        const values = this.thaw().map(callback, thisArg);

        return getCrioInstance(this, createNewCrio(values));
    }

    /**
     * Alias function for pop
     *
     * @returns lastItemInArray<Any>
     */
    pop() : any {
        return this.thaw().pop();
    }

    /**
     * Adds values passed to array at the back, after the existing items
     *
     * @param values<Array>
     * @returns {Crio}
     */
    push(...values: Array) : CrioList {
        let newValues = [...this.object].concat(...values);

        return createNewCrio(newValues);
    }

    /**
     * Based on action in callback, each item in array executes function to somehow modify
     * initialValue. If the resulting reduction is an array or an object, then return a new
     * Crio, otherwise return the reduction.
     *
     * @param callback<Function>
     * @param initialValue<any>
     * @returns {any}
     */
    reduce(callback: Function, initialValue: ?any = 0) : any {
        const reducedValue = this.thaw().reduce(callback, initialValue);

        return coalesceCrioValue(this, reducedValue);
    }

    /**
     * Identical to .reduce(), but performs action on the array from right to left.
     *
     * @param callback<Function>
     * @param initialValue<any>
     * @returns {any}
     */
    reduceRight(callback: Function, initialValue: ?any = 0) : any {
        return this.reverse().reduce(callback, initialValue);
    }

    /**
     * Reverses the order of the array in this.object and returns new Crio
     *
     * @returns reversedArray<CrioList>
     */
    reverse() : CrioList {
        const reversedArray: Array = [];

        forEachRight(this.thaw(), (value) => {
            reversedArray.push(value);
        });

        return getCrioInstance(this, createNewCrio(reversedArray));
    }

    /**
     * ALias for shift function
     *
     * @returns firstItemInArray<Any>
     */
    shift() : any{
        return this.thaw().shift();
    }

    /**
     * Returns an array of items that is a window of original array, from passed begin to passed end.
     * If no end is passed, then window is from begin to end of the original array.
     *
     * @param begin<Number>
     * @param end<Number[optional]>
     * @returns {CrioList}
     */
    slice(begin: number, end: ?number) : CrioList {
        const slicedArray = this.thaw().slice(begin, end);

        return getCrioInstance(this, createNewCrio(slicedArray));
    }

    /**
     * Returns true if any items in the array are a match, based on the return in the callback
     *
     * @param callback<Function>
     * @param thisArg<Object[optional]>
     * @returns {boolean}
     */
    some(callback: Function, thisArg: ?Object) : boolean {
        return this.thaw().some.call(thisArg, callback);
    }

    /**
     * Applies sort to object, and returns new CrioList with sorted objects
     *
     * @param fn<Function[optional]>
     * @returns {Crio}
     */
    sort(fn: ?Function) : CrioList {
        const sortedObject = this.thaw().sort(fn);

        return getCrioInstance(this, createNewCrio(sortedObject));
    }

    /**
     * Returns a new CrioList with an object including all values except that
     * of the key(s) passed.
     *
     * @param keys<Array>
     * @returns itemWithKeysRemoved<Crio>
     */
    splice(...keys: Array) : CrioList {
        if (keys.length === 0) {
            return createNewCrio();
        }

        let newValue: Array = [...this.object];

        forEach(keys, (index) => {
            newValue = splice(this.object, index);
        });

        return getCrioInstance(this, createNewCrio(newValue));
    }

    /**
     * Adds values passed to array at the front, before the existing items
     *
     * @param values<Array>
     * @returns {Crio}
     */
    unshift(...values: Array) : CrioList {
        let newValues = [...values].concat(...this.object);

        return createNewCrio(newValues);
    }
}

export default CrioList;