let shopping_cart = [];
let shopping_cart_total = 0;

// i
function make_cart_item(name, price) {
    return {
        name: name,
        price: price
    };
}

// a
function add_element_last(array, element) {
    let new_array = array.slice();
    new_array.push(element);
    return new_array;
}


// c
function add_item(cart, item) {
    return add_element_last(cart, item);
}

function add_item_to_cart(name, price) {
    let item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);
    let total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(cart);
    update_tax_dom(total);
}

// c i b
function calc_total(cart) {
    let total = 0;
    for (let item of cart) {
        total += item.price;
    }
    return total;
}

// b
function gets_free_shipping(cart) {
    return calc_total(cart) >= 20;
}

// show an icon next to the buy button 
// if adding that item to the cart will bump the cart over $20
function update_shipping_icons(cart) {
    let buttons = get_buy_buttons_dom();
    for (let button of buttons) {
        let item = button.item; 
        let has_free_shipping = gets_free_shipping_with_item(cart, item);
        set_free_shipping_icon(button, has_free_shipping);
    }
}

function gets_free_shipping_with_item(cart, item) {
    let new_cart = add_item(cart, item);
    return gets_free_shipping(new_cart);
}

function set_free_shipping_icon(button, is_shown) {
    if (is_shown) {
        button.show_free_shipping_icon();
    }
    else {
        button.hide_free_shipping_icon();
    }
}

function update_tax_dom(total) {
    let tax = calc_tax(total);
    set_tax_dom(tax);
}

// b
function calc_tax(amount) {
    return amount * 0.10;
}