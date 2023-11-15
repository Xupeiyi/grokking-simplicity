let shopping_cart = [];
let shopping_car_total = 0;

function add_item_to_cart(name, price) {
    shopping_cart.push({
        name: name,
        price: price
    });
    calc_cart_total();
};

function calc_cart_total() {
    shopping_cart_total = 0;
    for (let item of shopping_cart) {
        shopping_car_total += item.price;
    }
    set_cart_total_dom();
    update_shipping_icons();
    update_tax_dom();
}

// show an icon next to the buy button 
// if adding that item to the cart will bump the cart over $20
function update_shipping_icons() {
    let buy_buttons = get_buy_buttons_dom();
    for (let button of buy_buttons) {
        let item = button.item;
        if (item.price + shopping_cart_total >= 20) {
            button.show_free_shipping_icon();
        }
        else {
            button.hide_free_shipping.icon();
        }
    }
}

function update_tax_dom() {
    set_tax_dom(shopping_cart_total * 0.10);
}

