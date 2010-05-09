Ti.include('drupal_services.js');
//Ti.include('../json2.js');

var url = 'http://drupalcon.tut2tech.com/services/json';
var key = Ti.App.Properties.getString('key');
var domain = Ti.App.Properties.getString('domain');

if(url == '') {
  url = 'http://dataset2.6:8888/services/json';
}

//THANKS TO MATT GALLAGHER
//FOR DEMO ON HOW TO DO THIS IN OBJECTIVE-C WHICH WE PORTED BELOW 
//TO TITANIUM.
//http://cocoawithlove.com/2009/04/easy-custom-uitableview-drawing.html

var win = Titanium.UI.currentWindow;
win.backgroundImage = 'images/tableview/easycustom/gradientBackground.png';

var data = [];

var headerView = Ti.UI.createView({
	height:30
});

var headerLabel = Ti.UI.createLabel({
	top:10,
	left:20,
	width:'auto',
	height:'auto',
	text:'Books App',
	color:'white',
	shadowColor:'black',
	shadowOffset:{x:0,y:1},
	font:{fontWeight:'bold',fontSize:22}
});

var footerLabel = Ti.UI.createLabel({
	text:'CSE final year project',
	color:'white',
	width:'auto',
	height:'auto',
	textAlign:'center',
	shadowColor:'black',
	shadowOffset:{x:0,y:1},
	font:{fontWeight:'bold',fontSize:15}
});

var footerView = Ti.UI.createView({
	height:60
});

headerView.add(headerLabel);
footerView.add(footerLabel);

// custom drupal call stuff starts

var view = new Object;
view.method = 'views.get';
//view.hash = hash;
//view.domain_name = domain;
//view.domain_time_stamp = timestamp;
//view.nonce = nonce;
view.view_name = 'pages_list';

var xhr = Titanium.Network.createHTTPClient();
xhr.open("POST",url);

// sending xhr call for view
xhr.send({data: JSON.stringify(view)});

xhr.onload = function() {
  
  Ti.API.info(this.responseText);
  
  var data = JSON.parse(this.responseText);
  
  Ti.API.info(data);
  Ti.API.info(data[0]['term_data_name']);
  Ti.API.info(data[1]['term_data_name']);

// custom drupal call stuff ends

for (var c=0;c<data.length;c++)
{
	var row = Ti.UI.createTableViewRow();
	row.rightImage = 'images/tableview/easycustom/indicator.png';
	
	//row.url = 'http://dataset2.6:8888/'+data[c]['field_movie'][0]['filepath'];
	
	if (c==0)
	{
		row.backgroundImage = 'images/tableview/easycustom/topRow.png';
		row.selectedBackgroundImage = 'images/tableview/easycustom/topRowSelected.png';
	}
	else if (c < 29)
	{
		row.backgroundImage = 'images/tableview/easycustom/middleRow.png';
		row.selectedBackgroundImage = 'images/tableview/easycustom/middleRowSelected.png';
	}
	else
	{
		row.backgroundImage = 'images/tableview/easycustom/bottomRow.png';
		row.selectedBackgroundImage = 'images/tableview/easycustom/bottomRowSelected.png';
	}
	if ((c % 3) == 0)
	{
		row.leftImage = "images/tableview/easycustom/imageA.png";
	}
	else if ((c % 3) == 1)
	{
		row.leftImage = "images/tableview/easycustom/imageB.png";
	}
	else
	{
		row.leftImage = "images/tableview/easycustom/imageC.png";
	}
	
	var label = Ti.UI.createLabel({
		text: data[c]['term_data_name'],
		color: '#420404',
		shadowColor:'#FFFFE6',
		shadowOffset:{x:0,y:1},
		textAlign:'left',
		top:20,
		left:85,
		width: 'auto',
		height:'auto',
		font:{fontWeight:'bold',fontSize:18}
	});
	if (Titanium.Platform.name == 'android') {
		label.top = 10;
	}
	row.add(label);
	row.url = data[c]['term_data_description'];
	
	label.addEventListener('click',function(e)
	{
		Ti.API.info("clicked on label "+e.source);
	});

	var label2 = Ti.UI.createLabel({
		text: data[c]['term_data_name'],
		color: '#420404',
		shadowColor:'#FFFFE6',
		textAlign:'left',
		shadowOffset:{x:0,y:1},
		font:{fontWeight:'bold',fontSize:13},
		bottom:22,
		height:'auto',
		left:85,
		right:50
	});
	if (Titanium.Platform.name == 'android') {
		label2.right = 30;
	}
	row.add(label2);
	data[c]=row;
}

var tableview = Titanium.UI.createTableView({
	data:data,
	style:Titanium.UI.iPhone.TableViewStyle.PLAIN,
	backgroundColor:'transparent',
	headerView:headerView,
	footerView:footerView,
	maxRowHeight:100,
	minRowHeight:100,
	separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
});

tableview.addEventListener('click',function(e)
{ 
  Ti.API.info(e.rowData);
  if (e.rowData.url)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.url,
			title:e.rowData.title
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

win.add(tableview);

} // end of xhr.onload function