# Accord
İşaretlenmiş olan objenin içindeki objelerin ekrana tam sığmasını sağlar.
<br /><br />
## Örnek
### html
```
<div id="spine">
    <img src="img/demiryolu.jpg" />
    <img src="img/gol.jpg" width="533" height="300" />
    <iframe width="500" height="240" src="https://example.com/"></iframe>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/388-ZnlMoO4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <video width="800" height="600" controls="controls" src="https://www.w3schools.com/html/mov_bbb.mp4"></video>
</div>
```
### js
```
$(function(){
    $("#spine").Accord();
});
```




# AddHref
İşaretlenmiş olan objenin içinde href etiketi eklenen objeyi a etiketi altına alır.
<br /><br />
## Örnek
### html
```
<h1>TEST 1</h1>
<div id="menu1">
    <div href="/page1">Page 1</div>
    <img src="img/small_demiryolu.jpg" href="/page2" alt="Demiryolu" />
    <div href="/page3">Page 3</div>
</div>

<h1>TEST 2</h1>
<div id="menu2">
    <div href="/page4">Page 4</div>
    <div href="/page5">Page 5</div>
    <img src="img/small_gol.jpg" href="/test6" alt="Göl" />
</div>

<h1>TEST 3</h1>
<div id="menu3">
    <div href="/page7">Page 7</div>
    <div href="/page8">Page 8</div>
    <img src="img/small_gol.jpg" href="/test9" alt="Göl" />
</div>
```
### js
```
$(function(){
    $("#menu1").AddHref();
    $("#menu2").AddHref({
        title:false
    });
    $("#menu3").AddHref({
        title:"String Title"
    });
});
```



# AddTitle
İşaretlenmiş olan objenin altındaki tüm a taglarını içeriğine göre etiketler
<br /><br />
## Örnek
### html
```
<div id="menu">
    <a href="#">Main Page</a>
    <a href="#">Project</a>
    <a href="#">Test Page</a>
    <a href="#">Contact</a>
</div>
```
### js
```
$(function(){
    $("#menu").AddTitle();
});
```

# Size
Objenin width değerine göre height değerinin belirlenmesini sağlar.<br />
Bu özellik farklı ekran boyutlarına göre tanımlanabilir.<br />
Kısa kullanım için etiket olarak tanımlanabilir.
<br /><br />
## Örnek
### html
```
<div class="size1">16x9, 100px, 1x1, calc(50VH - 20px)</div>
<div class="size1">16x9, 100px, 1x1, calc(50VH - 20px)</div>
<div class="size2">18x6</div>
<div class="size3">1x1</div>
<div class="size4" size="10x2">10x2</div>
```
### js
```
$(function(){
    $(".size1").Size({
        default : {
            size:"16x9"
        },800:{
            height:"100px"
        },600:{
            size:"1x1"
        },700:{
            height:"calc(50VH - 20px)"
        }
    });
    $(".size2").Size("18x6");
    $(".size3").Size("1x1");
});
```




# Display
Seçilen objenin içindeki resim, video, iframe gibi objeleri sırası ile görüntülemeye yarar.<br>
YouTube ve Vimeo desteği mevcuttur.<br>
Seçilecek objeler, obje gruplaması, obje Numarası ve obje ismi opsiyoneldir.
<br /><br />
## Örnek
### html
```
<div id="container1">
	<a href="img/demiryolu.jpg" group="grp1" title="Demiryolu"><img src="img/small_demiryolu.jpg" width="200" height="113" /></a>
	<a href="img/gol.jpg" group="grp1" title="Göl Kenarı"><img src="img/small_gol.jpg" width="200" height="113" /></a>
	<a href="https://www.w3schools.com/html/mov_bbb.mp4?width=640&height=352&controls&autoplay" group="grp1" title="Video mp4" ><img src="img/small_caps.jpg" width="200" height="113" /></a>
	<a href="https://www.youtube.com/embed/Bfoyi_oLrDU?width=1120&height=630" group="grp1" title="YouTube Video"><img src="https://img.youtube.com/vi/Bfoyi_oLrDU/hqdefault.jpg" width="200" height="113" /></a>
	<a href="https://player.vimeo.com/video/251649912?width=1120&height=630&autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1" group="grp1" title="Vimeo Video"><img src="img/small_orman.jpg" width="200" height="113" /></a>
	<br />
	<a href="img/demiryolu.jpg" group="grp2" title="Demiryolu Grup 2"><img src="img/small_demiryolu.jpg" width="200" height="113" /></a>
	<a href="img/gol.jpg" group="grp2" title="Göl Kenarı Grup 2"><img src="img/small_gol.jpg" width="200" height="113" /></a>
</div>
<br />
<div id="container2">
	<a href="img/demiryolu.jpg" group="grp2" title="Demiryolu Grup 2"><img src="img/small_demiryolu.jpg" width="200" height="113" /></a>
	<a href="img/gol.jpg" group="grp2" title="Göl Kenarı Grup 2"><img src="img/small_gol.jpg" width="200" height="113" /></a>
</div>
```
### js
```
$(function(){
	$("#container1").Display({
		tag:"a",    // default a
		order:true, // default true
		title:true  // default true
	});
	$("#container2").Display(); // Default
});
```