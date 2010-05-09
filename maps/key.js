Ti.include('jssha256.js');

var url = 'http://dataset.tut2tech.com/services/json';

function get_hash(key, timestamp, domain, nonce, method) {
  
  HMAC_SHA256_init(key);
  HMAC_SHA256_write(timestamp+';'+domain+';'+nonce+';'+method);
  mac = HMAC_SHA256_finalize();      
  hash = array_to_hex_string(mac);
  
  return hash;
}

function get_timestamp() {
  var date = new Date();
  var timestamp = date.getTime();
  return timestamp;
}

function get_nonce() {
  var nonce = (new Date()).getTime();(12);
  return nonce;
}
