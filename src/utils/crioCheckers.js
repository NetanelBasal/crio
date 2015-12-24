

// local imports
import CrioCollection from './../CrioCollection';

// local partial imports
import {
    isArray,
    isObject
} from './checkers';

/**
 * Returns true if object passed is CrioList
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isCrioList = (obj: any) : boolean => {
    return obj instanceof CrioCollection && isArray(obj.object);
};

/**
 * Returns true if object passed is CrioMap
 *
 * @param obj<Any>
 * @returns {boolean}
 */
const isCrioMap = (obj: any) : boolean => {
    return obj instanceof CrioCollection && isObject(obj.object);
};

/**
 * Returns true if both objects passed are Crio and are equal to one another
 *
 * @param obj1<Any>
 * @param obj2<Any>
 * @returns {boolean}
 */
const isSameCrio = (obj1: CrioCollection, obj2: CrioCollection) : boolean => {
    if ((isCrioList(obj1) || isCrioMap(obj1)) && (isCrioList(obj2) || isCrioMap(obj2))) {
        return obj1.hashCode === obj2.hashCode;
    }

    return false;
};

export {isCrioList as isCrioList};
export {isCrioMap as isCrioMap};
export {isSameCrio as isSameCrio};

export default {
    isCrioList,
    isCrioMap,
    isSameCrio
};