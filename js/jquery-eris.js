/* V.1.0.1 */
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
		},Accord:function(d){
			var obj = this;
			var type = new Array("img","iframe","video");
			function reSize(){
				type.forEach(function(item){
					$.each(obj.find(item),function(key,elm){
						if(!$(elm).attr("naturelSize")){
							$(elm).attr("naturelSize",$(elm).width()+"x"+$(elm).height());
						}
						var _sp = $(elm).attr("naturelSize").split("x");
						if($(obj).width()<=$(elm).width()){
							$(elm).removeAttr("width");
							$(elm).width("100%");
							$(elm).height($(elm).width()*(_sp[1]/_sp[0]));
						}
						if($(obj).width()>=_sp[0]){
							$(elm).removeAttr("width");
							$(elm).width(_sp[0]);
							$(elm).height(_sp[1]);
						}
					});
				});
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