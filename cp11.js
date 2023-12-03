function arraySet(array, idx, value) {
    return withArrayCopy(array, function(copy) {
        copy[idx] = value;
    });
}

function withArrayCopy(array, modify) {
    let copy = array.slice();
    modify(copy);
    return copy;
}

function push(array, element) {
    return withArrayCopy(array, function (copy) {
        copy.push(element);
    });
}

function dropLast(array) {
    return withArrayCopy(array, function(copy) {
        copy.pop();
    });
}

function dropFirst(array) {
    return withArrayCopy(array, function (copy) {
        copy.shift();
    });
}

function withObjectCopy(object, modify) {
    let copy = Object.assign({}, object);
    modify(copy);
    return copy;
}

function objectSet(object, key, value) {
    return withObjectCopy(object, function (copy) {
        copy[key] = value;
    });
}

function objectDelete(object, key) {
    return withObjectCopy(object, function (copy) {
        delete copy[key];
    });
}

function tryCatch(f, errorHandler) {
    try{
        return f();
    } catch (error) {
        return errorHandler(error);
    }
}

function IF(test, then, ELSE) {
    if (test){
        return then();
    }
    return ELSE();
}

function wrapeLogging(f) {
    return function (arg) {
        try {
            return f(arg);
        }
        catch(error) {
            logToSnapErrors(error);
        }
    }
}