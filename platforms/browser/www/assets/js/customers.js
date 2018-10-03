$(document).ready(function () {
    var items = [];

    $.getJSON('assets/mockdata/customers.json', function (json) {
        $.each(json.customers, function (index, orders) {
            $.each(this, function () {
                $.each(this, function () {
                    //items.push('<div class="row">' + this.name + "\t" + this.strength + "\t" + this.dose + "\t" + this.route + "\t" + this.sig + "\t" + this.pillCount + "\t" + this.refills + '</div>' + "\n");
                    items.push(
                        '<li class="list-group-item">' +
                        '<div class="media">' +
                        '<a class="media-left" href="customer-page.html">' +
                        '<div style="width: 40px; height: 40px">' +
                        '<img class="rounded-img" style="width:100%; height:auto;"  src="assets/img/faces/' + this.photo + '" alt="...">' +
                        '</div>' +
                        '</a>' +
                        '<div class="media-body">' +
                        '<h4 class="media-heading">' + this.name + '</h4>' +
                        '<small style="color:#c0c1c2;">last ordered:' + this.lastordered + '</small>' +
                        ' </div>' +
                        '<div class="media-right"><a href="customer-page.html" data-id="'+ this.id +'" data-name="'+ this.name +''+'data-summary="Coke 1.75ml"'+
                        'data-price="75" data-quantity="1" data-image="assets/img/faces/' + this.photo + '"><i class="material-icons" aria-hidden="true">chevron_right</i></a></div>' +
                        ' </div>' +
                        ' </li>' + "\n");


                    /*   '<a class="pin pin--' + this.level_loc + '" data-category="' + this.datacategory + '" data-space="' + this.level_loc + '" href="#" aria-label="' + this.storelabel + '" style="top:' + this.top + 'vmin;left:' + this.left + 'vmin">' +
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

/**************************************URL */
    var URLParser = function (url) {
        this.url = url || window.location.href;
        this.urlObject = this.parse();
    };

    URLParser.prototype = {
        constructor: URLParser,

        parse: function (url) {
            var tempArr,
                item,
                i,
                returnObj = {};
            this.url = url || this.url;
            tempArr = this.url.split("?");
            returnObj.baseURL = tempArr[0];
            returnObj.params = {};
            if (tempArr.length > 1) {
                returnObj.queryString = tempArr[1];
                tempArr = tempArr[1].split("&");
                for (i = 0; i < tempArr.length; i++) {
                    item = tempArr[i].split("=");
                    returnObj.params[item[0]] = item[1];
                }
            } else {
                returnObj.queryString = "";
            }

            return returnObj;
        },

        toString: function () {
            var strURL = this.urlObject.baseURL + "?",
                paramObj = this.urlObject.params,
                prop;
            for (prop in paramObj) {
                if (paramObj.hasOwnProperty(prop)) {
                    strURL += prop + "=" + paramObj[prop] + "&";
                }
            }
            return strURL.substr(0, strURL.length - 1);
        },

        removeParams: function (removeArray) {
            var paramObj = this.urlObject.params,
                key,
                i;
            if (removeArray instanceof Array) {
                for (i = 0; i < removeArray.length; i++) {
                    key = removeArray[i];
                    if (paramObj.hasOwnProperty(key)) {
                        delete paramObj[key];
                    }
                }
            }
        },

        addParams: function (paramObj) {
            var params = this.urlObject.params,
                key;
            if (typeof paramObj === "object") {
                for (key in paramObj) {
                    if (paramObj.hasOwnProperty(key)) {
                        params[key] = paramObj[key];
                    }
                }
            }
        }
    };

    var up = new URLParser();
    var urlObj = up.parse('?id=1&value=13&name=Anne Yan&phone=0995-477-1290');

  //  alert(urlObj.params['name']);

});