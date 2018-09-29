$(document).ready(function() {
  var items = [];

  $.getJSON('assets/js/products.json', function(json) {
      $.each(json.pins, function(index, orders) {
          $.each(this, function() {
              $.each(this, function() {
                  //items.push('<div class="row">' + this.name + "\t" + this.strength + "\t" + this.dose + "\t" + this.route + "\t" + this.sig + "\t" + this.pillCount + "\t" + this.refills + '</div>' + "\n");
                  items.push(

                    '<div class="col-md-3 text-center">'+
                    '<img src="cart/images/" width="150px" height="150px">'+
                    '<br>'+
                    'product 1 - <strong>$10</strong>'+
                    '<br>'+
                    '<button class="btn btn-danger my-cart-btn" data-id="1" data-name="product 1" data-summary="summary 1" data-price="10" data-quantity="1" data-image="images/img_1.png">Add to Cart</button>'+
                    '<a href="#" class="btn btn-info">Details</a>'+
                  '</div>' + "\n");

                     /* '<a class="pin pin--' + this.level_loc + '" data-category="' + this.datacategory + '" data-space="' + this.level_loc + '" href="#" aria-label="' + this.storelabel + '" style="top:' + this.top + 'vmin;left:' + this.left + 'vmin">' +
                      '<span class="pin__icon">' +
                      '<svg class="icon icon--pin"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-pin"></use></svg>' +
                      '<svg class="icon icon--logo icon--' + this.logo_icon + '"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-' + this.logo_icon + '"></use></svg>' +
                      '</span>' +
                      '</a>' + "\n");*/
              });
          });
      });

      $('<div>', {
          "class": 'levelsPins',
          html: items.join('')
      }).appendTo("#Level_5__Pins");

  });
});