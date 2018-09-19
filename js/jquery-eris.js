/* V.1.1.0 */
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
		},Display:function(d){
			var obj = this;
			var tag = "a";
			var order,title = true;
			var index,way,work,info = 0;
			if(typeof d=="object"){
				if(typeof d.tag) tag = d.tag;
				if(typeof d.order) order = d.order;
				if(typeof d.title) title = d.title;
			}
			var page_title = document.title;
			var obje = obj.find(tag);
			var toplam = obje.length;
			obje.click(function(){
				return false;
			});
			obje.click(function(){
				obje = $(tag+'[group="'+$(this).attr("group")+'"]');
				toplam = obje.length;
				index = obje.index(this);
				if($(".display-mask").length){
					return;
				}
				jQuery("<div/>",{
					class:"display-mask"
				}).appendTo("body");
				$(".display-mask").animate({
					top:"0%",
					bottom:"0%",
					opacity:1
				}, 400, function(){
					jQuery("<div/>",{
						class:"display-load"
					}).appendTo(".display-mask");
					loading();
					jQuery("<span/>",{
						class:"display-space"
					}).appendTo(".display-mask");
					jQuery("<div/>",{
						class:"display-close"
					}).appendTo(".display-mask");
					$(".display-close").click(close);
					jQuery("<img/>",{
						class:"display-image",
					}).appendTo(".display-space");
					setType();
					var src = $(obje[index]).attr("href");
					$(".display-image").attr("src",$(obje[index]).attr("href"));
					loadEvent();
					jQuery("<div/>",{
						class:"display-left"
					}).appendTo(".display-space");
					$(".display-left").click(left);
					jQuery("<div/>",{
						class:"display-right"
					}).appendTo(".display-space");
					$(".display-right").click(right);
					if(title){
						jQuery("<div/>",{
							class:"display-title",
							style:"padding:8px 10px"
						}).appendTo(".display-space");
					}
					loadEvent();
				});
			});
			var loading = function(){
				$({deg:0}).animate({deg:360},{
					duration:1500,
					step:function(now){
						if(now==360){
							loading();
						}
						$(".display-load").css({
							transform:'rotate('+now+'deg)'
						});
					}
				});
			}
			var close = function(){
				$(".display-mask").animate({
					top:"50%",
					bottom:"50%",
					opacity:0
				}, 400, function(){
					$(".display-mask").remove();
					document.title = page_title;
				});
			}
			var left = function(){
				if(work){
					return false;
				}
				if(index>=1){
					--index;
					way = 1;
					$(".display-space").animate({
						left:"+=50",
						opacity:0
					}, 400, function(){
						setType();
						$(".display-image").attr("src",$(obje[index]).attr("href"));
						work = 0;
					});
				} else {
					close();
				}
			}
			var right = function(){
				if(work){
					return false;
				}
				if(index<=(toplam-2)){
					++index;
					way = 0;
					$(".display-space").animate({
						left:"-=50",
						opacity:0
					}, 400, function(){
						setType();
						$(".display-image").attr("src",$(obje[index]).attr("href"));
						work = 0;
					});
				} else {
					close();
				}
			}
			var setType = function(){
				var type = getType($(obje[index]).attr("href"));
				switch(type){
					case "video":
					if($(".display-image").prop("tagName")!="VIDEO"){
						$(".display-image").replaceWith(function(){
							var url = new URL("http://"+$(obje[index]).attr("href"));
							var controls = (url.searchParams.get("controls")!=null)?'controls="controls"':'';
							var autoplay = (url.searchParams.get("autoplay")!=null)?'autoplay="1"':'';
							return '<video class="display-image" '+controls+' '+autoplay+'></video>';
						});
						setTimeout(function(){
							$(".display-left").css("bottom","140px");
							$(".display-right").css("bottom","140px");
						}, 200);
					}
					break;
					case "iframe":
					if($(".display-image").prop("tagName")!="IFRAME"){
						$(".display-image").replaceWith(function(){
							return '<iframe class="display-image"></iframe>';
						});
						setTimeout(function(){
							$(".display-left").css("bottom","140px");
							$(".display-right").css("bottom","140px");
						}, 200);
					}
					break;
					default:
					if($(".display-image").prop("tagName")!="IMG"){
						$(".display-image").replaceWith(function(){
							return '<img class="display-image"></img>';
						});
						setTimeout(function(){
							$(".display-left").css("bottom","40px");
							$(".display-right").css("bottom","40px");
						}, 200);
					}
				}
				loadEvent();
			}
			var loadEvent = function(){
				$(".display-image").on("load loadstart", function(e){
					work = 0;
					document.title = obje[index].title;
					var size = new Array();
					if($(".display-image").is("img")){
						size = getSize($(this).prop("naturalWidth"),$(this).prop("naturalHeight")).split(",");
					} else {
						var adr = ($(this).attr("src").search("https")==-1)?'https://'+$(this).attr("src"):$(this).attr("src");
						var url = new URL(adr);
						size[0] = url.searchParams.get("width");
						size[1] = url.searchParams.get("height");
					}
					
					$(this).css({
						width:size[0],
						height:size[1]
					});
					var new_way = (way)?'-':'+';
					$(".display-space").css("left",new_way+"=100px");
					$(".display-space").animate({
						left:"50%",
						opacity:1
					}, 400);
					if(title){
						var order_title = (order)?(index+1)+"/"+toplam+" ":"";
						$(".display-title").html(order_title+obje[index].title);
					}
					if(!info){
						setTimeout(function(){
							if(index!=0){
								jQuery("<div/>",{
									class:"display-info-left"
								}).appendTo(".display-space");
								$(".display-info-left").animate({
									left:"-=100",
									opacity:0
								}, 600, function(){
									$(this).remove();
								});
							}
							if(index!=(toplam-1)){
								jQuery("<div/>",{
									class:"display-info-right"
								}).appendTo(".display-space");
								$(".display-info-right").animate({
									right:"-=100",
									opacity:0
								}, 600, function(){
									$(this).remove();
								});
							}
						}, 600);
						info = 1;
					}
				});
			}
			var getSize = function(w,h){
				var ultimate;
				var b = ($(window).width()<640)?20:80;
				var sw = $(window).width()-b;
				var sh = $(window).height()-b;
				if(sw<w){
					var yh = (sw/w)*h;
					if(sh<yh){
						var yw = (sh/h)*w;
						ultimate = Math.round(yw)+","+sh;
					} else {
						ultimate = sw+","+Math.round(yh);
					}
				} else {
					var yw = (sh/h)*w;
					ultimate = Math.round(yw)+","+sh;
				}
				if(sw<Math.round(yw)){
					var n = ultimate.split(",");
					ultimate = sw+","+Math.round((n[1]/n[0])*sw);
				}
				return ultimate;
			}
			var getType = function(data){
				var type = "image";
				if(data.search("youtube")!=-1 || data.search("vimeo")!=-1){
					type = "iframe";
				}
				var _f = data.split("?")[0].split(".");
				if(_f[_f.length-1]=="mp4"){
					type = "video";
				}
				return type;
			}
			$(window).on("DOMMouseScroll mousewheel",function(event){
				if($(".display-mask").length){
					if(event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0){
						right();
					} else {
						left();
					}
				}
			});
			$("body").keydown(function(e){
				if($(".display-mask").length){
					if(e.keyCode==39){
						right();
					}
					if(e.keyCode==37){
						left();
					}
					if(e.keyCode==27 || e.keyCode==38 || e.keyCode==40){
						close();
					}
				}
			});
		}
	})
	$.each($("[size]"),function(key,elm){
		$(elm).Size($(elm).attr("size"));
	});
});