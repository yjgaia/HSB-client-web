/**
 * This simple example shows the ability of the Ext.List component.
 *
 * In this example, it uses a grouped store to show group headers in the list. It also
 * includes an indicator so you can quickly swipe through each of the groups. On top of that
 * it has a disclosure button so you can disclose more information for a list item.
 */

var rootPanel;
var commentStore;
var commentList;
var store;
var articleId;
var followBtn=false;
var unfollowBtn=false;
var postBtn=false;
var loginUser='test2';
var nowUser;
var timelineTitle='Timeline';
function getTimeLineList(userId){
	var url;
	if(userId!=null){
		url='http://hsb1.anak.kr:8080/HSB/'+userId;
		nowUser=userId;
	}else{
		url='http://hsb1.anak.kr:8080/HSB/user/timeline';
		nowUser=loginUser;
	}
	post('http://hsb1.anak.kr:8080/HSB/user/auth', {
		username: loginUser
		, password: 'test'
	}, function(data) {
		get(url, {
			secureKey: data.data.generatedSecureKey
		}, function(data) {
			store.removeAll(false);
			store.add(data.list);
		});
		 
	});
}
function showTimeLine(){
	rootPanel.getLayout().setAnimation('pop');
	nowUser=loginUser;
	getTimeLineList();
	rootPanel.down("#title").setTitle(timelineTitle);
	rootPanel.setActiveItem(0);
	rootPanel.down("#backBtn").hide();
	followBtn=false;
	rootPanel.down("#followBtn").hide();
	unfollowBtn=false;
	rootPanel.down("#unfollowBtn").hide();
	postBtn=true;
	rootPanel.down("#postBtn").show();
}
function showUserHome(userId){
	rootPanel.getLayout().setAnimation('pop');
	getTimeLineList(userId);
	rootPanel.setActiveItem(0);
	rootPanel.down("#backBtn").hide();
	var isHost=false;// 본인인지 확인 
	if(loginUser==userId) isHost=true;
	var isFollow=true; //팔로우 관계 체크 모듈 추가 해야함 
	if(isHost){ //본인 일시 
		followBtn=false;
		rootPanel.down("#followBtn").hide();
		unfollowBtn=false;
		rootPanel.down("#unfollowBtn").hide();
		postBtn=true;
		rootPanel.down("#postBtn").show();
		
	}else{ 
		if(isFollow){ //팔로우 관계일 시 
			unfollowBtn=true;
			rootPanel.down("#unfollowBtn").show();
		}else{
			followBtn=true;
			rootPanel.down("#followBtn").show();
		}
		postBtn=false;
		rootPanel.down("#postBtn").hide();
	}
	rootPanel.down("#title").setTitle(userId);
	
}
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
        commentStore=Ext.create('Ext.data.Store', {
            //give the store some fields
            fields: ['id','content','targetArticleId','version','writeDate','writerId','writerNickname','writerUsername'],
            autoLoad: true
        });
        var formPanel = Ext.create('Ext.Panel', {
          

            items: [{
                xtype: 'fieldset',
                items: [
                    {
                    	itemId:'commentContent',
                        xtype: 'textfield',
                        name : 'content',
                        label: '댓글'
                    }
                ]
            }]
        });
        commentList=Ext.create("Ext.dataview.List",{
        	width:320,
        	height:200,
        	itemId:'commentList',
           	itemTpl: [
                        '<div><b>{writerNickname}</b> ',
                         '{content}</div>'
               ],
               store:commentStore,
               style : "background-color :yellow;"
        });
        var contentPanel = Ext.create("Ext.Panel",{
        	layout:'vbox',
        	items:[{
            	xtype:'panel',
           	 itemId: 'postPreview',
           	tpl:[
           	     '<div><a href="javascript:showUserHome(\'{writerUsername}\')"><b>{writerNickname}</b></a><br/>{content}</div>'
           	]
        	},commentList,formPanel,{xtype:'button',text:'등록',listeners:[{
                fn: function(button, e, options) {
                	var content=formPanel.down("#commentContent").getValue();
                	post('http://hsb1.anak.kr:8080/HSB/user/auth', {
            			username: loginUser
            			, password: 'test'
            		}, function(data) {
            			post('http://hsb1.anak.kr:8080/HSB/article/'+articleId+'/comment', {
            				secureKey: data.data.generatedSecureKey,
            				content:content
            			}, function(data) {
            				commentStore.add(data.data);
            				formPanel.down("#commentContent").setValue("");
            			});
            			 
            		});
                },
                event: 'tap'
            }]}]
        });
        var postPanel=Ext.create("Ext.Panel",{
        	items:[{
        		itemId:'postContent',
                xtype: 'textareafield',
                maxRows: 4,
                placeHolder:'무슨 생각을 하고 계시나요?'
            },{
            	xtype:'button',
            	text:'Post',
            	listeners:[{
            		fn:function(button,e,options){
            			var content=postPanel.down('#postContent').getValue();
            			post('http://hsb1.anak.kr:8080/HSB/user/auth', {
                			username: loginUser
                			, password: 'test'
                		}, function(data) {
                			post('http://hsb1.anak.kr:8080/HSB/'+loginUser, {
                				secureKey: data.data.generatedSecureKey,
                				content:content
                			}, function(data) {
                				rootPanel.setActiveItem(0);
                                rootPanel.down("#postBtn").show();
                                rootPanel.down("#backBtn").hide();
                                getTimeLineList();
                			});
                			 
                		});
            		},
            		event:'tap'
            	}]
            }]
        });
        rootPanel = Ext.create("Ext.Panel",{
        	layout:"card",
        	items:[ {
                xtype: 'toolbar',
                docked: 'top',
                title: timelineTitle,
                itemId: 'title',
                items: [
                    {
                        xtype: 'button',
                        hidden: true,
                        itemId: 'backBtn',
                        ui: 'back',
                        text: 'Back',
                        listeners:[{
                            fn: function(button, e, options) {
                            	rootPanel.getLayout().setAnimation({type: "slide", direction: "right"});
                                button.hide();	
                                rootPanel.setActiveItem(0);
                                if(followBtn){
                                	rootPanel.down("#followBtn").show();
                                }
                                if(unfollowBtn){
                                	rootPanel.down("#unfollowBtn").show();
                                }
                                if(postBtn){
                                	rootPanel.down("#postBtn").show();
                                }
                                rootPanel.down("#postList").deselectAll();
                            },
                            event: 'tap'
                        }]
                    },{
                    	xtype:'button',
                    	itemId:'postBtn',
                    	ui:'action',
                    	text: 'Write',
                    	listeners:[{
                    		fn: function(button,e,options){
                    			rootPanel.getLayout().setAnimation({type: "slide", direction: "left"});
                    			button.hide();
                    			rootPanel.down("#backBtn").show();
                    			rootPanel.setActiveItem(2);
                    		},
                    		event:'tap'
                    	}]
                    },{
                		xtype:'button',
                		itemId:'followBtn',
                		ui:'action',
                		hidden:true,
                		text:'Follow',
                		listeners:[{
                			fn:function(button,e,options){
                				post('http://hsb1.anak.kr:8080/HSB/user/auth', {
                					username: loginUser
                					, password: 'test'
                				}, function(data) {
                					post('http://hsb1.anak.kr:8080/HSB/'+nowUser+'/follow', {
                						secureKey: data.data.generatedSecureKey
                					}, function(data) {
                						console.log(data);
                						alert(nowUser+'님을 팔로우합니다.');
                						showTimeLine();
                					});
                					 
                				});
                			},event:'tap'
                		}]
                	},{
                		xtype:'button',
                		itemId:'unfollowBtn',
                		ui:'action',
                		hidden:true,
                		text:'unFollow',
                		listeners:[{
                			fn:function(button,e,options){
                				post('http://hsb1.anak.kr:8080/HSB/user/auth', {
                					username: loginUser
                					, password: 'test'
                				}, function(data) {
                					del('http://hsb1.anak.kr:8080/HSB/'+nowUser+'/follow', {
                						secureKey: data.data.generatedSecureKey
                					}, function(data) {
                						console.log(data);
                						alert(nowUser+'님을 언팔로우합니다.');
                						showTimeLine();
                					});
                					 
                				});
                			},event:'tap'
                		}]
                	}
                ]
            },listConfiguration,contentPanel,postPanel]
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
        store = Ext.create('Ext.data.Store', {
            //give the store some fields
            fields: ['content','writerId', 'writerUsername','writerNickname','writeDate','commentCount','id','version'],
        });
        
        getTimeLineList();
        postBtn=true;
       
        
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
                	rootPanel.getLayout().setAnimation({type: "slide", direction: "left"});
                	rootPanel.setActiveItem(1);
                	rootPanel.down("#backBtn").show();
                	rootPanel.down("#postBtn").hide();
                	rootPanel.down("#postPreview").setData(record.data);
                	articleId= record.data.id;
                	commentStore.removeAll(false);
                	//댓글 가져오기
                	get('http://hsb1.anak.kr:8080/HSB/article/'+articleId+'/comments', {
        			}, function(data) {
        				console.log(data.list);
        				commentStore.add(data.list);
        			});
                	
                },
                event: 'itemtap'
            }]
        };
    }
});
