$(function(){
	$.fn.extend({
		AddTitle:function(d){
			var obj = this;
			$.each(obj.find("a"),function(key,elm){
				$(elm).prop("title",$(elm).text());
			});
		},AddHref:function(d){
			var obj = this;
			var tag = "href";
			var titleB = (typeof d=="object")?d.title:true;
			$.each(obj.find("["+tag+"]"),function(key,elm){
				var href = $(elm).attr(tag);
				var title = (typeof titleB=="boolean")?((titleB)?'title="'+($(elm).html()||$(elm).attr("alt"))+'"':""):'title="'+d.title+'"';
				$(elm).wrap('<a href="'+href+'"'+title+'></a>');
				$(elm).removeAttr(tag);
			});
		},Size:function(d){
			var elm = this;
			function reSize(){
				var height;
				switch(typeof d){
					case "object":
						var k = new Array();
						for(var i in d){
							d[i]["media"] = i;
							k.push(d[i]);
						}
						k.reverse();
						k.forEach(function(item){
							if(item.media=="default"){
								height = hReSize(item,elm);
							} else {
								if($(window).width()<item.media){
									height = hReSize(item,elm);
								}
							}
						});
					break;
					case "string":
						var _sp = d.split("x");
						height = Math.ceil((_sp[1]/_sp[0])*elm.width());
					break;
					default:
						console.log("Parametre eksik");
					return;
				}
				function hReSize(item,elm){
					var height;
					if(item.height){
						height = item.height;
					} else if(item.size){
						var _sp = item.size.split("x");
						height = Math.ceil((_sp[1]/_sp[0])*elm.width());
					} else {
						console.log("Parametre eksik");
					}
					return height;
				}
				elm.css({height:height});
			}
			$(window).resize(function(){
				reSize();
			});
			$(document).ready(function(){
				reSize();
			});
		}
	})
	$.each($("[size]"),function(key,elm){
		$(elm).Size($(elm).attr("size"));
	});
});
/*
$(function(){
	// Örnek 1
	$(".div1").Oran({
		default : {
			oran:"5x1"
		},800:{
			height:"100px"
		},600:{
			oran:"5x2"
		},700:{
			height:"calc(100VH - 20px)"
		}
	});
	// Örnek 2
	$(".div2").Oran({
		default:{
			height:"calc(100VH - 100px)"
		},800:{
			oran:"1600x300"
		}
	});
})
*/