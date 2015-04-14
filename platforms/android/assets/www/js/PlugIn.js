// JavaScript Document
//Create a plug in page based on the id of the hotel and the template passed in the constructor


function PlugIn(p_id, title, tmpl,menu,db)
{
		this.parent_id = p_id; //The id of the Hotel
		this.template = tmpl; //The type of the tplugin
		this.$page_div ; //The page containing the plugin
		this.menu = menu;
		
		this.db = db;
		
		this.created = false; //If the plugin has been created do no read DB again
		
		this.context;
		
		this.initialize =function()
		{
		
			this.createPage();
			 this.setContext();
			
			//this.render();
		
		}
		
		this.setContext=function()
		{
			//Get context based on the template and the id of the hotel
			var self =this;
			console.log("INITIALIZE PLUG IN : "+this.template+'_'+self.parent_id);
			
			
			
			var context;
			
			if(this.template == 'contact_tmpl')
			{
				var id = this.template+'_'+self.parent_id;
				self.db.get(id).then(function (doc) {
					
					context={
					address:doc.address,
					phones:doc.phones,
					email:doc.email,
					hours:doc.hours,
					map:doc.map
					//[{longtitude:234},{lattitude:123.23}]
					
					}
					
					self.context =context;
					
					self.render();
					
				}).catch(function (err) {});
				
				
			}
			
			if(this.template == 'breakfast_tmpl')
			{
				
			}
			if(this.template == 'weather_tmpl')
			{
				
				var id = this.template+'_'+self.parent_id;
				self.db.get(id).then(function (doc) {
					
					context={
						
							weather_date:doc.weather_date,
							weather_region:doc.weather_region,
							weather_degrees:doc.weather_degrees,
							weather_icon:doc.weather_icon,
							weather_description:doc.weather_description
					}
					
					self.context =context;
					
					self.render();
					
				}).catch(function (err) {});
				
				
			}
			
			if(this.template == 'report_tmpl')
			{
				
			}
			
			if(this.template == 'favourites_tmpl')
			{
				
			}
			
			if(this.template == 'bookmarks_tmpl')
			{
				
				console.log("Bookmarks Template");
			/*	context={Bookmark:[
					
					{
					title:"Agia Napa",
					id:11
					},
					{
					title:"Panagia Kanala",
					id:12
					}
				]}*/
				
				
				var Bookmarks_arr=[];

				self.db.allDocs({
				  include_docs: true, 
				  attachments: true,
				  startkey: 'bookmark_'+self.parent_id ,
				  endkey: 'bookmark_'+self.parent_id+'\uffff'
				}).then(function(result) {
					
					
					console.log("Bookmarks list result");
					result.rows.forEach(function(row) {
					
						var obj={
								title:row.doc.title,
							    id:row.doc.leaf_id
							}
						Bookmarks_arr.push(obj);
					
					});
					
					
					
					context={Bookmark:Bookmarks_arr};
					
					self.context =context;
					console.log(JSON.stringify(self.context));
					self.render();
					
				  // handle result
				}).catch(function (err) {
				  console.log(err);
				});


			
				
				
			}
			
			//return context;
			
		}
		
		this.render=function()
		{
				console.log("Rendering Plugin Start");
				var template = Handlebars.compile($("#"+this.template).html());
				var html = template(this.context);
				this.$page_div.find(".ui-content").html(html);
				
				console.log("Rendering Plugin End");
		}
		
		this.createPage = function()
		{
			// if page exists assign it to $page_div
			// use this.tmpl + parent id to ensure that plug in is crated only once
			if($("#plugin_"+this.tmpl+'_'+this.id).length > 0)
			{
				console.log("plugin in DOM");
				this.$page_div = $("#plugin_"+this.tmpl+'_'+this.id);		
			}else
			{
				console.log("inserting plugin in DOM");
				//create new jquery mobile page based on the template and assign it to $page_div
				this.$page_div = $('<div/>');
				this.$page_div.attr('data-role','page');
				this.$page_div.attr('data-url','one_appy_hotel_plugin');
				this.$page_div.attr('id',"#plugin_"+this.template+'_'+this.parent_id);
				this.$page_div.appendTo('body');
			}
			
			
			
			var template = Handlebars.compile($("#page_template").html());
			var context={title:this.title };
			var html = template(context);
			this.$page_div.html(html);
			
				//render menus
			this.$page_div.find(".menu_plugins").html(this.menu.renderPlugIns());
			this.$page_div.find(".menu_topItems").html(this.menu.renderTopItems());
			
			
			console.log("create plug in page");
			//Go to page
			
			
		}
		
		
		this.initialize();
}