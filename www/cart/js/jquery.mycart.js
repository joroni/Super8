/*

*/

(function ($) {

  "use strict";

  var OptionManager = (function () {
    var objToReturn = {};

    var defaultOptions = {
      classCartIcon: 'my-cart-icon',
      classCartBadge: 'my-cart-badge',
      affixCartIcon: true,
      checkoutCart: function (products) {},
      clickOnAddToCart: function ($addTocart) {},
    /*  getDiscountPrice: function (products) {
        return null;
      }*/
    };


    var getOptions = function (customOptions) {
      var options = $.extend({}, defaultOptions);
      if (typeof customOptions === 'object') {
        $.extend(options, customOptions);
      }
      return options;
    }

    objToReturn.getOptions = getOptions;
    return objToReturn;
  }());


  var ProductManager = (function () {
    var objToReturn = {};

    /*
    PRIVATE
    */
    localStorage.products = localStorage.products ? localStorage.products : "";
    var getIndexOfProduct = function (id) {
      var productIndex = -1;
      var products = getAllProducts();
      $.each(products, function (index, value) {
        if (value.id == id) {
          productIndex = index;
          return;
        }
      });
      return productIndex;
    }
    var setAllProducts = function (products) {
      localStorage.products = JSON.stringify(products);
    }
    var addProduct = function (id, name, summary, price, quantity, image) {
      var products = getAllProducts();
      products.push({
        id: id,
        name: name,
        summary: summary,
        price: price,
        quantity: quantity,
        image: image
      });
      setAllProducts(products);
    }

    /*
    PUBLIC
    */
    var getAllProducts = function () {
      try {
        var products = JSON.parse(localStorage.products);
        return products;
      } catch (e) {
        return [];
      }
    }
    var updatePoduct = function (id, quantity) {
      var productIndex = getIndexOfProduct(id);
      if (productIndex < 0) {
        return false;
      }
      var products = getAllProducts();
      products[productIndex].quantity = typeof quantity === "undefined" ? products[productIndex].quantity * 1 + 1 : quantity;
      setAllProducts(products);
      return true;
    }
    var setProduct = function (id, name, summary, price, quantity, image) {
      if (typeof id === "undefined") {
        console.error("id required")
        return false;
      }
      if (typeof name === "undefined") {
        console.error("name required")
        return false;
      }
      if (typeof image === "undefined") {
        console.error("image required")
        return false;
      }
      if (!$.isNumeric(price)) {
        console.error("price is not a number")
        return false;
      }
      if (!$.isNumeric(quantity)) {
        console.error("quantity is not a number");
        return false;
      }
      summary = typeof summary === "undefined" ? "" : summary;

      if (!updatePoduct(id)) {
        addProduct(id, name, summary, price, quantity, image);
      }
    }
    var clearProduct = function () {
      setAllProducts([]);
    }
    var removeProduct = function (id) {
      var products = getAllProducts();
      products = $.grep(products, function (value, index) {
        return value.id != id;
      });
      setAllProducts(products);
    }
    var getTotalQuantityOfProduct = function () {
      var total = 0;
      var products = getAllProducts();
      $.each(products, function (index, value) {
        total += value.quantity * 1;
      });
      return total;
    }

    objToReturn.getAllProducts = getAllProducts;
    objToReturn.updatePoduct = updatePoduct;
    objToReturn.setProduct = setProduct;
    objToReturn.clearProduct = clearProduct;
    objToReturn.removeProduct = removeProduct;
    objToReturn.getTotalQuantityOfProduct = getTotalQuantityOfProduct;
    return objToReturn;
  }());


  var loadMyCartEvent = function (userOptions) {

    var options = OptionManager.getOptions(userOptions);
    var $cartIcon = $("." + options.classCartIcon);
    var $cartBadge = $("." + options.classCartBadge);

    var idCartModal = 'my-cart-modal';
    var idCheckOutModal = 'my-checkout-modal';
    var idCartTable = 'my-cart-table';
    var classProductQuantity = 'my-product-quantity';
    var classProductTotal = 'my-product-total';
    var idGrandTotalHidden = 'my-cart-grand-total-hidden';
    var idGrandTotal = 'my-cart-grand-total';
    var idCheckoutCart = 'checkout-my-cart';
    var classProductRemove = 'my-product-remove';
    var idEmptyCartMessage = 'my-cart-empty-message';
    var classAffixMyCartIcon = 'my-cart-icon-affix';
   var idDiscountPrice = 'my-cart-discount-price';

    $cartBadge.text(ProductManager.getTotalQuantityOfProduct());

    if (!$("#" + idCartModal).length) {
      $('body').append(
        '<div class="modal fade" id="' + idCartModal + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h4 class="modal-title" id="myModalLabel"><i class="material-icons glyphicon-shopping-cart">shopping_cart</i> My Cart</h4>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="row">' +
        '<table class="table table-hover table-responsive" id="' + idCartTable + '"></table>' +
        '</div>' +
        '<hr>'+
        '<div class="block">' +
        '<h4>Select a customer</h4>'+
        '<hr>'+
        '<div id="selectCustomer"></div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<div class="row">' +
        '<div class="col-md-6 text-center">' +
        '<button type="button" class="btn btn-default  btn-block" data-dismiss="modal">Close</button>' +
        '</div>' +
        '<div class="col-md-6 text-center">' +
        '<button type="button" class="btn btn-primary btn-block" onclick="getDetails()" id="' + idCheckoutCart + '">Checkout</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
      );
    }

    var drawTable = function () {
      var $cartTable = $("#" + idCartTable);
      $cartTable.empty();

      var products = ProductManager.getAllProducts();
      $.each(products, function () {
        var total = this.quantity * this.price;
        $cartTable.append(
          '<tr title="' + this.summary + '" data-id="' + this.id + '" data-price="' + this.price + '">' +
          //'<td class="text-center" style="width: 30px;"><img width="30px" height="30px" src="cart/' + this.image + '"/></td>' +
          '<td id="prodN">' + this.name + '</td>' +
          '<td id=unitprice" title="Unit Price">₱' + this.price + '</td>' +
          '<td id="quantity" title="Quantity" style=" padding:10px 0 10px 0 !important;"><input type="number" min="1" style="width: 40px; text-align:center; border:1px solid #ddd;" class="' + classProductQuantity + '" value="' + this.quantity + '"/></td>' +
          '<td id="subtotal" title="Total" data-total="' + total + '" class="' + classProductTotal + '">₱' + total + '</td>' +
          '<td title="Remove from Cart" class="text-center" style="width: 30px;">' +
          '<button type="button" rel="tooltip" title="" class="btn btn-danger btn-link btn-sm ' + classProductRemove + ' " data-original-title="Remove">' +
          '<i class="material-icons">close</i></button>' +
          //'<a href="javascript:void(0);" style="padding-left:15px; padding-right:15px;" class="btn btn-xs btn-danger ' + classProductRemove + '">&times;</a></td>' +
          '</tr>'+
          '<tr><td class="hidden" id="total">'+total+'</td></tr>'
        );
      });

      $cartTable.append(products.length ?
        '<tr>' +
        //  '<td></td>' +
        '<td style="text-align: left;"><strong>Total</strong></td>' +
        '<td></td>' +
        '<td><span class="hidden" id="' + idGrandTotalHidden + '"></span></td>' +
        '<td><strong  id="' + idGrandTotal + '">₱</strong></td>' +
        '<td></td>' +
        '</tr>' :
        '<div class="alert alert-danger" role="alert" id="' + idEmptyCartMessage + '">Your cart is empty</div>'
      );

    /*  var discountPrice = options.getDiscountPrice(products);
      if (discountPrice !== null) {
        $cartTable.append(
          '<tr style="color: red">' +
          '<td colspan="2" style="text-align: left;">' +
          '<strong>Total (w/ discount)</strong></td>' +
          '<td></td>' +
          '<td><strong id="' + idDiscountPrice + '">₱</strong></td>' +
          '<td></td>' +
          '<td></td>' +
          '</tr>'
        );
      }*/

     
      showGrandTotal(products);
     // showDiscountPrice(products);
    }
    var showModal = function () {
      drawTable();
      $("#" + idCartModal).modal('show');
    }
    var updateCart = function () {
      $.each($("." + classProductQuantity), function () {
        var id = $(this).closest("tr").data("id");
        ProductManager.updatePoduct(id, $(this).val());
      });
    }
    var showGrandTotal = function (products) {
      var total = 0;
      $.each(products, function () {
        total += this.quantity * this.price;
        localStorage.setItem("total", total);
      });
      $("#" + idGrandTotal).text("₱" + total);
    }
    var showDiscountPrice = function (products) {
      $("#" + idDiscountPrice).text("₱" + options.getDiscountPrice(products));
    }

    /*
    EVENT
    */
    if (options.affixCartIcon) {
      var cartIconBottom = $cartIcon.offset().top * 1 + $cartIcon.css("height").match(/\d+/) * 1;
      var cartIconPosition = $cartIcon.css('position');
      $(window).scroll(function () {
        if ($(window).scrollTop() >= cartIconBottom) {
          $cartIcon.css('position', 'fixed').css('z-index', '2000').addClass(classAffixMyCartIcon);
        } else {
          $cartIcon.css('position', cartIconPosition).css('background-color', 'inherit').removeClass(classAffixMyCartIcon);
        }
      });
    }

    $cartIcon.click(showModal);

    $(document).on("input", "." + classProductQuantity, function () {
      var price = $(this).closest("tr").data("price");
      var id = $(this).closest("tr").data("id");
      var quantity = $(this).val();

      $(this).parent("td").next("." + classProductTotal).text("₱" + price * quantity);
      ProductManager.updatePoduct(id, quantity);

      $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
      var products = ProductManager.getAllProducts();
      showGrandTotal(products);
      //showDiscountPrice(products);
    });

    $(document).on('click', "." + classProductRemove, function () {
      var $tr = $(this).closest("tr");
      var id = $tr.data("id");
      $tr.hide(500, function () {
        ProductManager.removeProduct(id);
        drawTable();
        $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
      });
    });

    $("#" + idCheckoutCart).click(function () {
     // alert("checkout");
      var products = ProductManager.getAllProducts();
      var cartTotal = ProductManager.getAllProducts();
      if (!products.length) {
        $("#" + idEmptyCartMessage).fadeTo('fast', 0.5).fadeTo('fast', 1.0);
       /************* custom */
        console.log("Products", products);
      //  alert(products);
        return;
      }
      updateCart();
      options.checkoutCart(ProductManager.getAllProducts());
     // ProductManager.clearProduct();
      $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
      $("#" + idCartModal).modal("hide");
      showCheckOutModal();
    /************* custom */
     
      localStorage.setItem("checkout",(JSON.stringify(products)));
   //   $(".qntty").val(0);
    });

    $(document).on('keypress', "." + classProductQuantity, function (evt) {
      if (evt.keyCode == 38 || evt.keyCode == 40 ) {
        return;
      }
      evt.preventDefault();
    });
  }



  function showCheckOutModal(){
   window.location.href="checkout.html";
    // alert("showCheckOutModal");
    
  }
  var MyCart = function (target, userOptions) {
    /*
    PRIVATE
    */
    var $target = $(target);
    var options = OptionManager.getOptions(userOptions);
    var $cartIcon = $("." + options.classCartIcon);
    var $cartBadge = $("." + options.classCartBadge);
  

    /*
    EVENT
    */
    $target.click(function () {
      options.clickOnAddToCart($target);

      var id = $target.data('id');
      var name = $target.data('name');
      var summary = $target.data('summary');
      var price = $target.data('price');
      var quantity = $target.data('quantity');
      var image = $target.data('image');
      var ototal = $target.data('price') * $target.data('quantity');

      ProductManager.setProduct(id, name, summary, price, quantity, image, ototal);
      $cartBadge.text(ProductManager.getTotalQuantityOfProduct());
    });

  }


  $.fn.myCart = function (userOptions) {
    loadMyCartEvent(userOptions);
    return $.each(this, function () {
      new MyCart(this, userOptions);
    });
  }



  /******************************add in *********************************/
  /*checkout */


  /*stepper */
  $('.minus-btn').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    var buttId = $this.closest('div').find('input');

    if (value > 1) {
      value = value - 1;
    } else {
      value = 0;
    }

    $input.val(value);

    /*********** */

    var $this2 = $(this);
    var $input2 = $this2.closest('#my-cart-table tr td').find('input');
    var value2 = parseInt($input2.val());
    var buttId2 = $this.closest('#my-cart-table tr td').find('input');

    if (value2 > 1) {
      value2 = value2 - 1;
    } else {
      value2 = 0;
    }
    $input2.val(value2);
    console.log($input2.val(value2));

  });

  $('.plus-btn').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    var prodQty = $this.val();

    $(".qtty").change(function () {
      console.log(prodQty);

    })

    if (value < 100) {
      value = value + 1;
    } else {
      value = 100;
    }

    $input.val(value);
  });

  $('.like-btn').on('click', function () {
    $(this).toggleClass('is-active');
  });



  /*********************************** check out */




})(jQuery);