function ValueCell(initialValue) {
    let currentValue = initialValue;
    let watchers = [];

    return {
        val: function () {
            return currentValue;
        },
        update: function(f) {
            let oldValue = currentValue;
            let newValue = f(oldValue);
            if (oldValue !== newValue) {
                currentValue = newValue;
                foreach(watchers, function(watcher) {
                    watcher(newValue);
                });
            }
        },
        addWatcher: function(f) {
            watchers.push(f);
        }
    };
}

function FormulaCell(upstreamCell, f) {
    let myCell = ValueCell(f(upstreamCell.val()));
    upstreamCell.addWatcher(function (newUpstreamValue) {
        myCell.update(function(currentValue) {
            return f(newUpstreamValue);
        });
    });
    return {
        val: myCell.val,
        addWatcher: myCell.addWatcher
    };
}

let shopping_cart = ValueCell({});
let cart_total = FormulaCell(shopping_cart, calc_total);

function add_item_to_cart(name, price) {
    let item = make_cart_item(name, price);
    shopping_cart.update(function(cart) {
        return add_item_to_cart(cart, item);
    });
}

shopping_cart.addWatcher(update_shipping_icons);
cart_total.addWatcher(set_cart_total_dom);
cart_total.addWatcher(update_tax_dom);