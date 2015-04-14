// JavaScript Document


function Hotel(u,page_id,hotelDb){
	
	this.id ; //Id to use in DB
	this.hash_url = u;
	this.menu; //Menu Object
	this.subCategories=[]; //List of Leaf categories  no matter how deep in the tree
	this.menuPlugins=[];
	this.menuTopItems=[];
	this.plugIns=[];
	
	//Current leaf viewed
	this.current_view='';
	//Memory
	this.Memory = hotelDb;
	
	this.logo ; //Path to Logo
	this.description; //Initial Description
	this.backgroundType; //Type of Background default fullBackgroundImage, future options gradient, flatcolor, pattern
	this.background; //The data fopr the background, if type is fullBackgroundImage or pattern this is path to image, if gradient the string to cretae the gradient in css, if flat color the HEX of the color.
	this.hotel_data;
	
	this.page_id = page_id;
	
	//Initialize Hotel
	this.initialize=function(id){
	
		
		var vars = getUrlVars(this.hash_url.hash);
		this.id = vars['id'];
		
		//Get initial Data
		this.setContext();
		
		/*
		this.logo = this.hotel_data.logo;
		this.description = this.hotel_data.description;
		this.backgroundType = this.hotel_data.backgroundType;
		this.background =  this.hotel_data.background ;
		*/
		
		
		
		
		
	}
	
	//Render the data of the hotel including the meni and plug ins
	
	this.render=function()
	{
		var self = this;	
	
		var template = Handlebars.compile($("#hotel_first_page").html());
		var html  = template(self.hotel_data);	
		console.log("rendering Hotel");
		var $page = $(page_id);
		$page.find(".ui-content").html(html);
		
		//render menus
		self.menu = new HotelMenu(self.getMenuPlugins(), self.getMenuTopItems());
		
		$page.find(".menu_plugins").html(self.menu.renderPlugIns());
		$page.find(".menu_topItems").html(self.menu.renderTopItems());
		
		
		
	}
	
	this.setContext=function()
	{
		var self = this;
		
		
		this.Memory.db.get(this.id, function(err, doc) {
		  if (err) { return console.log(err); }
		  // handle doc
		  
		  console.log("Hotel Data"+JSON.stringify(doc));
		  
		 	 self.hotel_data ={
				logo:doc.logo,
				description:doc.description,
				backgroundType:doc.backgroundType,
				background:doc.background
			}
					
			self.logo = doc.logo;
			self.description = doc.description;
			self.backgroundType = doc.backgroundType;
			self.background = doc.background ;
		    self.menuPlugins = doc.plugIns;
		    self.menuTopItems = doc.MenuTopItems;
			
			self.render();
			
			self.receivePushNotification();
		  
		});


		
		//use this.id to retrieve context as JSON of tyhe first Hotel Page
	
		//return context;
	}
	
	
	//Retrieve which menu items should be displayed
	this.getMenuPlugins=function()
	{
		
		
			console.log("returning plugins for "+this.id);
			return this.menuPlugins;
	}
	
	
	//Retrieve which menu items should be displayed
	this.getMenuTopItems=function()
	{
		
		
			console.log("returning MenuTopItems for "+this.id);
			return this.menuTopItems;
	},
	
	
	//Create the Leaf of the Hotel
	this.create_subcat= function(u, options)
	{
		console.log("creating Subcat");
		console.log(u.href);
		var vars = getUrlVars(u.hash);
		
		
		// 2 is the id retrieved for the db
		var id = vars['id'];
		var title=vars['title'];
		
		var hotelLeaf = this.checkIfLeafExists(id);
		//Check if leaf returns boolean meaning false create object
		if(typeof hotelLeaf === 'boolean')
		{
			hotelLeaf = new HotelLeaf(title,id,this.menu,this.id,this.Memory);
			
			//push hotel to subCategories so as to keep track
			this.subCategories.push(hotelLeaf);
		}
		//else use the object return ed
		this.current_view = hotelLeaf;
		
		
		
		var $page = hotelLeaf.$page_div;
		$page.page();
		$.mobile.changePage( $page, options );
		
			
	}
	
	this.checkIfLeafExists = function(id)
	{
			var hotelLeaf = false;
			for(i=0;i<this.subCategories.length;i++)
			{
				if(	this.subCategories[i].id == id)
				{
					hotelLeaf = this.subCategories[i];
					console.log("Leaf Found");
				}
			}
			
			return hotelLeaf;
	}
	
	
	//create plug in based on the type of the plugin
	this.create_plugin = function(u,options)
	{
		console.log("creating Plugin");
		console.log(u.href);
		var vars = getUrlVars(u.hash);
		
		var tmpl = vars['template'];
		var title=vars['title'];
		
		
		
		
		var plugIn = this.checkIfPluginExists(tmpl);
		//Check if leaf returns boolean meaning false create object
		if(typeof plugIn === 'boolean')
		{
			plugIn = new PlugIn(this.id,title,tmpl,this.menu,this.Memory.db);
			
			//push hotel to subCategories so as to keep track
			this.plugIns[tmpl]=(plugIn);
		}else
		{
				//Since plug ins alter the DB on the client side reread context
				plugIn.setContext();
		}
		
		//Set plug in page to be as current view
		this.current_view = plugIn;
		
		var $page = plugIn.$page_div;
		$page.page();
		$.mobile.changePage( $page, options );
		
	}
	
	//Go through the plug ins and check if it is already created. If true return the Object otherwise return false
	
	this.checkIfPluginExists=function(tmpl){
		
			var plugin = false;
			for(i=0;i<this.plugIns.length;i++)
			{
				if(	this.plugIns[i].template == tmpl)
				{
					plugin = this.plugIns[i];
					console.log("plugin Found");
				}
			}
			
			return plugin;
	}
	
	
	
	//Add a leaf to bookmarks list
	this.addToBookmarks = function(leafid)
	{
		
		console.log("Adding to Bookmarks");
		var self = this;
		var root_id = this.id; //Get hotels id
		
		var put_id = 'bookmark_'+root_id+'_'+leafid;
		var booktitle='';
		
		
		
		this.Memory.db.get(leafid).then(function(doc1){
			
			//Get title and set leafs bookmark to 1
			
			console.log("Processing 1");
			
			booktitle = doc1.title;
			doc1.bookmark = 'true';
			//Uodate leaf Db entry set bookmark to true
			 self.Memory.db.put(
			 	
				doc1
			 
			 ).catch(function (err) {});
			
				//Update or Create Bookmark entries
			
				self.Memory.db.get(put_id).then(function(doc){
				
				console.log("Processing 2");
					
				  self.Memory.db.put({
							
							_id: put_id,
							_rev: doc._rev,
							type:"bookmark",
							title:booktitle,
							leaf_id:leafid
						
						});
					}).catch(function (err) {
					
					  if (err.status === 404) { // not found!
			  			console.log("Processing 3");
					  self.Memory.db.put({
							
							_id: put_id,
							//_rev: doc._rev,
							type:"bookmark",
							title:booktitle,
							leaf_id:leafid
						
						});
		  		 	}
				});
				
				
			
			
		}).catch(function (err) {
		
		});
		
	}
	
	//Remove a leaf from bookmarks list, if reset_view = true then refresh Bookmarks to reflect the changes
	this.deleteFromBookmarks = function(leafid,reset_view)
	{
		
		console.log("Deleting Bookmark");
		var self = this;
		var root_id = this.id; //Get hotels id
		
		var put_id = 'bookmark_'+root_id+'_'+leafid;
		var booktitle='';
		
		
		
		this.Memory.db.get(leafid).then(function(doc1){
			
			//Get title and set leafs bookmark to 1
			
			console.log("Processing 1");
			
			booktitle = doc1.title;
			doc1.bookmark = 'false';
			//Uodate leaf Db entry set bookmark to true
			 self.Memory.db.put(
			 	
				doc1
			 
			 ).then(function(response){
			
				console.log("Deleting Bookmark "+put_id);
				self.Memory.db.get(put_id).then(function(doc)
				{
					self.Memory.db.remove(doc).then(function(doc){
						console.log(" Bookmark Deleted"+put_id);
						
						self.plugIns['bookmarks_tmpl'].setContext();
						
						//Update Dom to reflect Bookmark change
						if($("#leaf_"+leafid).length > 0)
						{
							console.log("UNCHECKING :#leaf_"+leafid);
							$("#leaf_"+leafid).find(".bookmark_plugin").attr('checked', false);
						}
						
						}).catch(function (err) {});
				});
				 
			}).catch(function (err) {});
			
			
		
		});
		
	}
	
	
	
	//Receive Notifications from Server
	this.receivePushNotification = function()
	{
		
		var self = this;
		var host = 'http://localhost/oneappyhotel/public_html/notifications.php';
		method='post';
			
		 $.ajax({
		  type: "POST",
		
		  url: host, //Relative or absolute path to response.php file
		 
		  success: function(data) {
			 ret =  jQuery.parseJSON(data);
			
			
			 self.addPushNotifications(ret['items']);
			//alert("Form submitted successfully.\nReturned json: " + data["json"]);
		  },
		  error:function(err)
		  {
			  console.log("Error "+err);
			}
		});
		
	}
	
	this.addPushNotifications = function(notes)
	{
		console.log("Adding Notes");
		var counter = 0;
		var self = this;
		
		for(i = 0; i< notes.length ; i++)
		{
			console.log(notes[i]['title']);
			
			self.Memory.db.put(notes[i]).then(function(){
					counter++;
			});
			  
			
		}
			
	}
	
	this.showNotifications = function(){
	
		var self = this;
		
		self.Memory.db.query('doc_type', {
					key: 'pushNote', 
					include_docs: true,
					attachments: true
				  }).then(function (result) {
					
					console.log("returning rows");
					
					//var hoteldata=[];
					
						result.rows.forEach(function(row) {
					  		if(row.doc.root_id==self.id){
								console.log("result : "+row.doc.title);
							}
						});
						
						self.hoteldata.push(obj);
					
					
					});
		
		
		
	}
	
	
	
	this.initialize();
};