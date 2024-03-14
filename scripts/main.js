var map;
var infoWindow;
var markers = new Array();
var categories = new Array();
var tours = new Array();
var infoBuilding;
var infoImageIndex;
var copyLink;
var isMobile;
var infoData;
var smallInfoVisible = false;
var activeMarker;

const zoomUnfocused = 18;
const zoomFocused = 19;

const useDefaultIcons = false;
const selectedLocationIcon = "icon-default.png";
const locationIcon = "icon-default-2.png";
categories.push({id: 1, title: "Admissions", icon: useDefaultIcons ? selectedLocationIcon : "icon-admissions.svg", expand: false, group: "1", locations: [], note: ""});
categories.push({id: 2, title: "Parking", icon: useDefaultIcons ? selectedLocationIcon : "icon-parking.svg", expand: false, group: "1", locations: [], note: ""});
categories.push({id: 3, title: "College Entrances", icon: useDefaultIcons ? selectedLocationIcon : "icon-college-entrances.svg", expand: false, group: "1", locations: [], note: ""});
categories.push({id: 4, title: "Guest Services", icon: useDefaultIcons ? selectedLocationIcon : "icon-questionmark.svg", expand: false, group: "1", locations: [], note: ""});
categories.push({id: 5, title: "Academics and Administrative", icon: useDefaultIcons ? selectedLocationIcon : "icon-academic-administrative.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 6, title: "Athletics and Recreation", icon: useDefaultIcons ? selectedLocationIcon : "icon-athletics-recreation.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 7, title: "ATM locations", icon: useDefaultIcons ? selectedLocationIcon : "icon-atm.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 8, title: "Construction", icon: useDefaultIcons ? selectedLocationIcon : "icon-construction.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 9, title: "Covered Bridge", icon: useDefaultIcons ? selectedLocationIcon : "icon-covered-bridge.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 10, title: "Dining and Retail", icon: useDefaultIcons ? selectedLocationIcon : "icon-dining-and-retail.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 11, title: "Health and Safety", icon: useDefaultIcons ? selectedLocationIcon : "icon-health-and-safety.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 12, title: "Facility and Auxiliary Services", icon: useDefaultIcons ? selectedLocationIcon : "icon-facility-aux.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 13, title: "Music, Theatre and Art", icon: useDefaultIcons ? selectedLocationIcon : "icon-music-and-theatre.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 14, title: "Residences", icon: useDefaultIcons ? selectedLocationIcon : "icon-residences.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 15, title: "Student Life", icon: useDefaultIcons ? selectedLocationIcon : "icon-student-life.svg", expand: false, group: "2", locations: [], note: ""});
categories.push({id: 16, title: "The Oakes Museum of Natural History", icon: useDefaultIcons ? selectedLocationIcon : "icon-oakes-museum.svg", expand: false, group: "2", locations: [], note: ""});

function hideKeyboard(element) {
  element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
  element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
  setTimeout(function() {
    element.blur();  //actually close the keyboard
    // Remove readonly attribute after keyboard is hidden.
    element.removeAttr('readonly');
    element.removeAttr('disabled');
  }, 100);
}

$(document).ready(function(){
  isMobile = window.screen.width <= 480;
  /*if (isMobile) {
    showMapView();
  }*/
  
  var searchTerms = new Array();

  var gotoCategory = getURLParameter('category');
  var gotoLocation = getURLParameter('building');  
  var showCategory = '';
  var showLocation = '';

  var showCategory = gotoCategory;
  
  var url =  "https://www.messiah.edu/site/a/api/directoriesByCategoryJSONP.php?apiKey=a38737a6a302f5f0390169114b6640a6&directoryID=2&categoryID=-1&callback=directory_data";
  $.ajax({
    url: url,
    dataType: 'jsonp',
    jsonpCallback: 'directory_data',
    jsonp: 'callback',
    success: function (data) {
      var notes = new Array(); 
      for (var i = 0; i < data.length; i++) {
        if (data[i].live == '1') {
          var categoryName = data[i].category_name;
          if (categoryName != "") {
            if (categoryName == 'announcement') {
              if (data[i].live == '1') {
                $("#announcement-title").text(data[i].entry_title);
                $("#announcement-description").text(data[i].description);
                $('#announcement-back').show();
              }
            } else {
              if (categoryName == 'Tours') {
                tours.push(data[i]);
              } else {
                var category = findCategoryByName(categoryName);
                if (category != null) {
                  if (data[i].entry_title == "category_notes") {
                    notes.push(data[i]);
                  } else {
                    if ((gotoCategory != '') && (data[i].category_id == gotoCategory)) {
                      showCategory = category.id;
                    }
                    if ((gotoLocation != '') && (data[i].shortcut == gotoLocation)) {
                      showLocation = data[i].entry_id;
                    }
                    
                    if (data[i].hide_category_expand != 'Yes') {
                      category.expand = true;
                    }
                    
                    var path = 'http://www.messiah.edu/images/';
                    data[i].images = new Array();
                    if (data[i].image_1_required != '') {
                      data[i].images.push(path + data[i].image_1_required);
                    }
                    if (data[i].image_2_optional != '') {
                      data[i].images.push(path + data[i].image_2_optional);
                    }
                    if (data[i].image_3_optional != '') {
                      data[i].images.push(path + data[i].image_3_optional);
                    }
                    if (data[i].image_4_optional != '') {
                      data[i].images.push(path + data[i].image_4_optional);
                    }
                  
                    data[i].selected = false;
                    category.locations.push(data[i]);
                    
                    if (data[i].hide_from_search == '') {
                      var label = data[i].entry_title + ' ' + data[i].keywords;
                      if (data[i].keywords != '') {
                        label = label + ' ' + data[i].keywords;
                      }
                      searchTerm = {label: label, id: data[i].entry_id, title: data[i].entry_title, category: data[i].category_name};
                      searchTerms.push(searchTerm);
                    }
                  }
                } else {
                  //category_name not found
                  //console.log('not found = ' + categoryName);
                }
              }
            }
          } else {
            //category_name empty
            //console.log("empty = " + data[i].entry_title);
          }
        } else {
          //not live
          //console.log("not live = " + data[i].entry_title);
        }
      }
      
      for (var i = 0; i < notes.length; i++) {
        var categoryName = notes[i].category_name;
        var category = findCategoryByName(categoryName);
        if (category != null) {
          category.note = notes[i].description;
        }
      }
      
      for (var i = 0; i < categories.length; i++) {
        $("#categoryTemplate").tmpl(categories[i]).appendTo(".categories" + categories[i].group);
      }
      $("#tourTemplate").tmpl(tours).appendTo(".tours");

      jQuery.ui.autocomplete.prototype._resizeMenu = function () {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
      }
      
      $("#search").autocomplete({
        minLength: 1,
        source: searchTerms,
        focus: function(event, ui) {
          return false;
        },
        select: function(event, ui) {
          $("#search").val('');
          showInfoWindow(ui.item.id);
          openInfoDrawer();
          hideKeyboard($("#search"));
          if ($(".searchIcon").is(":visible")) {
            showMain();
          }
          return false;
        },
        open: function(event) {
        
          if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $('.ui-autocomplete').off('menufocus hover mouseover');
          }
        
          $('.ui-autocomplete').css('height', 'auto');
          var $input = $(event.target),
              inputTop = $input.offset().top,
              inputHeight = $input.height(),
              autocompleteHeight = $('.ui-autocomplete').height(),
              windowHeight = $(window).height();
          
          if ((inputHeight + inputTop+ autocompleteHeight) > windowHeight) {
              $('.ui-autocomplete').css('max-height', (windowHeight - inputHeight - inputTop - 20) + 'px');
          }
        }        
      })
      .autocomplete( "instance" )._renderItem = function(ul, item) {
        return $( "<li>" )
          .append( "<a><span>" + item.title + "</span><span>" + item.category + "</span></a>" )
          .appendTo( ul );
      };
      
      if (showCategory != '') {
        $("#check-" + showCategory).trigger('click');
      }
      if (showLocation != '') {
         showInfoWindow(showLocation);
         openInfoDrawer();
         hideKeyboard($("#search"));
      }
    },
    error: function(jqXHR, textStatus, errorThrown) { 
      //alert(jqXHR.resultText);
    }
  });
  
  $('.fancybox-media').fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    helpers : {
      media : {}
    }
  });
  
  $('#sidebarToggle').click(toggleMenuDrawer());

  $('.toggleSearch').on('click', function(){
    $('header.mainHeader .mainSearchBar').toggleClass("openMobile");
    $(this).toggleClass("openMobile");
    $("#search").focus();

    $('.tabsContainer').removeClass("openMobile");
    $('.toggleOptions').removeClass("openMobile");
  });

  $('.toggleOptions').on('click', function(){
    $('.tabsContainer').toggleClass("openMobile");
    $('#unfocusMobileMenu').toggleClass("openMobile");
    $(this).toggleClass("openMobile");

    $('header.mainHeader .mainSearchBar').removeClass("openMobile");
    $('.toggleSearch').removeClass("openMobile");
  });

  $('#unfocusMobileMenu').on('click', function(){
    $('.tabsContainer').removeClass("openMobile");
    $('#unfocusMobileMenu').removeClass("openMobile");
    $('.toggleOptions').removeClass("openMobile");
  });

  $('.backBtn').on('click', function(){
    showMapView();
  });
  
  $(document).on('click', "#locations-tab", function(event) {  
    event.stopPropagation();
    if (!$(this).hasClass("active")) {
      $(this).toggleClass("active");
      $(this).siblings().removeClass("active");
      $("#locations").show();
      $("#tours").hide();
    }
  });    
  
  $(document).on('click', "#tours-tab", function(event) {  
    event.stopPropagation();
    if (!$(this).hasClass("active")) {
      $(this).toggleClass("active");
      $(this).siblings().removeClass("active");
      $("#locations").hide();
      $("#tours").show();
    }
  });    

  $(document).on('click', ".header", function(event) {  
    if ($(this).attr('data-expand') == 'true') {
      const toggle = $(this).find('.toggleIcon');
      switch(toggle.text()) {
        case "+":
          toggle.text("-");
          break;
        case "-":
        default:
          toggle.text("+");
          break;
      }
      $(this).find('> ul').slideToggle(200, function () {});
    }
  });
  
  $(document).on('click', ".show-all", function(event) {  
    event.stopPropagation();
    var category = $(this).parents('.header').attr("data-id");
    showCategoryMarkers(category, true);
    /*if (isMobile) {
      showMapView();
    }*/
  });    
  
  $(document).on('click', ".hide-all", function(event) {  
    event.stopPropagation();
    var category = $(this).parents('.header').attr("data-id");
    showCategoryMarkers(category, false);
    $(this).hide();
  });    

  $(document).on('click', ".location", function(event) {  
    event.stopPropagation();
    var location = $(this).attr("data-id");
    showInfoWindow(location);
    /*if (isMobile) {
      showMapView();
    }*/
    openInfoDrawer();
  });

  $(document).on('click', ".icon-close-btn", function(event) {  
    $('#copy-link-panel').hide();
  });
  
  $(document).on('click', "#shareLocation", function(event) {
    $('#copy-link-panel').show();
    $("#copy-link-edit").val(copyLink);
    $("#copy-link-edit").focus();
    $("#copy-link-edit").select();
  });
  
  $(document).on('click', ".small-info-close", function(event) {
    hideSmallInfo();
  });
  
  $(document).on('click', ".large-info-close", function(event) {  
    hideLargeInfo();
  });   

  $(document).on('click', ".show-location-details", function(event) {
    hideSmallInfo();
    $('.large-info-window').html('');
    $("#largeLocationInfoTemplate").tmpl(infoData).appendTo(".large-info-window");
    $('.large-info-window').show();
  });
  
  $(document).on('click', ".announcement-close", function(event) {  
    $('#announcement-back').hide();
  });
  
});

function toggleMenuDrawer(toClose=false) {
  return function (){
    var MenuDrawerToggle = $('#sidebarToggle');
    const isClosed = MenuDrawerToggle[0].classList.contains('closed');
    if (!toClose || !isClosed) {
      if(isClosed){
        closeInfoDrawer();
      }
      MenuDrawerToggle.toggleClass('closed');
      MenuDrawerToggle.find('> span').toggleClass('icon-doublearrow-left icon-doublearrow-right');
      $('.mainSidebarWrapper').toggleClass('closed');
    }
  }
}

////////// TEMP: to show the tile coordinates and zoom level when mouse moves.
var TILE_SIZE = 256;

function project(latLng) {
  var siny = Math.sin(latLng.lat() * Math.PI / 180);

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);

  return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}
////////// END TEMP: to show the tile coordinates and zoom level when mouse moves.


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.157204, lng: -76.988973},
    zoom: zoomUnfocused,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
  });

  /////// TEMP: Show the tile coordinates and zoom level when mouse moves.
  var coordsDiv = document.getElementById('coords');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
  map.addListener('mousemove', function(event) {

    var worldCoordinate = project(event.latLng);
    var scale = 1 << map.getZoom();

    var tileCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale / TILE_SIZE),
        Math.floor(worldCoordinate.y * scale / TILE_SIZE));

    coordsDiv.innerHTML = tileCoordinate + " " + map.getZoom() + " " + event.latLng;
  });
  /////// END TEMP: Show the tile coordinates and zoom level when mouse moves.

  // Bounds of the map overlay tiles (in different zooms)
  var bounds = {
    15: [[9375, 9377], [12385, 12387]],
    16: [[18750, 18754], [24771, 24774]],
    17: [[37501, 37509], [49542, 49548]],
    18: [[75003, 75018], [99085, 99097]],
    19: [[150007, 150037], [198170, 198195]],
    20: [[300015,300075],[396340,396390]]
  };

  // Map overlay handler
  var imageMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {

      if (zoom < 15 || zoom > 20 ||
          bounds[zoom][0][0] > coord.x || coord.x > bounds[zoom][0][1] ||
          bounds[zoom][1][0] > coord.y || coord.y > bounds[zoom][1][1]) {
        return null;
      }

      return ['./tiles/',
        zoom, '/tile_', coord.x, 'x', coord.y, '.png'].join('');
    },
    tileSize: new google.maps.Size(256, 256)
  });

  // Adding overlay handler to map
  map.overlayMapTypes.push(imageMapType);


  google.maps.event.addListener(map, 'bounds_changed', function() {
    if (smallInfoVisible) {
      setSmallInfoPosition();
    }
  });
  
  infoWindow = new google.maps.InfoWindow({ maxWidth: 350 });
  google.maps.event.addListener(infoWindow, 'domready', function() {
    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the infowindow 115px to the right.
    //iwOuter.parent().parent().css({left: '115px'});

    // Moves the shadow of the arrow 76px to the left margin.
    //iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Moves the arrow 76px to the left margin.
    //iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': '#293e5d 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }
  }); 
}//initMap

function findCategoryByName(name) {
  var result = null;
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    if (category.title == name) {
      result = category;
      break;
    }
  }
  return result;
}//findCategoryByName

function findCategoryById(id) {
  var result = null;
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    if (category.id == id) {
      result = category;
      break;
    }
  }
  return result;
}//findCategoryById

function findLocationById(id) {
  var result = null;
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    for (var j = 0; j < category.locations.length; j++) {
      var location = category.locations[j];
      if (location.entry_id == id) {
        result = location;
        break;
      }
    }
  }
  return result;
}//findLocationById

function findMarkerById(id) {
  var result = null;
  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    if (marker.location.entry_id == id) {
      result = marker;
      break;
    }
  }
  return result;
}//findMarkerById  

function showCategoryMarkers(id, visible) {
  var category = findCategoryById(id);
  if (category != null) {
    for (var i = 0; i < category.locations.length; i++) {
      var location = category.locations[i];
      if (visible) {
        location.selected = true;
        showLocationMarker(location, false);
      } else {
        location.selected = false;
        hideLocationMarker(location);
      }
    }
  }
}//showCategoryMarkers

function showLocationMarker(obj, isSelected) {
  var marker = findMarkerById(obj.entry_id);
  if (marker == null) {
    var category = findCategoryByName(obj.category_name);
    if (category != null) {
      var icon = "images/" + (isSelected ? selectedLocationIcon : locationIcon);
      var latlng = obj.location.split(',');
      var marker = addMarker(obj, parseFloat(latlng[0]), parseFloat(latlng[1]), icon,
              obj.polyline_coordinates.length === 0 && obj.polygon_coordinates.length === 0);
      marker.polygons = new Array();
      marker.childMarkers = new Array();
      markers.push(marker);

      $(".show-hide").hide(); //safari bug fix
      $("#hide-" + category.id).show();
      $(".show-hide").show(); //safari bug fix
      
      if (obj.polyline_coordinates.length > 0){
        var str = obj.polyline_coordinates;
        str = str.slice(1);
        str = str.slice(0, -1);
        var res = str.split("},{"); 
        var coordinates = new Array();
        for (var j = 0; j < res.length; j++) {
          str = res[j];
          var res2 = str.split(",");
          var latLng = new Object();
          latLng.lat = parseFloat(res2[0]);
          latLng.lng = parseFloat(res2[1]);
          coordinates.push(latLng);
        }
          
        //#6697B8,1.0,2
        var str = obj.polyline_or_polygon_styling;
        var res = str.split(","); 

        var polyline = new google.maps.Polyline({
          path: coordinates,
          geodesic: true,
          strokeColor: res[0],
          strokeOpacity: parseFloat(res[1]),
          strokeWeight: parseInt(res[2])
        });
        polyline.setMap(map);
        
        marker.polyline = polyline;
      } 

      if (obj.polygon_coordinates.length > 0){
        var str = obj.polygon_coordinates;
        var polygons = str.split("|");
        for (var k = 0; k < polygons.length; k++) {
          var str = polygons[k];
          str = str.slice(1);
          str = str.slice(0, -1);
          var res = str.split("},{"); 
          var coordinates = new Array();
          for (var j = 0; j < res.length; j++) {
            str = res[j];
            var res2 = str.split(",");
            var latLng = new Object();
            latLng.lat = parseFloat(res2[0]);
            latLng.lng = parseFloat(res2[1]);
            coordinates.push(latLng);
          }
          
          //#6697B8,0.8,2,#d0dde6,0.35
          var str = obj.polyline_or_polygon_styling;
          var res = str.split(","); 
            
          var polygon = new google.maps.Polygon({
            path: coordinates,
            strokeColor: res[0],
            strokeOpacity: parseFloat(res[1]),
            strokeWeight: parseInt(res[2]),
            fillColor: res[3],
            fillOpacity: parseFloat(res[4])
          });
          polygon.setMap(map);

          marker.polygons.push(polygon);
        }
      } 
      
      if (obj.multiple_locations_new.length > 0){
        var str = obj.multiple_locations_new;
        var res = str.split("|"); 
        for (var j = 0; j < res.length; j++) {
          str = res[j];
          var res2 = str.split(",");
          var childMarker = addMarker(obj, parseFloat(res2[0]), parseFloat(res2[1]), icon);
          marker.childMarkers.push(childMarker);
        }
      }
      
    }
  }

  return marker
}//showLocationMarker


var centerChangedMarkerListenerId = null;
var boundsChangedMarkerListenerId = null;


function addMarker(location, lat, lng, icon, isVisible=true) {
  var position = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({position: position, map: map, icon: icon});
  marker.location = location;
  if (location.hide_marker_and_info_box == 'Yes' || !isVisible) {
    marker.setVisible(false);
  } else {
     
    marker.addListener('click', function() {
      locationSelected(marker);
      openInfoDrawer();
      focusMarker(marker);
    });
  }
  
  return marker
}//addMarker

function locationSelected(marker) {
  hideMarkers(marker);
  infoBuilding = marker.location;
  infoImageIndex = 0;
  infoData = new Object();
  infoData.entry_title = infoBuilding.entry_title;
  infoData.description = infoBuilding.description;
  infoData.read_more_link = infoBuilding.read_more_link;
  infoData.image = '';
  infoData.imageCount = infoBuilding.images.length;
  if (infoBuilding.images.length > 0) {
    infoData.image = infoBuilding.images[0];
  }
  infoData.location = infoBuilding.location;console.log(infoBuilding.virtual_tour_url)
  infoData.virtual_tour = infoBuilding.virtual_tour_url;
  var category = findCategoryByName(infoBuilding.category_name);
  if (category != null) {
    infoData.icon = category.icon;
  }
  infoData.copyLink = '';
  if (infoBuilding.shortcut != '') {
    var url = window.location.href;
    if (url.indexOf('?') != -1) {
      url = url.substring(0, url.indexOf('?'));
    }
    infoData.copyLink = url + '?building=' + infoBuilding.shortcut;
  }
  copyLink = infoData.copyLink;
  hideLargeInfo();
  /*if (isMobile) {
    var point = fromLatLngToPoint(marker.getPosition(), map);
    var contentString = $("#smallLocationInfoTemplate").tmpl(infoData).html();
    $('#small-info-window').html(contentString).show();
    smallInfoVisible = true;
    activeMarker = marker;
    setSmallInfoPosition();
  } else {*/
    var contentString = $("#locationInfoTemplate").tmpl(infoData).html();

    /* infoWindow.setContent(contentString);
    infoWindow.open(map, this); */
    $("#infoDrawerContent").html(contentString);

    var directionsOption = $("#menuOptionTemplate").tmpl({
      option_text: "Directions",
      option_image: "images/modal-directions.svg",
      option_url: "https://maps.google.com?saddr=Current+Location&daddr=" + infoData.location}).html();
    $("#option-directions").html(directionsOption);

    var tourOption = $("#menuOptionTemplate").tmpl({
      option_text: "Virtual Tour",
      option_image: "images/modal-virtual-tour.svg",
      option_url: infoData.virtual_tour}).html();
    $("#option-tour").html(tourOption);

    var websiteOption = $("#menuOptionTemplate").tmpl({
      option_text: "Website",
      option_image: "images/modal-website.svg",
      option_url: infoBuilding.read_more_link}).html();
    $("#option-website").html(websiteOption);

    var galleryOption = $("#menuOptionTemplate").tmpl({
      option_text: "Photo Gallery",
      option_image: "images/modal-photo-gallery.svg",
      option_onclick: "openModal();currentSlide(1)"}).html();
    $("#option-gallery").html(galleryOption);

    if (infoBuilding.images.length > 0) {

      const images = infoBuilding.images.map((val, index) => ({url: val, num: index + 1}));

      var slides = $("#mySlidesTemplate").tmpl({ images }).html();
      $("#mySlidesContainer").html(slides);

      var columns = $("#columnsTemplate").tmpl({ images }).html();
      $("#columns").html(columns);
    }

    $(".gm-style-iw").next("div").show();
    $("#locationInfoDescription").html(decodeEntities(infoData.description));



    $('.viewLocationOnMap').on('click', function(){
      $('.tabsContainer').removeClass("openMobile");
      $('#unfocusMobileMenu').removeClass("openMobile");
      $('.toggleOptions').removeClass("openMobile");
      $('.toggleSearch').removeClass("openMobile");
      closeInfoDrawer();
    });
 // }
}

function hideLocationMarker(obj) {
  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    if (marker.location.entry_id == obj.entry_id) {
      if (marker.polyline != null) {
        marker.polyline.setMap(null);
      }
      while (marker.polygons.length > 0) {
        var polygon = marker.polygons.shift();
        polygon.setMap(null);
      }
      while (marker.childMarkers.length > 0) {
        var childMarker = marker.childMarkers.shift();
        childMarker.location = null;
        childMarker.setMap(null);
      }
      
      marker.polyline = null;
      marker.polygon = null;
      marker.location = null;
      marker.setMap(null);
      markers.splice(i, 1);

      break;
    }
  }
}//hideLocationMarker  

function fromLatLngToPoint(latLng, map) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}//fromLatLngToPoint

function showInfoWindow(locationId) {
  var marker = findMarkerById(locationId);
  hideMarkers(marker);
  if (marker == null) {
    var location = findLocationById(locationId);
    if (location != null) {
      marker = showLocationMarker(location, true);
      focusMarker(marker);
    }
  } else {
    focusMarker(marker);
  }
}//showInfoWindow

function resetSelectedMarker() {
  if(Array.isArray(markers)) {
    for(let i = 0; i < markers.length; i++) {
      let marker = markers[i];
      if(marker && marker.setIcon){
        marker.setIcon("images/" + locationIcon);
      }
    }
  }
}

const focusLatitudeOffset = 0.00025;
const focusLongitudeOffset = -0.00051;

function isInMobile(){console.log(window.innerWidth)
  return window.innerWidth <= 480;
}

function focusMarker(marker) {
  var latLng = new google.maps.LatLng({
    lat: marker.getPosition().lat() + (isInMobile() ? focusLatitudeOffset : 0),
    lng: marker.getPosition().lng() + (isInMobile() ? 0 : focusLongitudeOffset)});
  map.setZoom(zoomFocused);
  map.panTo(latLng);
  locationSelected(marker);
  resetSelectedMarker();
  marker.setIcon("images/" + selectedLocationIcon);
}//focusMarker

function getURLParameter(sParam) {
    var result = '';
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            result = sParameterName[1];
            break;
        }
    }
    return result;
}//getURLParameter

function setSmallInfoPosition() {
  var point = fromLatLngToPoint(activeMarker.getPosition(), map);
  $('#small-info-window').css({'left': point.x - ($('#small-info-window').width() / 2),'top': point.y - $('#small-info-window').height() - 55});
}//setSmallInfoPosition

function hideSmallInfo() {
  $('#small-info-window').hide();
  smallInfoVisible = false;
  activeMarker = null;
}//hideSmallInfo

function hideLargeInfo() {
  $('.large-info-window').hide();
}//hideLargeInfo

function showMapView() {
  // $('.tabsContainer').hide();
  $('.mainHeader').show();
}//showMapView

function showMain() {
  $('.flexWrapper').show();
  $('.mainSearchBar').hide();
}//showMain

function hideMarkers(sender) {
  var i = 0;
  while (i < markers.length) {
    var marker = markers[i];
    if ((sender != marker) && (!marker.location.selected)) {
      var category = marker.location.category_name;
      hideLocationMarker(marker.location);
      checkHideAllButton(category);
    } else {
      i++;
    }
  }
}//hideMarkers

function checkHideAllButton(categoryName) {
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    if (category.title == categoryName) {
      var found = false;
      for (var j = 0; j < category.locations.length; j++) {
        var location = category.locations[j];
        if (findMarkerById(location.entry_id)) {
          found = true;
          break;
        }
      }
      if (!found) { 
        $('#hide-' + category.id).hide();
      }
      break;
    }
  }
}//checkHideAllButton

function decodeEntities(encodedString) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}//decodeEntities

/* // Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "grid";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);*/


function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = null;
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Stop closing the Modal
function stopClosingModal(event) {
  event.stopPropagation();
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
 