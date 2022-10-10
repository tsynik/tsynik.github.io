// Main Menu Exit
(function() {
	'use strict';

	Lampa.Lang.add({
		exit_menu: {
			ru: 'Выход',
			en: 'Exit',
			uk: 'Вихід',
			be: 'Вынахад',
			zh: '出口',
			pt: 'Saída'
		}
	});

	function exit_n(object) {
		this.create = function () {};
		this.build = function() {}; // this.activity.loader(false);
		this.start = function () {};
		this.pause = function() {};
		this.stop = function() {};
		this.render = function() {};
		this.destroy = function() {};
	}
	
	function startexit_n() {
		window.plugin_exit_n_ready = true;
		Lampa.Component.add('exit_n', exit_n);
		Lampa.Listener.follow('app', function(r) {
			if (r.type == 'ready') {
				var ico = '<svg color="#eee" enable-background="new 0 0 500 500" id="layer_1" version="1.1" viewBox="0 0 500 500" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="249.9" cy="250.4" r="204.7" stroke="currentColor" stroke-miterlimit="10"/><circle cx="249.9" cy="247.4" fill="none" r="181.8" stroke="currentColor" stroke-miterlimit="10"/><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="22" x1="162" x2="337.8" y1="159.5" y2="335.3"/><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="22" x1="337.8" x2="162" y1="159.5" y2="335.3"/></svg>';
				var menu_items = $('<li class="menu__item selector" data-action="exit_r"><div class="menu__ico">' + ico + '</div><div class="menu__text">' + Lampa.Lang.translate('exit_menu') + '</div></li>');
					menu_items.on('hover:enter', function() {
						Lampa.Activity.out();
						if(Lampa.Platform.is('tizen')) tizen.application.getCurrentApplication().exit();
						if(Lampa.Platform.is('webos')) window.close();
						if(Lampa.Platform.is('android')) Lampa.Android.exit();
						if(Lampa.Platform.is('orsay')) Lampa.Orsay.exit();
					});
					$('.menu .menu__list').eq(2).append(menu_items);
			}
		});
	}
	if (!window.plugin_exit_n_ready) startexit_n();

})();