// calculation
function decideCouponRank(subscriber) {
    if (subscriber.rec_count >= 10) {
        return "best";
    }    
    else{
        return "good";
    }
}

// calculation
function selectCouponByRank(coupons, rank) {
    let selectedCouponCode = [];
    for (let i = 0; i < coupons.length; i++) {
        let coupon = coupons[i];
        if (coupon.rank === rank) {
            selected.push(coupon.code);
        }
    }
    return selectedCouponCode;
}

// calculation
function createEmailForSubscriber(subscriber, goodCoupons, bestCoupons) {
    let rank = decideCouponRank(subscriber);
    if (rank === "best") {
        email = {
            from: "newsletter@coupondog.co",
            to: subscriber.email,
            subject: "Your best weekly coupons inside",
            body: "Here are the best coupons: " + bestCoupons.join(", ")
        }
    }
    else{
        email = {
            from: "newsletter@coupondog.co",
            to: subscriber.email,
            subject: "Your good weekly coupons inside",
            body: "Here are the good coupons: " + goodCoupons.join(", ")
        } 
    }
    return email;
}

// calculation
function createEmailsForSubscribers(subscribers, goodCoupons, bestCoupons) {
    let emails = [];
    for (let i = 0; i < subscribers.length; i++) {
        let subscriber = subscribers[i];
        let email = createEmailForSubscriber(subscriber, goodCoupons, bestCoupons);
        emails.push(email);
    }
    return emails;
}

// action
function sendIssue() {
    let coupons = fetchCouponsFromDB();
    let goodCoupons = selectCouponByRank(coupons, "good");
    let bestCoupons = selectCouponByRank(coupons, "best");
    let subscribers = fetchSubscribersFromDB();
    let emails = createEmailsForSubscribers(subscribers, goodCoupons, bestCoupons);
    for (let email of emails) {
        emailSystem.send(email);
    }
}

