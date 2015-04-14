// JavaScript Document

function oneAppyMemory(dbName)
{
	this.dbName = dbName;
	this.db;
	
	
	this.initialize = function()
	{
		this.db = 	this.returnDb();
		
	
	}
	
	this.render = function(hoteldata)
		{
			
			console.log("rendering");
		/*	var context = {Hotel:hoteldata};
			var html = this.template(context);
			this.el.html(html);
			
			//addedd as test maybe permanent
			$("#hotels_list").html(this.el);
			
			return this;*/
			
		};
	
	this.deleteDb = function()
	{
		console.log("Delete DB");
		this.db.destroy();	
	}
	
	this.returnDb = function()
	{
		var db = new PouchDB(this.dbName);	
	
		return db;
	}
	
	
	this.updateRoot = function(data)
	{
		
		console.log("update Root "+data['_id']);
		
		this.db.get(data['_id']).catch(function (err) {
			
			//If id	does not exsist add to DB
			
			
			
		});
	}
	
	this.populateDb = function()
	{
		/*var self = this;
		this.db.get('oneappy1').then(function(result){}).catch(function(error){self.populateDbok();});*/
		
	
		var ddoc = {
				  _id: '_design/doc_type',
				  views: {
					doc_type: {
					  map: function mapFun(doc) {
						if (doc.doc_type) {
						  emit(doc.doc_type);
						}
					  }.toString()
					}
				  }
				}
				
	this.db.put(ddoc, function (err) {
  		if (err && err.status !== 409) {
    		return console.log(err);
		}
  	});
	
	
		/*
			this.db.put({
					doc_type:'Root',
					hotel_title:"Hotel 1",
					hotel_description:"Lorem ipsum 1",
					hotel_logo:"images/hotel1/logo.png",
					_id:'oneappy1',
					
					//Data for Hotel Object
					
					logo:"hotel1/logo.png",
					description:"Lorem ipsum 1Lorem ipsum 1Lorem ipsum1 Lorem ipsum 1Lorem ipsum 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png"	,
					
					//Plug Ins Items
					plugIns:[
					{
						title:"Contact",
						template:"contact_tmpl",
						icon:"icons/plugins/contact.png"
					},
					{
						title:"Breakfast",
						template:"breakfast_tmpl",
						icon:"icons/plugins/breakfast.png"
					}
					,
					{
						title:"Weather",
						template:"weather_tmpl",
						icon:"icons/plugins/weather.png"
					}
					,
					{
						title:"Report a Problem",
						template:"report_tmpl",
						icon:"icons/plugins/report.png"
					}
					,
					{
						title:"Favourite Places",
						template:"favourites_tmpl",
						icon:"icons/plugins/favourites.png"
					}
						,
					{
						title:"Bookmarks",
						template:"bookmarks_tmpl",
						icon:"icons/plugins/bookmarks.png"
					}
					,
					{
						title:"Emergency Phones",
						template:"emergency_tmpl",
						icon:"icons/plugins/emergency.png"
					}],
					
					//Menu Top Item Leafs
					 MenuTopItems:
					[
						{
							title:"Beaches 1",
							id:'oneappy11'
						},
						{
							title:"Monuments 1",
							id:'oneappy12'
						},			
						{
							title:"Restaurants 1",
							id:'oneappy13'
						}
					]
						
					
					
				}).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});
			
			
			
			this.db.put({
					doc_type:'Root',
					hotel_title:"Hotel 2 ",
					hotel_description:"Lorem ipsum 2",
					hotel_logo:"images/hotel1/logo.png",
					_id:'oneappy2',
					
					//Data for Hotel Object
					
					logo:"hotel2/logo.png",
					description:"Lorem ipsum 2Lorem ipsum 2Lorem ipsum 2Lorem ipsum 2Lorem ipsum 2",
					backgroundType:"fullBackgroundImage",
					background:"hotel2/backgrounds/bg.png"	,
					
					
					//Plug Ins Items
					plugIns:[{
					title:"Contact",
					template:"contact_tmpl",
					icon:"icons/plugins/contact.png"
					},
					{
						title:"Breakfast",
						template:"breakfast_tmpl",
						icon:"icons/plugins/breakfast.png"
					}
					,
					{
						title:"Weather",
						template:"weather_tmpl",
						icon:"icons/plugins/breakfast.png"
					}
					,
					{
						title:"Report a Problem",
						template:"report_tmpl",
						icon:"icons/plugins/report.png"
					},
					{
						title:"Bookmarks",
						template:"bookmarks_tmpl",
						icon:"icons/plugins/bookmarks.png"
					}
					
					
				],
				
				 MenuTopItems:
				[
					{
						title:"Beaches 2",
						id:'oneappy21'
					},
					{
						title:"Monuments 2",
						id:'oneappy22'
					},			
					{
						title:"Restaurants 2",
						id:'oneappy23'
					}
				]
						
					
				}).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});


			this.db.put({
					doc_type:'Root', //Hotel Types are Root/Branch/Leaf
					hotel_title:"Hotel 3 ",
					hotel_description:"Lorem ipsum 3",
					hotel_logo:"images/hotel1/logo.png",
					_id:'oneappy3',
					
					//Data for Hotel Object
					
					logo:"hotel3/logo.png",
					description:"Lorem ipsum 3Lorem ipsum 3Lorem ipsum 3Lorem ipsum 3Lorem ipsum 3",
					backgroundType:"fullBackgroundImage",
					background:"hotel3/backgrounds/bg.png"	
					
					,
					
					
					//Plug Ins Items
					plugIns:[{
					title:"Contact",
					template:"contact_tmpl",
					icon:"icons/plugins/contact.png"
					},
					{
						title:"Breakfast",
						template:"breakfast_tmpl",
						icon:"icons/plugins/breakfast.png"
					}
					,
				
					{
						title:"Report a Problem",
						template:"report_tmpl",
						icon:"icons/plugins/report.png"
					}
				],
				
				 MenuTopItems:
				[
					{
						title:"Beaches 3",
						id:'oneappy31'
					},
					{
						title:"Monuments 3",
						id:'oneappy32'
					},			
					{
						title:"Restaurants 3",
						id:'oneappy33'
					}
				]
				
				}).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});
			
			 console.log("DbUpdated 4444");
			//Add Hotel Leafs
			
			
			
				this.db.put(
				{
					doc_type:'Branch',
					title:"Beaches 1",
					_id:'oneappy11',
					bookmark:'false', //Bookmark is a local database value since it is client owned
					logo:"hotel1/logo.png",
					description:"Cat Beaches 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						{
							title:"Agia Napa 1",
							id:'oneappy111'
						},
						{
							title:"Panagia Kanala 1",
							id:'oneappy112'
						},				
						{
							title:"Toy Skylou 1",
							id:'oneappy113'
						}
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			//Add branch Leafs
			
			this.db.put(
				{
					doc_type:'Leaf',
					title:"Agia Napa 1",
					_id:'oneappy111',
					bookmark:'false', //Bookmark is a local database value since it is client owned
					logo:"hotel1/logo.png",
					description:"Agia Napa 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			
			
			
				this.db.put(
				{
					doc_type:'Leaf',
					title:"Panagia Kanala  1",
					_id:'oneappy112',
					bookmark:'false', //Bookmark is a local database value since it is client owned
					logo:"hotel1/logo.png",
					description:"Panagia Kanala 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
				this.db.put(
				{
					doc_type:'Leaf',
					title:"Toy Skylou 1",
					_id:'oneappy113',
					bookmark:'false', //Bookmark is a local database value since it is client owned
					logo:"hotel1/logo.png",
					description:"Toy Skylou 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			
			
			this.db.put(
				{
					doc_type:'Branch',
					title:"Beaches 2",
					_id:'oneappy21',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Beaches 2",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
				this.db.put(
				{
					doc_type:'Branch',
					title:"Beaches 3",
					_id:'oneappy31',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Beaches 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			
				this.db.put(
				{
					doc_type:'Branch',
					title:"Monuments 1",
					_id:'oneappy12',
					logo:"hotel1/logo.png",
					bookmark:'false',
					description:"Cat Monuments 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						{
							title:"Acropole 1 ",
							id:'oneappy121'
						},
						{
							title:"Wall 1",
							id:'oneappy122'
						},				
						{
							title:"Ruins 1",
							id:'oneappy123'
						}
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			//Add Branch Leafs
			
			
				this.db.put(
				{
					doc_type:'Leaf',
					title:"Acropole 1",
					_id:'oneappy121',
					logo:"hotel1/logo.png",
					bookmark:'false',
					description:"Acropole 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
				this.db.put(
				{
					doc_type:'Leaf',
					title:"Wall 1",
					_id:'oneappy122',
					logo:"hotel1/logo.png",
					bookmark:'false',
					description:"Wall 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			this.db.put(
				{
					doc_type:'Leaf',
					title:"Ruins 1",
					_id:'oneappy123',
					logo:"hotel1/logo.png",
					bookmark:'false',
					description:"Ruins 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			
			
			this.db.put(
				{
					doc_type:'Branch',
					title:"Monuments 2",
					_id:'oneappy22',
					logo:"hotel1/logo.png",
					bookmark:'false',
					description:"Cat Monuments 2",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
				this.db.put(
				{
					doc_type:'Branch',
					title:"Monuments 3",
					bookmark:'false',
					_id:'oneappy32',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Monuments 3",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			
			this.db.put(
				{
					doc_type:'Branch',
					title:"Restaurants 1",
					_id:'oneappy13',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Restaurants 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						{
							title:"Restaurant A 1 ",
							id:'oneappy131'
						},
						{
							title:"Restaurant B 1",
							id:'oneappy132'
						}
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			
			//Add Leafs
			
			this.db.put(
				{
					doc_type:'Leaf',
					title:"Restaurant A 1",
					_id:'oneappy131',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Restaurant A 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
					this.db.put(
				{
					doc_type:'Leaf',
					title:"Restaurant B 1",
					_id:'oneappy132',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Restaurant B 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			
			
			this.db.put(
				{
					doc_type:'Leaf',
					title:"Restaurants C 1",
					_id:'oneappy133',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Restaurants 1",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			this.db.put(
				{
					doc_type:'Branch',
					title:"Restaurants 2",
					_id:'oneappy23',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Restaurants 2",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
				this.db.put(
				{
					doc_type:'Branch',
					title:"Restaurants 3",
					_id:'oneappy33',
					bookmark:'false',
					logo:"hotel1/logo.png",
					description:"Cat Restaurants 3",
					backgroundType:"fullBackgroundImage",
					background:"hotel1/backgrounds/bg.png",
					subcategories : 
					[
						
					]
					
				}		
		
			
			).then(function (response) {
			  // handle response
			  console.log("DbUpdated");
			  
			}).catch(function (err) {
			  console.log(err);
			});;
			
			
			//Add Plug ins
			
			this.db.put({
					
					type:'Contact',
					_id:'contact_tmpl_oneappy1',
					address:'address line 1',
					phones:'phone line 1',
					email:'email line 1',
					hours:'opening hours line 1',
					map:[{longtitude:234},{lattitude:123.23}]
				
			}).then(function(response){}).catch(function(err){
				
				
			
			});
			
			this.db.put({
					
					type:'Contact',
					_id:'contact_tmpl_oneappy2',  //id is type of
					address:'address line 2',
					phones:'phone line 2',
					email:'email line 2',
					hours:'opening hours line 2',
					map:[{longtitude:234},{lattitude:123.23}]
				
			}).then(function(response){}).catch(function(err){
				
				
			
			});
			
			this.db.put({
					
					type:'Contact',
					_id:'contact_tmpl_oneappy3',  //id is type of
					address:'address line 3',
					phones:'phone line 3',
					email:'email line 3',
					hours:'opening hours line 3',
					map:[{longtitude:234},{lattitude:123.23}]
				
			}).then(function(response){}).catch(function(err){
				
				
			
			});
			
			
			this.db.put({
							type:'Weather',
							_id:'weather_tmpl_oneappy1', 
							weather_date:"weather_date",
							weather_region:"weather_region",
							weather_degrees:"weather_degrees",
							weather_icon:"weather_icon",
							weather_description:"weather_description"
						}
						
					
						
			
			).then(function(response){}).catch(function(err){});
			
			
			this.db.put({
							type:'Weather',
							_id:'weather_tmpl_oneappy2', 
							weather_date:"weather_date 2",
							weather_region:"weather_region 2",
							weather_degrees:"weather_degrees 2",
							weather_icon:"weather_icon 2",
							weather_description:"weather_description 2"
						}
						
						
			
			).then(function(response){}).catch(function(err){});

			*/
	}	
	
	
	
	this.initialize();
}