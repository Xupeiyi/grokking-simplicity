let shopping_cart = [];
let shopping_cart_total = 0;

function add_item(cart, name, price) {
    let new_cart = cart.slice();
    new_cart.push({
        name: name,
        price: price
    });
    return new_cart;
}

function add_item_to_cart(name, price) {
    shopping_cart = add_item(shopping_cart, name, price)
    calc_cart_total();
}

function calc_total(cart) {
    let total = 0;
    for (let item of cart) {
        total += item.price;
    }
    return total;
}

function calc_cart_total() {
    shopping_cart_total = calc_total(shopping_cart);
    set_cart_total_dom();
    update_shipping_icons();
    update_tax_dom();
}

function gets_free_shipping(item_price, total) {
    return item_price + total >= 20
}

// show an icon next to the buy button 
// if adding that item to the cart will bump the cart over $20
function update_shipping_icons() {
    let buy_buttons = get_buy_buttons_dom();
    for (let button of buy_buttons) {
        let item = button.item;
        if (gets_free_shipping(item.price, shopping_cart_total)) {
            button.show_free_shipping_icon();
        }
        else {
            button.hide_free_shipping.icon();
        }
    }
}

function update_tax_dom() {
    let cart_total = calc_tax(shopping_cart_total);
    set_tax_dom(cal);
}

function calc_tax(amount) {
    return amount * 0.10;
}