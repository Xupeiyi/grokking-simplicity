let valid_item_fields = ['price', 'quantity', 'shipping', 'tax'];
let translations = {'quantity': 'number'};


function set_field_by_name(cart, name, field, value) {
    if (!valid_item_fields.includes(field)){
        throw `Not a valid item field: '${field}'.`; 
    }
    if (translations.hasOwnProperty(field)){
        field = translations[field];
    }

    let item = cart[name];
    let new_item = object_set(item, field, value);
    let new_cart = object_set(cart, name, new_item);
    return new_cart;
}

function increment_field_by_name(cart, name, field) {
    if (field !== 'size' && field !== 'quantity') {
        throw `This item field cannot be incremented: '${field}'.`;
    }

    let item = cart[name];
    let new_value = item[field] + 1;
    let new_item = object_set(item, field, value);
    let new_cart = object_set(cart, name, new_item);
    return new_cart;

}