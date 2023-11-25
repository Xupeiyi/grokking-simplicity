// defensive copy
// 1. copy as data leaves your code
// 2. copy as data enters your code

function black_friday_promotion_safe(cart) {
    let cart_copy = deep_copy(shopping_cart);
    black_friday_promotion(cart_copy);
    return deep_copy(cart_copy);
}


function add_item_to_cart(name, price) {
    let item = make_cart_item(name, price);
    shopping_cart = add_item(shopping_cart, item);
    let total = calc_total(shopping_cart);
    set_cart_total_dom(total);
    update_shipping_icons(shopping_cart);
    update_tax_dom(total);
    shopping_cart = black_friday_promotion_safe(shopping_cart);
}

