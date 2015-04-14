// JavaScript Document

//Create the first page of the app

function HomeView(Memory){
	
		this.template; //Template object for handlenbar
		this.hoteldata=[];
		this.el=$("<div/>");
		this.Memory = Memory;

	
	
		this.initialize = function()
		{
			
			console.log("INITIALIZING HOMEVIEW");
//Get template
			this.template = Handlebars.compile($("#front_page_list").html());
			
			//Should Add a clean up of al nodes begore rerendering
			
			this.setContext();
			//console.log(this.hoteldata);
		};
		
		this.render = function()
		{
			
			console.log("rendering");
			var context = {Hotel:this.hoteldata};
			var html = this.template(context);
			this.el.html(html);
			
			//addedd as test maybe permanent
			$("#hotels_list").html(this.el);
			
			return this;
			
		};
		
		
		
		this.setContext = function()
		{
			//Read database and fill context
			
				var self = this;
				
				//Create Design Doc for Type Query
				
				console.log("1");
				this.Memory.db.query('doc_type', {
					key: 'Root', 
					include_docs: true,
					attachments: true
				  }).then(function (result) {
					
					console.log("returning rows");
					
					//var hoteldata=[];
					
					result.rows.forEach(function(row) {
					  
						console.log("result : "+row.doc.hotel_title);
						var obj={
								hotel_title:row.doc.hotel_title,
								hotel_description:row.doc.hotel_description,
								hotel_logo:row.doc.hotel_logo,
								id:row.doc._id
							}
						
						
						self.hoteldata.push(obj);
					
					
					});
					
					console.log(JSON.stringify(self.hoteldata));
					
					
					
				
					console.log("rendering");
					var context = {Hotel:self.hoteldata};
				
					self.render();
					
				
				}).catch(function (err) {
				  console.log(err);
				});


			
			
		};
		
		 this.initialize();
		
};





//var Homeview = new HomeView();

//Get template
//Homeview.template = Handlebars.compile($("#front_page_list").html());