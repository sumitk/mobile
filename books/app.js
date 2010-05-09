// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Books',
    backgroundColor:'#fff',
    url: 'books.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'images/icons/96-book.png',
    title:'Books',
    window:win1
});


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#fff',
    url: 'settings.js'
});
var tab2 = Titanium.UI.createTab({  
    icon:'images/icons/106-sliders.png',
    title:'Settings',
    window:win2
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
