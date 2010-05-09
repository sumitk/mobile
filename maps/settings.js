var win = Titanium.UI.currentWindow;

var configLabel = Ti.UI.createLabel({
  text: 'Services Settings:',
  textAlign:'center',
  font:{
    fontSize:24,
    fontFamily:'Trebuchet MS'
  },
  height:'auto',
  width:'auto',
  color:'#fff',
  top:60
});

win.add(configLabel);

var keyVal = Titanium.App.Properties.getString("key");
var urlVal = Titanium.App.Properties.getString("url");
var domainVal = Titanium.App.Properties.getString("domain");

var keyField = Titanium.UI.createTextField({
	color:'#787878',
	value:keyVal,
	height:35,
	top:55,
	width:550,
	hintText:'ServicesAPI Key',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
keyField.addEventListener('return', function() {
	keyField.blur();
});
keyField.addEventListener('change', function(e) {
	keyVal = e.value;
});

win.add(keyField);

var urlField = Titanium.UI.createTextField({
	color:'#787878',
	value:urlVal,
	height:35,
	top:95,
	width:550,
	hintText:'URL Value',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
urlField.addEventListener('return', function() {
	urlField.blur();
});
urlField.addEventListener('change', function(e) {
	urlVal = e.value;
});

win.add(urlField);

// adding domain field
var domainField = Titanium.UI.createTextField({
	color:'#787878',
	value:domainVal,
	height:35,
	top:135,
	width:550,
	hintText:'Domain',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
domainField.addEventListener('return', function() {
	domainField.blur();
});
domainField.addEventListener('change', function(e) {
	domainVal = e.value;
});

win.add(domainField);

var saveButton = Titanium.UI.createButton({
  top:225,
	backgroundImage:'images/BUTT_gry_on.png',
	height:45,
	width:450,
	title: 'Save Settings'
});
win.add(saveButton);

saveButton.addEventListener("click", function(e) {
  Ti.API.info(keyVal+urlVal+domainVal);
  Titanium.App.Properties.setString("key",keyVal);
  Titanium.App.Properties.setString("url",urlVal);
  Titanium.App.Properties.setString("domain",domainVal);
  Ti.API.info('url set is:'+Ti.App.Properties.getString('url')+'key val is'+Ti.App.Properties.getString('key')+'domain val is:'+Ti.App.Properties.getString('domain'));
  showChooser();
});

win.addEventListener("click", function(e) {
  keyField.blur();
  urlField.blur();
  domainField.blur();
});
