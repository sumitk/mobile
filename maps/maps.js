Ti.include('key.js');

//var url = Ti.App.Properties.getString('url');
//var key = Ti.App.Properties.getString('key'); 
//var domain = Ti.App.Properties.getString('domain');
var url = 'http://dataset.tut2tech.com/services/json';

var timestamp = get_timestamp();
var key = '146062063d3fd0069c0a617f08d33292';
var domain = 'http://dataset.tut2tech.com';
var nonce = get_nonce();
var method = 'views.get';

// Generating hash according to ServicesAPI Key method
hash = get_hash(key, timestamp, domain, nonce, method);

Ti.API.info('hash is:'+hash);

var win = Titanium.UI.currentWindow;

var isAndroid = false;

if (Titanium.Platform.name == 'android') {
	isAndroid = true;
	menu = Titanium.UI.Android.OptionMenu.createMenu();
}

//
// CREATE ANNOTATIONS
//

  // making call to drupal services api
  var view = new Object;
  view.method = 'views.get';
  view.hash = hash;
  view.domain_name = domain;
  view.domain_time_stamp = timestamp;
  view.nonce = nonce;
  view.view_name = 'mobile_crimes';
  view.limit = 80;
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  
  // sending xhr call for view
  xhr.send({data: JSON.stringify(view)});
  
  xhr.onload = function() {
    
  var data = JSON.parse(this.responseText);
  var data = data['#data'];

  //node_data_field_lat_field_lat_value" = "32.58";node_data_field_lat_field_lon_value

  Ti.API.info(data);

  Ti.API.info(data.length);
  //Ti.API.info(data[0]["node_data_field_lat_field_lat_value"])

Ti.API.info(data[3]['node_data_field_lat_field_lat_value']);

 
  var an1 = Titanium.Map.createAnnotation({
      latitude:data[1]['node_data_field_lat_field_lat_value'],
      longitude:data[1]['node_data_field_lat_field_lon_value'],
      title:data[1]['node_title'],
      subtitle:'Mountain View, CA',
      pincolor:Titanium.Map.ANNOTATION_RED,
      animate:true,
      leftButton: 'images/appcelerator_small.png',
      myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS  
  });

  var mapview = Titanium.Map.createView({
      mapType: Titanium.Map.STANDARD_TYPE,
      region: {latitude:data[2]['node_data_field_lat_field_lat_value'],
          longitude:data[2]['node_data_field_lat_field_lon_value'],
          latitudeDelta:0.01, longitudeDelta:0.01},
      animate:true,
      regionFit:true,
      userLocation:false,
      annotations:[an1]
  });

  win.add(mapview);

  var me = [];
  for (var i = 0; i < data.length; i++) { 
    me[i] = Titanium.Map.createAnnotation({
        latitude:data[i]['node_data_field_lat_field_lat_value'],
        longitude:data[i]['node_data_field_lat_field_lon_value'],
        title:data[i]['node_title'],
        subtitle:'Mountain View, CA',
        pincolor:Titanium.Map.ANNOTATION_RED,
        animate:true,
        leftButton: 'images/appcelerator_small.png',
        myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
    });
  
  mapview.addAnnotations(me);
  }


//mapview.addAnnotation(dbMarker);
  // Now display all the map pins from the data base
/*  for (i=0;i<myAnnotations.length;i++){
     if(myAnnotations[i].deleted){continue;} //ignore this annotation
  
     //...much application specific code removed from here...
  
     mapview.addAnnotation(myAnnotations[i]); //put pin on map
  }
*/
  
}