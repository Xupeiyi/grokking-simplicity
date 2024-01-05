// optimization with cut
function add_item_to_cart(item) {
    cart = add_item(cart, item);
    update_total_queue(cart);
}

function calc_cart_total(cart, callback) {
    let total = 0;
    let done = Cut(2, function() {
        callback(total);
    });

    cost_ajax(cart, function(cost) {
        total += cost;
        done();
    });
    shipping_ajax(cart, function(shipping) {
        total += shipping;
        done();
    });
}

function calc_cart_worker(cart, done) {
    calc_cart_total(cart, function(total) {
        update_total_dom(total);
        done(total);
    });
}

let update_total_queue = DroppingQueue(1, calc_cart_worker);

function Cut(num, callback) {
    let num_finished = 0;
    return function() {
        num_finished += 1;
        if (num_finished == num) {
            callback();
        }
    };
}

// just once
function send_add_to_cart_text(number) {
    sendTextAjax(number, "Thanks for adding something to your cart.");
}

function JustOnce(action) {
    let already_called = false;
    return function (a, b, c) {
        if (already_called) return;
        already_called = true;
        return action(a, b, c);
    };
}

let send_add_to_cart_text_once = JustOnce(send_add_to_cart_text);

