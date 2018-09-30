$(document).ready(function() {
    var items = [];

    $.getJSON('assets/js/pinsL5.json', function(json) {
        $.each(json.customers, function(index, orders) {
            $.each(this, function() {
                $.each(this, function() {
                    //items.push('<div class="row">' + this.name + "\t" + this.strength + "\t" + this.dose + "\t" + this.route + "\t" + this.sig + "\t" + this.pillCount + "\t" + this.refills + '</div>' + "\n");
                    items.push(
                        '<li class="list-group-item">'+
                            '<div class="media">'+
                                '<a class="media-left" href="#">'+
                                    '<div style="width: 40px; height: 40px">'+
                                     '<img class="rounded-img" style="width:100%; height:auto;"  src="assets/img/faces/'+this.photo+'" alt="...">'+
                                   '</div>'+
                                '</a>'+
                                '<div class="media-body">'+
                                   '<h4 class="media-heading">'+this.name+'</h4>'+
                                   '<small style="color:#c0c1c2;">last ordered:'+this.lastordered+'</small>'+
                               ' </div>'+
                               '<div class="media-right"><a href="#"><i class="material-icons" aria-hidden="true">chevron_right</i></a></div>'+
                           ' </div>'+
                       ' </li>'+ "\n");
                        
                        
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
});
