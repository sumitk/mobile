//Ti.include('../jssha256.js');
//Ti.include('../json_encode.js');

var url = Ti.App.Properties.getString('url');
var key = Ti.App.Properties.getString('key');
var domain = Ti.App.Properties.getString('domain');

/**
 * @key is api key for drupal services authentication
 * @timestamp is timestamp used to create hash
 * @domain is registered domain name for api key on drupal site
 * @nonce is a random string produced byu random function
 * @method is method name to be called via services API
 * This function will return a hash code which will be used to make authenticated calls to services api
 */
 
function get_hash(key, timestamp, domain, nonce, method) {
  
  HMAC_SHA256_init(key);
  HMAC_SHA256_write(timestamp+';'+domain+';'+nonce+';'+method);
  mac = HMAC_SHA256_finalize();      
  hash = array_to_hex_string(mac);
  
  return hash;
}

/**
 * @method is method name called via servicesAPI
 * @params is an array with all required parameters
 * return function returns an encoded xmlrpc request 
 *  which could be used in services call
 */
function xmlrpc_encode(method, params) {
  var xml = '<methodCall>';
  xml += '<methodName>'+method+'</methodName>';
  xml += '<params>';
  for(var k=0; k<params.length; k++) {
    var p = params[k];
    Titanium.API.info("xmlrpc: p: "+p);
    xml += '<param><string>'+p+'</string></param>';
  }
  xml += '</params></methodCall>';
// Ti.API.info('sent xml:'+xml) 
  return xml;
}

function get_timestamp() {
  var date = new Date();
  var timestamp = date.getTime();
  return timestamp;
}

function get_nonce() {
  var nonce = Math.random()*3000;
  return nonce;
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 */

function node_get(nid, callback) {
  var method = 'node.get';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, nid);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  Ti.API.info(hash);
  
  var xhr = Titanium.Network.createHTTPClient();
  
  var rest_url = 'http://dataset2.6:8888/services/rest/node';
  
  xhr.open('POST','http://dataset2.6:8888/services/json');
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send({json: JSON.stringify(node)});
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 */

function node_view(nid, callback) {
  var method = 'node.view';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, nid);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  Ti.API.info(hash);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function node_save(node, callback) {
  var method = 'node.save';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  var node_content = json_encode(node);
  Ti.API.info(node_content);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, node_content);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  Ti.API.info(xml);
//  Ti.API.info(hash);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function node_resource_create(node, callback) {
  var method = 'node_resource.create';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  var node_content = json_encode(node);
  //Ti.API.info(hash+';'+domain+';'+timestamp+';'+nonce+';'+node);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, node_content);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  //Ti.API.info(hash);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function node_resource_delete(nid, callback) {
  var method = 'node_resource.delete';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, nid);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function node_resource_retrieve(nid, callback) {
  var method = 'node_resource.retrieve';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  var node = new Object;
  node.method = method;
  //node.hash = hash;
  //node.domain_name = domain;
  //node.domain_time_stamp = timestamp;
  //node.nonce = nonce;
  node.nid = nid;
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  xhr.send({data: json_encode(node)});
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function node_resource_update(node, callback) {
  var method = 'node_resource.update';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  node_json = json_encode(node);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, node_json);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function comment_save(comment, callback) {
  var method = 'comment.save';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  var comment_content = json_encode(comment);
  //Ti.API.info(comment_content);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, comment_content);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  //Ti.API.info(hash);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function comment_load(cid, callback) {
  var method = 'comment.load';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, cid);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
 
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function file_get(fid, callback) {
  var method = 'file.get';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, fid);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  //Ti.API.info(hash);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function file_getNodeFiles(nid, callback) {
  var method = 'file.getNodeFiles';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, nid);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function file_save(file, callback) {
  var method = 'file.save';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  var file_content = json_encode(file);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, file);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function menu_get(menu_id, callback) {
  var method = 'menu.get';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
 
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, menu_id);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function taxonomy_saveTerm(term, callback) {
  var method = 'taxonomy.saveTerm';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  var term_content = json_encode(term);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, term_content);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function taxonomy_saveVocabulary(vocabulary, callback) {
  var method = 'taxonomy.saveVocabulary';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  var vocabulary_content = json_encode(vocabulary);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, vocabulary_content);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function taxonomy_getTree(vid, parent, max_depth, callback) {
  var method = 'taxonomy.saveVocabulary';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, vid, parent, max_depth);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function user_login(username, password, callback) {
  var method = 'user.login';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, username, password);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function user_get(uid, callback) {
  var method = 'user.get';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce, uid);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function user_logout(callback) {
  var method = 'user.logout';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  var params = new Array(hash, domain, timestamp, nonce);
  
  //formatted xmlrpc call
  var xml = xmlrpc_encode(method, params);
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  xhr.onload = callback;
  
  Titanium.API.info("xmlrpc: xml: "+xml);
  xhr.send(xml);
  Titanium.API.info("xmlrpc: end");
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function user_save(account, callback) {
  var method = 'user.save';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  var userVal = new Object;
  user.method = method;
  //node.hash = hash;
  //node.domain_name = domain;
  //node.domain_time_stamp = timestamp;
  //node.nonce = nonce;
  userVal.user = new Object;
  userVal.user.name = account.name;
  userVal.user.mail = account.mail;
  
   Ti.API.info(JSON.stringify(user));
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  
  xhr.onload = function() {
    Ti.API.info(this.responseText);
  }
    
  xhr.send({data: JSON.stringify(userVar)});
}

/** 
 * Simple xmlrpc client for sending requests and receiving results via a callback using standard Titanium http client mechanics.
 * Spec: http://www.xmlrpc.com/spec
 * @url: the full url to the server side xmlrpc script
 * @method: the name of the xmlrpc method to call
 * @xml: is well formatted xmlrpc call to be used to call services API
 * array params: list of strings to send
 * func callback: callback function to call "onload"
 * @node is an object with type, title, body information
 */
function views_get(view_name, callback) {
  var method = 'views.get';
  var timestamp = get_timestamp();
  var nonce = get_nonce();
  
  // Generating hash according to ServicesAPI Key method
  //hash = get_hash(key, timestamp, domain, nonce, method);
  
  //array to pass all parameters
  //var params = new Array(hash, domain, timestamp, nonce, view_name);
  
  var view = new Object;
  view.method = method;
  //node.hash = hash;
  //node.domain_name = domain;
  //node.domain_time_stamp = timestamp;
  //node.nonce = nonce;
  view.view_name = view_name;
  
  var xhr = Titanium.Network.createHTTPClient();
  xhr.open("POST",url);
  
  xhr.onload = function() {
    Ti.API.info(this.responseText);
    
    var data_parse = JSON.parse(this.responseText);
   // Ti.API.info(data_parse[0]->node_data_field_lat_field_lat_value);
    Ti.API.info(data_parse.length);
    Ti.API.info(data_parse[0]["node_data_field_lat_field_lat_value"]);
    if(this.responseText){
      return JSON.parse(this.responseText);
    }
  }
  
  xhr.send({data: json_encode(view)});
}

function callback() {
  // you could use this.responseXML here too, this is just an example!
  Titanium.API.info('Received: '+this.responseText);
  //Titanium.API.info('ReceivedXML: '+this.responseXML);
  Ti.APi.info(this.status+this.connected+this.readyState+this.responseData+this.connectionType);

}