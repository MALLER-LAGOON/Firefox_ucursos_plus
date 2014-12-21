// ==UserScript==
// @name	U-Cursos+ Script
// @include	http://www.u-cursos.cl/*
// @include	https://www.u-cursos.cl/*
// @description	Una aplicacion para mejorar las funcionalidades de U-Cursos.
// @grant	none
// @version 1.5.4
// ==/UserScript==
/*
Script encargado de buscar enlaces de imágenes y vídeos en YouTube en la página e insertarlas
Parte de la extensión U-Cursos +.

Autor: Arachnid92
Colaboradores: · Maller Lagoon
*/
function expandBlock(btn_id)
{
	//Función encargada de expandir y colapsar bloques de vídeo.
	//Recibe como parámetro la id del botón que fue presionado.
	//Luego, extrae la id del elemento a expandir/colapsar de la id
	//del botón y ejecuta.
	var id = btn_id.substr(0, btn_id.length - 4);
	var div = document.getElementById('' + id);
	if (div == null)
	{
		alert(id + ' is null');
	}
	if (div.style.display == 'block')
	{
		div.style.display = 'none';
	}
	else if (div.style.display == 'none')
	{
		div.style.display = 'block';
	}
}

var all = document.getElementsByTagName('a'); /* ojo con esta linea, si falla uplas es porque hay que cambiar esto*/
for (var i = 0, max = all.length; i < max; i++)
{
	var href = all[i].getAttribute('href');
	if (href == null)
	{
		continue;
	}
	var len = href.length;
	var parent = all[i].parentNode;
		//Imágenes
	if (href.substr(len - 4).toLowerCase() == '.bmp'
	|| href.substr(len - 4).toLowerCase() == '.gif'
	|| href.substr(len - 4).toLowerCase() == '.jpg'
	|| href.substr(len - 5).toLowerCase() == '.jpeg'
	|| href.substr(len - 4).toLowerCase() == '.png'
	|| href.substr(len - 4).toLowerCase() == '.svg'
	|| href.substr(len - 10).toLowerCase() == '.jpg:large'
	|| href.substr(len - 10).toLowerCase() == '.png:large'
	|| href.substr(len - 10).toLowerCase() == '.gif:large'
	|| href.substr(len - 11).toLowerCase() == '.png?psid=1')
	{
		if (href.substr(0, 25).toLowerCase() == 'http://subefotos.com/ver/'|| href.substr(0, 26).toLowerCase() == 'https://subefotos.com/ver/') // bloque para los archivos del servidor de subefotos.com
		{
			var vCode = 0;
			if (href.substr(0, 25).toLowerCase() == 'http://subefotos.com/ver/')
			{
				vCode = href.substr(26);
			}
			else if (href.substr(0, 25).toLowerCase() == 'https://subefotos.com/ver/')
			{
				vCode = href.substr(26);
			}
			var div = document.createElement('div');
			div.setAttribute('class', 'imagen');
			var img = document.createElement('img');
			img.setAttribute('src', 'http://fotos.subefotos.com/'.concat(vCode));
			img.setAttribute('style', 'max-width:560px;'); // max-height:600px');
		// a continuacion nos aseguramos de que la id sea unica
			var id = href.substr(len - 10, len - 5);
			while (document.getElementById(id) != null)
			{
				id = id + (Math.random() * 10);
			}
			img.setAttribute('id', '' + id);
			var div_btn = document.createElement('div');
			var lastItem = all[i].nextSibling;
			while (lastItem.nextSibling != null)
			{
				lastItem = lastItem.nextSibling;
			}
			div.appendChild(img);
			parent.insertBefore(div_btn, lastItem.previousSibling);
			parent.insertBefore(div, div_btn);
		}
		else
		{
			var div = document.createElement('div');
			div.setAttribute('class', 'imagen');
			var img = document.createElement('img');
			img.setAttribute('src', href);
			img.setAttribute('style', 'max-width:560px;');// max-height:600px');
			// a continuacion nos aseguramos de que la id sea unica
			var id = href.substr(len - 10, len - 5);
			while (document.getElementById(id) != null)
			{
				id = id + (Math.random() * 10);
			}
			img.setAttribute('id', '' + id);
			var div_btn = document.createElement('div');
			var lastItem = all[i].nextSibling;
			while (lastItem.nextSibling != null)
			{
				lastItem = lastItem.nextSibling;
			}
			div.appendChild(img);
			parent.insertBefore(div_btn, lastItem.previousSibling);
			parent.insertBefore(div, div_btn);
		}
	}

	else if
	//Videos Youtube no empotrados
	(href.substr(0, 15).toLowerCase() == 'http://youtu.be'
	|| href.substr(0, 16).toLowerCase() == 'https://youtu.be'
	|| href.substr(0, 28).toLowerCase() == 'http://www.youtube.com/watch'
	|| href.substr(0, 29).toLowerCase() == 'https://www.youtube.com/watch'
	|| href.substr(0, 21).toLowerCase() == 'www.youtube.com/watch')
	{
		var div = document.createElement('div');
		div.setAttribute('class', 'video');
		div.setAttribute('style', 'overflow:hidden;display:none;');
		var iframe = document.createElement('iframe');
		iframe.setAttribute('width', '560');
		iframe.setAttribute('height', '315');
		var vCode = 0;
		//A continuacion extraemos el codigo del video del enlace:
		if (href.substr(0, 15).toLowerCase() == 'http://youtu.be')
		{
			vCode = href.substr(16);
		} 
		else if (href.substr(0, 16).toLowerCase() == 'https://youtu.be')
		{
			vCode = href.substr(17);
		} 
		else if (href.substr(0, 28).toLowerCase() == 'http://www.youtube.com/watch')
		{
			vCode = href.substr(31);
		} 
		else if (href.substr(0, 29).toLowerCase() == 'https://www.youtube.com/watch')
		{
			vCode = href.substr(32);
		}
		else if(href.substr(0, 21).toLowerCase() == 'www.youtube.com/watch')
		{
			vCode = href.substr(24);
		}
		else
		{
			vCode = href.substr(16);
		}
		//creamos el objeto iframe necesario para insertar el video

		iframe.setAttribute('src', 'https://youtube.com/embed/'.concat(vCode));
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '1');
		//Aqui asignamos una id unica al contenedor del video
		while (document.getElementById('' + vCode) != null)
		{
			vCode = vCode + (Math.random() * 1000);
		}
		div.setAttribute('id', '' + vCode);
		//link para expandir:
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.id = vCode + '_btn';
		btn.onclick = function () {
			expandBlock(this.id);
		};
		btn.innerHTML = '+/-';
		//insertamos todo
		var lastItem = all[i].nextSibling;
		while (lastItem.nextSibling != null)
		{
			lastItem = lastItem.nextSibling;
		}
		div.appendChild(iframe);
		parent.insertBefore(div, lastItem.previousSibling);
		parent.insertBefore(btn, div);
	}
	//Videos Youtube empotrados
	else if
	(href.substr(0, 24).toLowerCase() == 'http://youtube.com/embed'
	|| href.substr(0, 25).toLowerCase() == 'https://youtube.com/embed'
	|| href.substr(0, 28).toLowerCase() == 'http://www.youtube.com/embed'
	|| href.substr(0, 29).toLowerCase() == 'https://www.youtube.com/embed'
	|| href.substr(0, 21).toLowerCase() == 'www.youtube.com/embed'
	|| href.substr(0, 17).toLowerCase() == 'youtube.com/embed'
	|| href.substr(0, 39).toLowerCase() == 'http://www.dailymotion.com/embed/video/'
	|| href.substr(0, 40).toLowerCase() == 'https://www.dailymotion.com/embed/video/'
	|| href.substr(0, 32).toLowerCase() == 'www.dailymotion.com/embed/video/'
	|| href.substr(0, 28).toLowerCase() == 'dailymotion.com/embed/video/')
	{
		var div = document.createElement('div');
		div.setAttribute('class', 'video');
		div.setAttribute('style', 'overflow:hidden;display:none;');
		var iframe = document.createElement('iframe');
		iframe.setAttribute('width', '560');
		iframe.setAttribute('height', '315');
		var vCode = href;

		//creamos el objeto iframe necesario para insertar el video
		iframe.setAttribute('src', href);
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '1');
		//Aqui asignamos una id unica al contenedor del video
		while (document.getElementById('' + href) != null)
		{
			vCode = vCode + (Math.random() * 1000);
		}
		div.setAttribute('id', '' + vCode);
		//link para expandir:
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.id = vCode + '_btn';
		btn.onclick = function () {
			expandBlock(this.id);
		};
		btn.innerHTML = '+/-';
		//insertamos todo
		var lastItem = all[i].nextSibling;
		while (lastItem.nextSibling != null)
		{
			lastItem = lastItem.nextSibling;
		}
		div.appendChild(iframe);
		parent.insertBefore(div, lastItem.previousSibling);
		parent.insertBefore(btn, div);
	 }

/*********************trabajar en este codigo ***************************/
	else if 
	(href.substr(0, 25).toLowerCase() == 'http://www.ign.com/videos'
	||href.substr(0, 26).toLowerCase() == 'https://www.ign.com/videos'
	|| href.substr(0, 18).toLowerCase() == 'www.ign.com/videos')
	{
		var div = document.createElement('div');
		div.setAttribute('class', 'video');
		div.setAttribute('style', 'overflow:hidden;display:none;');
		var iframe = document.createElement('iframe');
		iframe.setAttribute('width', '468');
		iframe.setAttribute('height', '263');
		
		//A continuacion extraemos el codigo del video del enlace:
		var vCode = href;
		//creamos el objeto iframe necesario para insertar el video

		iframe.setAttribute('src', 'http://widgets.ign.com/video/embed/content.html?url='.concat(vCode));
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '1');
		//Aqui asignamos una id unica al contenedor del video
		while (document.getElementById('' + vCode) != null)
		{
			vCode = vCode + (Math.random() * 1000);
		}
		div.setAttribute('id', '' + vCode);
		//link para expandir:
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.id = vCode + '_btn';
		btn.onclick = function () {
			expandBlock(this.id);
		};
		btn.innerHTML = '+/-';
		//insertamos todo
		var lastItem = all[i].nextSibling;
		while (lastItem.nextSibling != null)
		{
			lastItem = lastItem.nextSibling;
		}
		div.appendChild(iframe);
		parent.insertBefore(div, lastItem.previousSibling);
		parent.insertBefore(btn, div);
	}
	else if 
	(href.substr(0, 35).toLowerCase() == 'http://widgets.ign.com/video/embed/'
	|| href.substr(0, 21).toLowerCase() == 'widgets.ign.com/video')
	{

		var div = document.createElement('div');
		div.setAttribute('class', 'video');
		div.setAttribute('style', 'overflow:hidden;display:none;');
		var iframe = document.createElement('iframe');
		iframe.setAttribute('width', '468');
		iframe.setAttribute('height', '263');
		var vCode = href;

		//creamos el objeto iframe necesario para insertar el video
		iframe.setAttribute('src', href);
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '1');
		//Aqui asignamos una id unica al contenedor del video
		while (document.getElementById('' + href) != null)
		{
			vCode = vCode + (Math.random() * 1000);
		}
		div.setAttribute('id', '' + vCode);
		//link para expandir:
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.id = vCode + '_btn';
		btn.onclick = function () {
			expandBlock(this.id);
		};
		btn.innerHTML = '+/-';
		//insertamos todo
		var lastItem = all[i].nextSibling;
		while (lastItem.nextSibling != null)
		{
			lastItem = lastItem.nextSibling;
		}
		div.appendChild(iframe);
		parent.insertBefore(div, lastItem.previousSibling);
		parent.insertBefore(btn, div);
	 }
}
