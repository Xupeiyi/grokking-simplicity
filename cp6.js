// Rule of copy-on-write
// 1. Make a copy
// 2. Modify the copy
// 3. Return the copy

function add_element_last(array, element) {
    let new_array = array.slice();
    new_array.push(element);
    return new_array;
}

function remove_items(array, idx, count) {
    let copy = array.slice();
    copy.splice(idx, count);
    return copy;
}

function remove_item_by_name(cart, name) {
    let idx = null;
    for (let i = 0; i < new_cart.lenght; i++) {
        if (new_cart[i].name === name) {
            idx = i;
        }
    }
    if (idx !== null) {
        return remove_items(cart, idx, 1);
    }
    return new_cart;
}

function delete_handler(name) {
    shopping_cart = remove_item_by_name(shopping_cart, name);
    let total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);
}

function object_set(object, key, value) {
    let copy = Object.assign({}, object);
    copy[key] = value;
    return copy;
}

function object_delete(object, key) {
    let copy = Object.assign({}, object);
    delete copy[key];
    return copy;
}

function set_price(item, new_price) {
    return object_set(item, "price", new_price);
}

function set_quantity(item, new_quantity) {
    return object_set(item, "quantity", new_quantity);
}

function set_price_by_name(cart, name, price) {
    let cart_copy = cart.slice();
    for (let i = 0; i < cart_copy.length; i++) {
        if (cart_copy[i].name === name) {
            cart_copy[i] = set_price(cart_copy[i], price);
        }
    }
    return cart_copy;
}