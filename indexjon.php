<?php

    $cachetime = 86400;
    $remotepath = 'http://www.messiah.edu/mcapi/?directoryID=1&live_only=Y&apiKey=a38737a6a302f5f0390169114b6640a6&categoryID=-1';
    $cachefile = 'campus-map.json';

    // Generate the cache version if it doesn't exist or it's too old!
    if (!file_exists($cachefile) or (filemtime($cachefile) < (time() - $cachetime))) {
        $options = [
            'method' => 'GET',
            'header' => "Accept-language: en\r\n" .
            "User-Agent: Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)\r\n",
        ];

        $context = stream_context_create(['http' => $options]);
        $contents = file_get_contents($remotepath, false, $context);

        file_put_contents($cachefile, $contents, LOCK_EX);
    }
?>
<!doctype html>
<html class="no-js" lang="">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Messiah College Campus Map</title>

  <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
  <!-- Place favicon.ico in the root directory -->

  <!-- importing font-packs -->
  <link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/72d06cb8-0c8f-4fd7-b671-80f4e1989ebc.css"/>

  <!-- build:css styles/main.css -->
  <link rel="stylesheet" href="styles/main.min.css?v=17">
  <!-- endbuild -->
      
</head>
<body>
<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-KGNCRL"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KGNCRL');</script>
<!-- End Google Tag Manager -->

<!--[if lt IE 10]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<div id="map" class="mapContainer"></div>
<div id="marker-tooltip"></div>
<div id="small-info-window"></div>

<div id="announcement-back">
  <div id="announcement-window">
    <div class="toolTip">
        <span onclick="" class="announcement-close announcement-close-button"><i class="icon-x-btn"></i></span>
      <div>
        <p id="announcement-title"></p>
        <p id="announcement-description" class="toolTip__content"></p>
        <p class="text-center tooltip__toolBar">
          <a id="announcement-button" class="announcement-close btn toolTip__btn">View the campus map</a>
        </p>
      </div>
    </div>
  </div>
</div>

<div class="mainSidebarWrapper">
  <div class="mainSidebar">
    <div class="sidebarTopBg"></div>
  </div>

  <header class="mainHeader">
    <div class="flexWrapper">
      <div class="mainLogo">
        <img src="images/MessiahCollege-logo_small.png" alt="Messiah College">
        <span class="mainLogo__lbl">see anew</span>
      </div>

      <div class="mobileControls">
        <span class="toggleSearch icon-search"></span>
        <span class="toggleOptions glyphicon glyphicon-menu-hamburger"></span>
      </div>
    </div>

    <div class="mainSearchBar collapse">
      <div class="form-group ui-widget">
        <input id="search" class="form-control" type="text" placeholder="SEARCH">
        <span class="searchIcon icon-x-btn"></span>
      </div>
    </div>
  </header>

  <div class="tabsContainer">

    <div class="backToolbar">
      <div class="toggleOptions backBtn">
        <i class="glyphicon glyphicon-triangle-left"></i>
        BACK
      </div>
    </div>

    <!-- Nav tabs -->
    <ul class="nav nav-tabs navTabs" role="tablist">
      <li id="locations-tab" class="active" role="presentation"><span aria-controls="home" role="tab" data-toggle="tab">Locations</span></li>
      <li id="tours-tab" role="presentation"><span aria-controls="profile" role="tab" data-toggle="tab">Tours</span></li>
    </ul>

    <!-- Tab panes -->
    <div id="mainSidebarTabContent" class="tab-content tabContent">    
      <div class="hide-all-btn-container">
        <button class="hide-all-btn">Hide All</button>
      </div>
      <div role="tabpanel" class="tab-pane active" id="locations">
        <ul class="categories sightsList categories1">
          For our visitors:
        </ul>
        <ul class="categories sightsList categories2">
        </ul>
      </div>
      <div role="tabpanel tabContent" class="tab-pane" id="tours">
        <ul class="tours toursList">
        </ul>
      </div>
    </div>        
    <div class="dprint-btn-container">
      <a class="dprint-btn" href="http://www.messiah.edu/download/downloads/id/524/campus_map.pdf" target="_blank">Download Printable Map</a>
    </div>
  </div>
  
  <div class="large-info-window"></div>

</div>

<div class="sidebarToggle">
  <span class="icon-doublearrow-left"></span>
</div>

<script id="categoryTemplate" type="text/x-jQuery-tmpl">
  {{if (locations.length > 0) && (expand) }}
  <li class="header" data-expand="true" data-id="${id}">
    <span class="toggleIcon marker icon-chevrondown"></span>
  {{else}}
  <li class="header" data-expand="false" data-id="${id}">
  {{/if}}
    <div class="checkbox right">
      <label for="check-1-${id}">
        <span class="marker ${icon}"></span>
        <span class="sightName">${title}</span>
      </label>
    </div>

    <ul class="locations sightsList">
      <li class="show-hide"><a class="show-all btn toolTip__btn" id="check-${id}">Show All</a><a id="hide-${id}" class="hide-all btn toolTip__btn">Hide All</a></li>
      {{each locations}}
				<li data-id="${$value.entry_id}" class="location">${$value.entry_title}</li>
			{{/each}}
      {{if note != '' }}
      <li class="note">${note}</li>
      {{/if}}
    </ul>
  </li>
</script>

<script id="tourTemplate" type="text/x-jQuery-tmpl">
  <li>
    <a class="fancybox-media" href="${read_more_link}"><img src="http://www.messiah.edu/images/${image_1_required}" width="100%"></a>
    <p><strong>${entry_title}</strong></p>
    <p>${description}</p>
    <a class="fancybox-media" href="${read_more_link}"><span class="marker icon-chevronright"></span></a>
  </li>
</script>

<script id="locationInfoTemplate" type="text/x-jQuery-tmpl">
  <div class="toolTip">
    <div class="toolTip__header">
      <span class="marker-small  marker ${icon}"></span>
      <span>${entry_title}</span>
      {{if copyLink != ''}}
      <span class="icon-pop-out"></span>
      {{/if}}
    </div>
    <div id="copy-link-panel" class="toolTip__copy-link">
      <p><input id="copy-link-edit" class="form-control copy-link-edit" type="text" value="${copyLink}" readonly><span class="icon-close-btn"></span></p>
    </div>
    <div class="toolTip__copy-link" style="display:none;">
      <p><a class="btn toolTip__btn" href="${copyLink}" target="_blank"><span class="icon-link"></span>Open Link</a><span class="text">Link directly to this location on the campus map.</span><span class="icon-close-btn"></span></p>
    </div>
    <div>
      {{if image != ''}}
      <div class="tooltipCarousel">
        {{if imageCount > 1}}
        <span id="carousel-left" class="carouselControl icon-chevronleft"></span>
        {{else}}
        <span id="carousel-left" style="visibility:hidden;" class="carouselControl icon-chevronleft"></span>
        {{/if}}
        <div class="carouselContent">
          <img class="toolTip__image" src="${image}">
        </div>
        {{if imageCount > 1}}
        <span id="carousel-right" class="carouselControl icon-chevronright"></span>
        {{else}}
        <span id="carousel-right" style="visibility:hidden;" class="carouselControl icon-chevronright"></span>
        {{/if}}
      </div>
      {{/if}}

      <p class="text-center tooltip__toolBar">
        <a class="btn toolTip__btn" href="https://maps.google.com?saddr=Current+Location&daddr=${location}" target="_blank">DIRECTIONS</a>
        {{if read_more_link != ''}}
        <a class="btn toolTip__btn" href="${read_more_link}" target="_blank">READ MORE</a>
        {{/if}}
      <p>
      <p id="locationInfoDescription" class="toolTip__content">${description}</p>
    </div>
  </div>
</script>

<script id="smallLocationInfoTemplate" type="text/x-jQuery-tmpl">
  <div class="toolTip">
    <div class="toolTip__header">
      <span onclick="" class="small-info-close"><i class="icon-x-btn"></i></span>
      <span class="marker-small  marker ${icon}"></span>
      <span class="title">${entry_title}</span>
    </div>
    <div>
      <p class="text-center tooltip__toolBar">
        <a class="show-location-details btn toolTip__btn">Show Details</a>
      <p>
    </div>
  </div>
</script>

<script id="largeLocationInfoTemplate" type="text/x-jQuery-tmpl">
  <div class="toolTip">
    <div class="toolTip__header">
      <span onclick="" class="large-info-close"><i class="icon-x-btn"></i></span>
      <span class="marker-small  marker ${icon}"></span>
      <span>${entry_title}</span>
      {{if copyLink != ''}}
      <span onclick="" class="icon-pop-out"></span>
      {{/if}}
    </div>
    <div id="copy-link-panel" class="toolTip__copy-link">
      <p><input id="copy-link-edit" class="form-control copy-link-edit" type="text" value="${copyLink}" readonly><span onclick="" class="icon-close-btn"></span></p>
    </div>
    <div class="toolTip__copy-link" style="display:none;">
      <p><a class="btn toolTip__btn" href="${copyLink}" target="_blank"><span class="icon-link"></span>Open Link</a><span class="text">Link directly to this location on the campus map.</span><span class="icon-close-btn"></span></p>
    </div>
    <div>
      {{if image != ''}}
      <div class="tooltipCarousel">
        {{if imageCount > 1}}
        <span onclick="" id="carousel-left" class="carouselControl icon-chevronleft"></span>
        {{else}}
        <span id="carousel-left" style="visibility:hidden;" class="carouselControl icon-chevronleft"></span>
        {{/if}}
        <div class="carouselContent">
          <img class="toolTip__image" src="${image}">
        </div>
        {{if imageCount > 1}}
        <span onclick="" id="carousel-right" class="carouselControl icon-chevronright"></span>
        {{else}}
        <span id="carousel-right" style="visibility:hidden;" class="carouselControl icon-chevronright"></span>
        {{/if}}
      </div>
      {{/if}}

      <p class="text-center tooltip__toolBar">
        <a class="btn toolTip__btn" href="https://maps.google.com?saddr=Current+Location&daddr=${location}" target="_blank">DIRECTIONS</a>
        {{if read_more_link != ''}}
        <a class="btn toolTip__btn" href="${read_more_link}" target="_blank">READ MORE</a>
        {{/if}}
      <p>
      <p class="toolTip__content">${description}</p>
    </div>
  </div>
</script>

<!-- jQuery -->
<script src="lib/jQuery-2.1.4.min.js"></script>

<!-- jQuery UI -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<!-- jQuery Templates -->
<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js"></script>

<script type="text/javascript" src="scripts/main.min.js?v=40"></script>

<!-- Google Maps -->
<!-- <script src="http://maps.googleapis.com/maps/api/js?v=3.exp&callback=initMap"></script> -->
<script src="http://maps.googleapis.com/maps/api/js?v=3.23&key=AIzaSyDuK03Xp4KZdkHVHnsuV0Q46uVR5W7ECcU&callback=initMap"></script>
  
<!--- fancybox -->
<link rel="stylesheet" type="text/css" href="lib/fancybox/jquery.fancybox.css?v=2.1.5" media="screen" />
<script type="text/javascript" src="lib/fancybox/jquery.fancybox.js?v=2.1.5"></script>
<script type="text/javascript" src="lib/fancybox/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

</body>
</html>
