/*

*/



$("#chckout-my-cart").click(function () {

    showCheckOutModal();

    setTimeout(function () {
        loadItems();
    }, 3000);
});

$(document).ready(function () {


    "use strict";
    var data = localStorage.getItem("products");
    // localStorage.setItem("mydata", JSON.stringify(customerss));
    var items = [];

    var lol = [{"id":1,"name":"Coke 1.75ml","summary":"Coke 1.75ml","price":75,"quantity":"4","image":"cart/images/coke.jpg"},{"id":2,"name":"Chicken Wings","summary":"Chicken Wings","price":20,"quantity":"3","image":"cart/images/chickenwings.jpg"}]

    console.log('data', data);
    console.log('lol', lol);

    $.getJSON(lol, function (json) {
        $.each(json.customers, function (index, orders) {
            $.each(this, function () {
                $.each(this, function () {
                    //items.push('<div class="row">' + this.name + "\t" + this.strength + "\t" + this.dose + "\t" + this.route + "\t" + this.sig + "\t" + this.pillCount + "\t" + this.refills + '</div>' + "\n");
                    items.push(
                        '<li class="list-group-item">' +
                        '<div class="media">' +
                        '<a class="media-left" href="customer-page.html">' +
                        '<div style="width: 40px; height: 40px">' +
                        '<img class="rounded-img" style="width:100%; height:auto;"  src="assets/img/faces/avatar.jpg" alt="...">' +
                        '</div>' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h4 class="media-heading">' + this.id +
                        '</h4>' +
                        '<small style="color:#c0c1c2;">last ordered:' +
                        this.price + '</small>' +
                        ' </div>' +
                        '<div class="media-right"><a href="customer-page.html" data-id="' +
                        this.id + '" data-name="' + this.name + '' +
                        'data-summary="Coke 1.75ml"' +
                        'data-price="75" data-quantity="1" data-image="assets/img/faces/' +
                        this.photo +
                        '"><i class="material-icons" aria-hidden="true">chevron_right</i></a></div>' +
                        ' </div>' +
                        ' </li>' + "\n");

                });
            });
        });

        $('<div>', {
            "class": 'levelsPins',
            html: items.join('')
        }).appendTo("#Level_5__Pins");

    });


})