function add_item_to_cart(name, price, quantity) {
    cart = add_item(cart, name, price, quantity);
    calc_cart_total();
}

function calc_cart_total() {
    total = 0;
    cost_ajax(
        cart, 
        cost => {
            total += cost;
            shipping_ajax(
                cart, 
                shipping => {
                    total += shipping;
                    update_total_dom(total);
                }
            );
        }
    );
}