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

	function exit_m(object) {
		this.create = function () {};
		this.build = function() {}; // this.activity.loader(false);
		this.start = function () {};
		this.pause = function() {};
		this.stop = function() {};
		this.render = function() {};
		this.destroy = function() {};
	}
	
	function createExitMenu() {
		window.plugin_exit_m_ready = true;
		Lampa.Component.add('exit_m', exit_m);
		Lampa.Listener.follow('app', function(r) {
			if (r.type == 'ready') {
				var ico = '<svg version="1.1" color="#eee" id="exit" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n<g>\n	<path fill="currentColor" d="M256,0c141.4,0,256,114.6,256,256S397.4,512,256,512S0,397.4,0,256S114.6,0,256,0z M256,35.7\n		C134.3,35.7,35.7,134.3,35.7,256S134.3,476.3,256,476.3S476.3,377.7,476.3,256S377.7,35.7,256,35.7z M312.5,175\n		c6.8-6.8,17.9-6.8,24.7,0c6.8,6.8,6.8,17.9,0,24.7L281,255.9l56.2,56.1c6.8,6.8,6.8,17.9,0,24.7c-6.8,6.8-17.9,6.8-24.7,0\n		l-56.2-56.2l-56.2,56.2c-6.1,6.1-15.7,6.7-22.5,1.8l-2.2-1.8c-6.8-6.8-6.8-17.9,0-24.7l56.2-56.1l-56.2-56.1\n		c-6.8-6.8-6.8-17.9,0-24.7c6.8-6.8,17.9-6.8,24.7,0l56.2,56.2L312.5,175z"/>\n</g>\n</svg>';
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
	if (!window.plugin_exit_m_ready) createExitMenu();

})();