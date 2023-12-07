function forEach(array, f) {
    for(let item of array) {
        f(item);
    }
}

function map(array, f) { 
    let newArray = []; 
    forEach(array, function(element) {
        newArray.push(f(element));
    });
    return newArray;
}

function filter(array, f) { 
    let newArray = [];   
    forEach(array, function(element) {
        if (f(element)) {
            newArray.push(element); 
        }
    });
    return newArray;     
}

function reduce(array, init, f) { 
    let accum = init; 
    forEach(array, function(element) {
        accum = f(accum, element); 
    });
    return accum; 
}