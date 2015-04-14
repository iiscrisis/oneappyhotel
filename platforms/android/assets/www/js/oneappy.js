// JavaScript Document
//Create Binder for page change so as to create pages dynamicaly


	
document.addEventListener("deviceready", function(){
	
		if (navigator.notification) {
            navigator.notification.alert("Device Ready", null, title, 'OK');
        } else {
            //alert("DEvice Ready ii");
        }
	
	}, false);

	
	
$(document).ready(function(){
	
	//init homeview on click event
	
	$(document).on('click','.root_btn',function()
	{
			$(".front_details").addClass("hidden");
		
			$(this).siblings(".front_details").removeClass("hidden");
	});
	
	$(document).on('click','.close_root',function()
	{
			$(".front_details").addClass("hidden");
		
			
	});
	
	
	//install Root Event
	$(document).on('click','#scan_qr_btn',function()
	{
		//app.sendMessage("QRClick");
		
		console.log("a");
		/*
			cordova.plugins.barcodeScanner.scan(
    		function (result) {
				alert("We got a barcode\n" +
				  "Result: " + result.text + "\n" +
				  "Format: " + result.format + "\n" +
				  "Cancelled: " + result.cancelled);
				},
				function (error) {
					app.sendMessage("Scanning failed: " + error);
				}
			);	
		*/
		
		var result={text:'hotel'};
		result.text = 'hotel1';
		
		install_root(result.text);
	});
	
	function install_root(id)
	{
			var host = 'http://localhost/oneappyhotel/public_html/installation.php';
			method='post';
			
		 $.ajax({
		  type: "POST",
		
		  url: host, //Relative or absolute path to response.php file
		 
		  success: function(data) {
			 ret =  jQuery.parseJSON(data);
			console.log(ret['hotel_title']);
			
			 install_root_db(ret);
			//alert("Form submitted successfully.\nReturned json: " + data["json"]);
		  },
		  error:function(err)
		  {
			  console.log("Error "+err);
			}
		});
			
	}
	
	function install_root_db(data)
	{
		var self = this;
		
		
		app.HotelDb.db.bulkDocs(
			data['items']
		).then(function (result) {
			console.log("Hotel Created");
			app.homeview.initialize();
		}).catch(function (err) {
		  console.log(err);
		});
		
		/*app.HotelDb.db.get(data['_id']).then(function()
		{
			console.log("Root exists");	
		}).catch(function (err) {
			
			//If id	does not exsist add to DB
				console.log("Root does not exist");	
				app.HotelDb.db.put(data).then(function(){
					
					//Then initialize homeview again
					app.homeview.initialize();
					$("#install_data").addClass("hidden");
					$("#delete_data").removeClass("hidden");
			
				
				});
			
			
		});*/
	}
	
	
	//Check when bookmark check box has changed
	$(document).on('change','.bookmark_plugin',function(e)
	{
		
		
		if($(this).prop( "checked" ))
		{
			console.log("Bookmark checked adding to bookmarks");
			app.current_hotel.addToBookmarks($(this).val())	;
		}else
		{
			console.log("Bookmark unchecked removing to bookmarks");
			app.current_hotel.deleteFromBookmarks($(this).val())	;
				
		}
	});
	
	
	$(document).on('click','.delete_bookmark',function(e)
	{
		e.preventDefault();
		var id = $(this).data('leaf_id');	
		app.current_hotel.deleteFromBookmarks(id,true);
		
	});
	
	
	// On click Push notes button
	$(document).on('click','.push_notes_btn',function(e)
	{
		
		app.current_hotel.showNotifications();
		
	});
	
	$("#install_data").find("a").click(function(e)
	{
			e.preventDefault();
			app.HotelDb.populateDb();
			app.homeview.initialize();
			$("#install_data").addClass("hidden");
			$("#delete_data").removeClass("hidden");
		
	});
	
	$("#delete_data").find("a").click(function(e)
	{
			e.preventDefault();
		
			app.HotelDb.deleteDb();
			app.homeview.initialize();
			
			$("#delete_data").addClass("hidden");
			$("#install_data").removeClass("hidden");
		
	});
	
	//Bind before change - Create page
	$(document).bind("pagebeforechange", function(e,data)
	{//alert("a");
			
			if(!$("#main_menu_collapse").find('.ui-collapsible-heading').hasClass('ui-collapsible-heading-collapsed'))
			{
				$("#main_menu_collapse").find('.ui-collapsible-heading').trigger('click');
			}
			
			//Take care of bindings so as to direct to the correct page
			if ( typeof data.toPage === "string" ) {

				// We are being asked to load a page by URL, but we only
				// want to handle URLs that request the data for a specific
				// category.
				var u = $.mobile.path.parseUrl( data.toPage );
			
				create = /^#createHotel/;
				viewplugin = /^#plugin/;
				viewsub = /^#hotelItem/;
				viewmain = /^#oneappy_hotel_main/;
				
				
				//console.log(u.search);
		
				if ( u.hash.search(create) !== -1 ) {
		
					// We're being asked to display the items for a specific category.
					// Call our internal method that builds the content for the category
					// on the fly based on our in-memory category data structure.
					app.create_hotel( u, data.options );
					 
					// alert(u);
					// create_hotel();
					 
					// Make sure to tell changePage() we've handled this call so it doesn't
					// have to do anything.
					e.preventDefault();
				}else if ( u.hash.search(viewsub) !== -1 ) {
		
		
					if(app.current_hotel.current_view !='')
					{
						console.log("Current view = "+app.current_hotel.current_view.$page_div.find('.collapsible_menu').attr('id'));
						$("#leaf_"+app.current_hotel.current_view.id).find('.ui-collapsible-heading').trigger('click');
					}else
					{
						console.log("Current view is empty");
					}
		
					// We're being asked to display the items for a specific category.
					// Call our internal method that builds the content for the category
					// on the fly based on our in-memory category data structure.
				 	app.current_hotel.create_subcat(u, data.options );
					 
					// alert(u);
					// create_hotel();
					 
					// Make sure to tell changePage() we've handled this call so it doesn't
					// have to do anything.
					e.preventDefault();
				}else if ( u.hash.search(viewplugin) !== -1 ) {
		
		
					//Close Menu
					
					
					if(app.current_hotel.current_view !='')
					{
						
						var pl_id = '#plugin_'+app.current_hotel.current_view.template+'_'+app.current_hotel.current_view.parent_id;
						$(pl_id).find('.ui-collapsible-heading').trigger('click');
					}
					
					// We're being asked to display the items for a specific category.
					// Call our internal method that builds the content for the category
					// on the fly based on our in-memory category data structure.
				 	app.current_hotel.create_plugin(u, data.options );
					 
					// alert(u);
					// create_hotel();
					 
					// Make sure to tell changePage() we've handled this call so it doesn't
					// have to do anything.
					e.preventDefault();
				}else if(u.hash.search(viewmain) !== -1)
				{
					/*if(app.current_hotel.current_view !='')
					{
						$("#"+app.current_hotel.current_view.$page_div.find(".collapsible_menu").attr('id')).trigger('collapse');
					}*/
						app.gotoRootMain();
						
						e.preventDefault();
				}
				
				
			if($(".collapsible_menu").length > 0)
			{
				console.log("collapse");
				$(".collapsible_menu").trigger('collapse');		
			}
			
				
				
			}
		
			
	});
	
});


function getUrlVars(u)
{
		
		var pos = u.indexOf("?");
		var values = u.substr(pos+1,u.length);
		console.log("params = "+values);
		
		var pars = values.split('&');
		var arr=[]
		
		for(i=0;i<pars.length;i++)
		{
			var tmp = pars[i].split(':');
			arr[tmp[0]]=tmp[1];	
		}
		
		return arr;
		
}



app={
		current_hotel:"",
		occupied_ids:[],
		
		homeview:'',
		//Memory Object oneAppyMemory
		HotelDb:'',
		
		initialize:function(populate)
		{
			//Create HomeView object
			this.HotelDb =this.getDb();
			
			
			this.HotelDb.populateDb();
			
			
			console.log("1");
			this.homeview = new HomeView(this.HotelDb);
			if($(".single_front_item").length > 0)
			{
				console.log("Single Hotel");
				console.log("2");
			}else
			{
				console.log("3");
					$("#install_data").removeClass("hidden");
			}
			
			//this.HotelDb.deleteDb();
			//$("#hotels_list").html(homeview.render().el);
			
			
		},



		setCurrentHotel:function(hotel)
		{
			this.current_hotel = hotel;	
		},
		
		
		create_hotel:function(u, options)
		{
		//alert("1");
			//this.occupied_ids.push(1);
			this.clearLeafs();
			
			
			var hotel = new Hotel(u,"#one_appy_hotel_main",this.HotelDb);
			hotel.render();	
			
			this.setCurrentHotel(hotel);
			
			var $page = $("#one_appy_hotel_main");
			$page.page();
			$.mobile.changePage( $page, options );
			
		},
		
		gotoRootMain:function()
		{
			var $page = $("#one_appy_hotel_main");
			$page.page();
			$.mobile.changePage( $page, options );
		},
		
		
		getDb:function()
		{
			var db = new oneAppyMemory('oneappyhotel');
			return 	db;
		},
		
		
		//Delete Pages from previously viewed Hotels
		clearLeafs:function()
		{
			console.log("clearing Pages");
			$(".LeafPage").remove();
		},
		
		sendMessage:function(str)
		{
			if (navigator.notification) {
          	  navigator.notification.alert(str);
			} else {
				//alert("DEvice Ready ii");
			}
		}
	
		
		
};

function createHomeView(app)
{
		
}

app.initialize(true);

