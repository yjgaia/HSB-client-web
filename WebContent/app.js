/**
 * This simple example shows the ability of the Ext.List component.
 *
 * In this example, it uses a grouped store to show group headers in the list. It also
 * includes an indicator so you can quickly swipe through each of the groups. On top of that
 * it has a disclosure button so you can disclose more information for a list item.
 */

//define the application
Ext.application({
    //define the startupscreens for tablet and phone, as well as the icon
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    glossOnIcon: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@114.png'
    },

    //require any components/classes what we will use in our example
    requires: [
        'Ext.data.Store',
        'Ext.List',
        'Ext.plugin.PullRefresh'
    ],

    /**
     * The launch method is called when the browser is ready, and the application can launch.
     *
     * Inside our launch method we create the list and show in in the viewport. We get the lists configuration
     * using the getListConfiguration method which we defined below.
     *
     * If the user is not on a phone, we wrap the list inside a panel which is centered on the page.
     */
    launch: function() {
        //get the configuration for the list
        var listConfiguration = this.getListConfiguration();
        var rootPanel = Ext.create("Ext.Panel",{
        	layout:"card",
        	items:[listConfiguration,{
                xtype: 'panel',
                itemId: 'postPreview',
                tpl: [
                    '<div style="float: left; width: 60px;"><img src="{profile_image_url}" /></div><div style="position: relative; margin-left: 64px;">',
                    '     {name}',
                    '     <br />',
                    '     <div style="color: gray; font-size: 80%;">',
                    '{description}</div>',
                    '</div>',
                    '',
                    '<div style="clear: both; margin-top: 6px; bacground-color: white; padding: 6px; border-radius: 10px;">',
                    '  {text}',
                    '  <br />',
                    '  <div style="color: gray; font-size: 80%; padding-top: 6px;">Posted: {created_at:date("d M Y h:m")}</div>',
                    '</div>'
                ],
                scrollable: true
            }]
        });

        //if the device is not a phone, we want to create a centered panel and put the list
        //into that
        if (!Ext.os.is.Phone) {
            //use Ext.Viewport.add to add a new component into the viewport
            Ext.Viewport.add({
                //give it an xtype of panel
                xtype: 'panel',

                //give it a fixed witdh and height
                width: '100%',
                height: '100%',

                //make it centered
                centered: true,

                //make the component modal so there is a mask around the panel
                modal: true,

                //set hideOnMaskTap to false so the panel does not hide when you tap on the mask
                hideOnMaskTap: false,

                //give it a layout of fit so the list stretches to the size of this panel
                layout: 'fit',

                //insert the listConfiguration as an item into this panel
                items: [rootPanel]
            });
        } else {
            //if we are a phone, simply add the list as an item to the viewport
            Ext.Viewport.add(rootPanel);
        }
    },
 

    /**
     * Returns a configuration object to be used when adding the list to the viewport.
     */
  
    getListConfiguration: function() {
        //create a store instance
        var store = Ext.create('Ext.data.Store', {
            //give the store some fields
            fields: ['content','writerId', 'writerUsername','writerNickname','writeDate','commentCount','id','version'],
        });
        
        post('http://hsb1.anak.kr:8080/HSB/user/auth', {
			username: 'test2'
			, password: 'test'
		}, function(data) {
			get('http://hsb1.anak.kr:8080/HSB/user/timeline', {
				secureKey: data.data.generatedSecureKey
			}, function(data) {
				store.add(data.list);
			});
			 
		});
        
       
        
        return {
            //give it an xtype of list for the list component
            xtype: 'list',
            itemId:'postList',

            //set the itemtpl to show the fields for the store
            itemTpl: [
                      '<div><b>{writerNickname}</b><br/>',
                      '{content} ',
                      '{writeDate}</div>',
                      '<div style="text-align:right">댓글 {commentCount}개</div>'
                      ],

            //bind the store to this list
            store: store,
            listeners:[{
                fn: function(dataview, index, target, record, e, options){
                	alert(record.content);
                },
                event: 'itemtap'
            }]
        };
    }
});
