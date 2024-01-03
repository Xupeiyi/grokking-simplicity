function add_item_to_cart(item) {
    cart = add_item(cart, item);
    update_total_queue(cart);    
}

function calc_cart_total(cart, callback) {
    let total = 0;
    cost_ajax(cart, function(cost) {
        total += cost;
        shipping_ajax(cart, function(shipping) {
            total += shipping;
            callback(total);
        });
    });
}

function DroppingQueue(max, worker) {
    let queue_items = [];
    let working = false;

    function run_next() {
        if (working) {
            return;
        }
        if (queue_items.length === 0) {
            return;
        }
        working = true;
        let item = queue_items.shift();

        worker(item.data, function(val) {
            working = false;
            setTimeout(item.callback, 0, val);
            run_next();
        });
    }

    return function (data, callback) {
        queue_items.push({
            data: data,
            callback: callback || function (){}
        });
        while (queue_items.length > max) {
            queue_items.shift();
        }
        setTimeout(run_next, 0);
    }
}

function calc_cart_worker(cart, done) {
    calc_cart_total(cart, function (total) {
        update_total_dom(total);
        done(total);
    });
}

let update_total_queue = DroppingQueue(1, calc_cart_worker);