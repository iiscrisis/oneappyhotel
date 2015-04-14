// JavaScript Document

function HotelMenu(plugIns,topItems)
{
	this.plugIns = plugIns;
	this.topItems = topItems;
	
	this.renderPlugIns = function()
	{
		var template = Handlebars.compile($("#menuPlugIns").html());
		var context ={plugIns:this.plugIns };
		html = template(context);
		return html;
	}
	
	this.renderTopItems = function()
	{
		var template = Handlebars.compile($("#menuTopItems").html());
		var context ={topItems:this.topItems };
		html = template(context);
		return html;
	}
		
};