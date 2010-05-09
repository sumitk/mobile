// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Crime Map',
    backgroundColor:'#fff',
    url: 'maps.js'
});
var tab1 = Titanium.UI.createTab({  
    icon:'icons/103-map.png',
    title:'Crime Map',
    window:win1
});

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Map2',
    backgroundColor:'#fff',
    url:'maps2.js'
});
var tab2 = Titanium.UI.createTab({  
    icon:'icons/74-location.png',
    title:'Map2',
    window:win2
});

//
// create controls tab and root window
//
var win3 = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#fff',
    url:'settings.js'
});
var tab3 = Titanium.UI.createTab({  
    icon:'icons/106-sliders.png',
    title:'Settings',
    window:win3
});


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);  


// open tab group
tabGroup.open();
