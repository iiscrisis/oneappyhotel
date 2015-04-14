// JavaScript Document

function HotelLeaf(hotel_title,hotel_id,hotel_menu,p_id,Memory)
{
	this.title = hotel_title;
	this.id= hotel_id;
	this.menu = hotel_menu;
	this.page_id;
	this.$page_div;
	this.parent_id = p_id;
	
	this.bookmark;
	
	this.Memory = Memory;
	
	//main data of category
	this.main_data ;
	this.branches ;
	this.logo ;
	this.description ;
	this.backgroundType;
	this.background ;
	
	this.initialize=function()
	{
		console.log("initialize HotelLeaf for "+this.title);
		
		this.createPage();
		
		this.setContext();
		
		//this.render();
		
			
	}
	
	this.render=function()
	{
		console.log("Rendering Start");
		console.log(JSON.stringify(this.main_data));
		
		var template = Handlebars.compile($("#hotel_leaf_page").html());
		var html = template(this.main_data);
		this.$page_div.find(".ui-content").html(html);
		
		console.log("Rendering End");
	}
	
	
	//Populate with the main data of the category
	this.createMainData=function()
	{
		
		
		
//		template
	}
	
	//get main context	
	this.setContext=function()
	{
		var self = this;
		console.log("Reading Context Leaf");
		//use this.id to retrieve context as JSON of the  Page
		this.Memory.db.get(this.id).then(function (doc) {
			
			var bookchecked = '';
			if(doc.bookmark == 'true')
			{
					bookchecked = 'checked';
			}
			
			self.main_data = {Data:
				[{
					title:doc.title,
					logo:doc.logo,
					description:doc.description,
					backgroundType:doc.backgroundType,
					background:doc.background,
					subcategories : doc.subcategories,
					parent_id:self.parent_id,
					leaf_id:self.id,
					bookmark:bookchecked
					
				}]};	
			
			console.log("Got data");
			
			self.logo = doc.title;
			self.description = doc.description;
			self.backgroundType = doc.backgroundType;
			self.background =  doc.background ;	
			self.bookmark = bookchecked;
			
			console.log("Got data - Bookmark "+self.bookmark);
		  // handle doc
		  
		  self.render();
		  
		}).catch(function (err) {
		  console.log(err);
		});
		
		
		
		
		
		console.log("got Context");
	//	return context;
	}
	
	//get subcategories (branches )
	
	this.getBranches=function()
	{
		
			//based on this.id
			var subcategories=
			[
				{
					title:"Agia Napa",
					id:11
				},
				{
					title:"Panagia Kanala",
					id:12
				},				
				{
					title:"Toy Skylou",
					id:13
				}
			]
			console.log("got Branches");
			return subcategories;
	},
	
	
	this.createPage = function()
	{
		// if page exists assign it to $page_div
		if($("#leaf"+this.id).length > 0)
		{
			this.$page_div = $("#leaf"+this.id);		
		}else
		{
			//create new jquery mobile page based on the template and assign it to $page_div
			this.$page_div = $('<div/>');
			this.$page_div.attr('data-role','page');
			this.$page_div.attr('data-url','leaf_'+this.id);
			this.$page_div.attr('id','leaf_'+this.id);
			this.$page_div.addClass("LeafPage");
			this.$page_div.appendTo('body');
			
			
		}
		
		
		
		var template = Handlebars.compile($("#page_template").html());
		var context={title:this.title };
		var html = template(context);
		this.$page_div.html(html);
		
		this.$page_div.find(".collapsible_menu").attr('id','leaf_'+this.id+'collapsible');
		
			//render menus
		this.$page_div.find(".menu_plugins").html(this.menu.renderPlugIns());
		this.$page_div.find(".menu_topItems").html(this.menu.renderTopItems());
		
		
		console.log("create page");
		//Go to page
		
		
	},
	
	
	//Delete the Div containing the 
	this.deletePage = function()
	{
		if($("#leaf"+this.id).length > 0)
		{
			$("#leaf"+this.id).remove(this);
		}
	},
		
	
	
	this.initialize();
}
