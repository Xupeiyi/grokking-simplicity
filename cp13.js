function biggestPurchaseBestCustomers(customers) {
    let bestCustomers = filter(
        customers, 
        function(customer) { 
            return customer.purchases.length >= 3;
        }
    );

    let biggestPurchases = map(
        bestCustomers, 
        function(customer) { 
            return maxKey(
                customer.purchases, 
                {total: 0}, 
                function(purchase) { return purchase.total; }
            );
        }
    );

    return biggestPurchases;
}

function maxKey(array, init, f) {
    return reduce(array, init, function (biggestSoFar, element) {
        if (f(biggestSoFar) > f(element)) {
            return biggestSoFar;
        }
        else{
            return element;
        } 
    })
}