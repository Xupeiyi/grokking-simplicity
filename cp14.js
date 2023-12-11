
function update(object, key, modify) {
    let value = object[key];
    let newValue = modify(value);
    let newObject = objectSet(object, key, newValue);
    return newObject;
}

function nestedUpdate(object, keys, modify) {
    if (keys.length === 0) {
        return modify(object);
    }
    let key1 = keys[0];
    let restOfKeys = dropFirst(keys);
    return update(object, key1, (value1) => {
        return nestedUpdate(value1, restOfKeys, modify);
    });
}


function updatePostById(category, id, modifyPost) {
    return nestedUpdate(category, ['posts', id], modifyPost);
}

function updateAuthor(post, modifyUser) {
    return update(post, 'author', modifyUser);
}

