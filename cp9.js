// Stratified Design
// 1. Straightforward implementation
// 2. Abstraction barrier
// 3. Minimal interface
// 4. Comfortable layers


// layer 1
function free_tie_clip(cart) {
    let has_tie = is_in_cart(cart, "tie");
    let has_tie_clip = is_in_cart(cart, "tie, clip");
    if (has_tie && !has_tie_clip) {
        let tie_clip = make_item("tie clip", 0);
        return add_item(cart, tie_clip);
    }
    return cart;
}

function calc_tax(amount) {
    return amount * 0.10;
}

function gets_free_shipping(cart) {
    return calc_total(cart) >= 20;
}

function get_watch_discount(cart) {
    let total = calc_total(cart);
    let has_watch = is_in_cart("watch");
    return total > 100 && has_watch;
}


function add_item_to_cart(name, price) {
    let item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);
    let total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);
    shopping_cart = black_friday_promotion_safe(shopping_cart);
    log_add_to_cart();
}


// layer 2
function is_in_cart(cart, name) {
    return cart.hasOwnProperty(name);
}

function remove_item_by_name(cart, name) {
    return object_delete(cart, name);
}


function add_item(cart, item) {
    return object_set(cart, item.name, item);
}

function calc_total(cart) {
    let total = 0;
    for (let name in cart) {
        total += cart[name].price;
    }
    return total;
}

function set_price_by_name(cart, name, price) {
    if(is_in_cart(cart, name)) {
        let item = cart[name];
        let copy = set_price(item, price);
        let new_cart = object_set(cart, name, copy);
    }
    else {
        let item = make_item(name, price);
        let new_cart = object_set(cart, name, item);
    }
    return new_cart;

}

function set_price(item, new_price) {
    return object_set(item, "price", new_price);
}

function set_quantity(item, new_quantity) {
    return object_set(item, "quantity", new_quantity);
}

// layer 3
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

function array_set(array, idx, value) {
    let copt = array.slice();
    copy[idx] = value;
    return copy;
}



