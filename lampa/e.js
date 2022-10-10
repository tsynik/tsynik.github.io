(function() {
	'use strict';

	function exit_n(object) {
		this.create = function () {};
		this.build = function() { this.activity.loader(false); };
		this.start = function () {};
		this.pause = function() {};
		this.stop = function() {};
		this.render = function() {};
		this.destroy = function() {};
	}
	
	Lampa.Lang.add({
		exit_menu: {
			ru: 'Выход',
			uk: 'Вихід',
			be: 'Вынахад',
			en: 'Exit',
			zh: '出口'
		}
	});

	function startexit_n() {
		window.plugin_exit_n_ready = true;
		Lampa.Component.add('exit_n', exit_n);
		Lampa.Listener.follow('app', function(r) {
			if (r.type == 'ready') {
				var ico = '<svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" color="#eee" fill="currentColor" class="bi bi-tv"><path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z"/></svg>';
				var menu_items = $('<li class="menu__item selector" data-action="exit_r"><div class="menu__ico">' + ico + '</div><div class="menu__text">' + Lampa.Lang.translate('quality_menu') + '</div></li>');
					menu_items.on('hover:enter', function() {
						Lampa.Activity.out();
// 						if(Lampa.Platform.is('tizen')) tizen.application.getCurrentApplication().exit();
//            if(Lampa.Platform.is('webos')) window.close();
// 						if(Lampa.Platform.is('android')) Lampa.Android.exit();
					});
					$('.menu .menu__list').eq(2).append(menu_items);
			}
		});
	}
	if (!window.plugin_exit_n_ready) startexit_n();

})();