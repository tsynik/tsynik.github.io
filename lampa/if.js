(function () {
	'use strict';

	function create() {
		var html;
		var timer;
		var network = new Lampa.Reguest();
		var loaded = {};

		this.create = function () {
			html = $("<div class=\"new-interface-info\">\n            <div class=\"new-interface-info__body\">\n                <div class=\"new-interface-info__head\"></div>\n                <div class=\"new-interface-info__title\"></div>\n                <div class=\"new-interface-info__details\"></div>\n                <div class=\"new-interface-info__description\"></div>\n            </div>\n        </div>");
		};

		this.update = function (data) {
			html.find('.new-interface-info__head,.new-interface-info__details').text('\xa0'); // ---
			html.find('.new-interface-info__title').text(data.title);
			html.find('.new-interface-info__description').text(data.overview || '\xa0'); /// ...
			Lampa.Background.change(Lampa.Api.img(data.backdrop_path, 'w200'));
			this.load(data);
		};

		this.draw = function (data) {
			var create = ((data.release_date || data.first_air_date || '0000') + '').slice(0, 4);
			var vote = parseFloat((data.vote_average || 0) + '').toFixed(1);
			var head = [];
			var details = [];
			var countries = Lampa.Api.sources.tmdb.parseCountries(data);
			var pg = Lampa.Api.sources.tmdb.parsePG(data);
			if (create !== '0000') head.push('<span>' + create + '</span>');
			if (countries.length > 0) head.push(countries.join(', '));
			if (vote > 0) details.push('<div class="full-start__rate"><div>' + vote + '</div><div>TMDB</div></div>');
			if (data.genres && data.genres.length > 0) details.push(data.genres.map(function (item) {
				return Lampa.Utils.capitalizeFirstLetter(item.name);
			}).join(' | '));
			if (data.runtime) details.push(Lampa.Utils.secondsToTime(data.runtime * 60, true));
			if (pg) details.push('<span class="full-start__pg" style="font-size: 0.8em;">' + pg + '</span>');
			html.find('.new-interface-info__head').empty().append(head.join(' \u{00B7} ')); // ', '
			html.find('.new-interface-info__details').html(details.join('<span class="new-interface-info__split">&#9679;</span>'));
		};

		this.load = function (data) {
			var _this = this;

			clearTimeout(timer);
			var url = Lampa.TMDB.api((data.name ? 'tv' : 'movie') + '/' + data.id + '?api_key=' + Lampa.TMDB.key() + '&append_to_response=content_ratings,release_dates&language=' + Lampa.Storage.get('language'));
			if (loaded[url]) return this.draw(loaded[url]);
			timer = setTimeout(function () {
				network.clear();
				network.timeout(5000);
				network.silent(url, function (movie) {
					loaded[url] = movie;

					_this.draw(movie);
				});
			}, 300);
		};

		this.render = function () {
			return html;
		};

		this.empty = function () {};

		this.destroy = function () {
			html.remove();
			loaded = {};
			html = null;
		};
	}

	function component(object) {
		var network = new Lampa.Reguest();
		var scroll = new Lampa.Scroll({
			mask: true,
			over: true,
			scroll_by_item: true
		});
		var items = [];
		var html = $('<div class="new-interface"><img class="full-start__background"></div>');
		var active = 0;
		var info;
		var lezydata;
		var viewall = Lampa.Storage.field('card_views_type') == 'view' || Lampa.Storage.field('navigation_type') == 'mouse';
		var background_img = html.find('.full-start__background');
		var background_last = '';
		var background_timer;

		this.create = function () {};

		this.empty = function () {
			var empty = new Lampa.Empty();
			html.append(empty.render());
			this.start = empty.start;
			this.activity.loader(false);
			this.activity.toggle();
		};

		this.build = function (data) {
			lezydata = data;
			info = new create(object);
			info.create();
			scroll.minus(info.render());
			html.append(info.render());
			html.append(scroll.render());
			data.slice(0, viewall ? data.length : 2).forEach(this.append.bind(this));
			this.activity.loader(false);
			this.activity.toggle();
		};

		this.background = function (elem) {
			var new_background = Lampa.Api.img(elem.backdrop_path, 'w1280');
			clearTimeout(background_timer);
			if (new_background == background_last) return;
			background_timer = setTimeout(function () {
				background_img.removeClass('loaded');

				background_img[0].onload = function () {
					background_img.addClass('loaded');
				};

				background_img[0].onerror = function () {
					background_img.removeClass('loaded');
				};

				background_last = new_background;
				setTimeout(function () {
					background_img[0].src = background_last;
				}, 300);
			}, 1000);
		};

		this.append = function (element) {
			var _this = this;

			if (element.ready) return;
			element.ready = true;
			var item = new Lampa.InteractionLine(element, {
				url: element.url,
				card_small: true,
				genres: object.genres,
				object: object,
				card_wide: true,
				nomore: element.nomore
			});
			item.create();
			item.onDown = this.down.bind(this);
			item.onUp = this.up.bind(this);
			item.onBack = this.back.bind(this);
			if (this.onMore) item.onMore = this.onMore.bind(this);

			item.onFocus = function (elem) {
				info.update(elem);

				_this.background(elem);
			};

			item.onFocusMore = info.empty.bind(info);
			scroll.append(item.render());
			items.push(item);
		};

		this.back = function () {
			Lampa.Activity.backward();
		};

		this.down = function () {
			active++;
			active = Math.min(active, items.length - 1);
			if (!viewall) lezydata.slice(0, active + 2).forEach(this.append.bind(this));
			items[active].toggle();
			scroll.update(items[active].render());
		};

		this.up = function () {
			active--;

			if (active < 0) {
				active = 0;
				Lampa.Controller.toggle('head');
			} else {
				items[active].toggle();
			}

			scroll.update(items[active].render());
		};

		this.start = function () {
			var _this2 = this;

			Lampa.Controller.add('content', {
				toggle: function toggle() {
					if (_this2.activity.canRefresh()) return false;

					if (items.length) {
						items[active].toggle();
					}
				},
				left: function left() {
					if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
				},
				right: function right() {
					Navigator.move('right');
				},
				up: function up() {
					if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
				},
				back: this.back
			});
			Lampa.Controller.toggle('content');
		};

		this.refresh = function () {
			this.activity.loader(true);
			this.activity.need_refresh = true;
		};

		this.pause = function () {};

		this.stop = function () {};

		this.render = function () {
			return html;
		};

		this.destroy = function () {
			network.clear();
			Lampa.Arrays.destroy(items);
			scroll.destroy();
			info.destroy();
			html.remove();
			items = null;
			network = null;
			lezydata = null;
		};
	}

	function startPlugin() {
		window.plugin_interface_ready = true;
		var old_interface = Lampa.InteractionMain;
		var new_interface = component;

		Lampa.InteractionMain = function (object) {
			var use = new_interface;
			if (!(object.source == 'tmdb' || object.source == 'cub')) use = old_interface;
			if (window.innerWidth < 767) use = old_interface;
			if (Lampa.Manifest.app_digital < 153) use = old_interface;
			return new use(object);
		};

		Lampa.Template.add('new_interface_style', "<style>\n.new-interface .card--small.card--wide{\n	width: 18.3em;\n}\n.new-interface-info{\n	position: relative;\n	padding: 1.5em;\n	height: 24em;\n}\n.new-interface-info__body{\n	width: 51%;\n	padding-top: 1.25em;\n}\n.new-interface-info__head{\n	color: rgba(255, 255, 255, 0.6);\n	margin-bottom: 0.5em;\n	font-size: 1.5em;\n}\n.new-interface-info__head span{\n	color: #fff;\n}\n.new-interface-info__title{\n	font-size: 3.5em;\n	font-weight: 300;\n	line-height: 1.26em;\n	margin-bottom: 0.2em;\n	overflow: hidden;\n	text-overflow: \".\";\n	display: -webkit-box;\n	-webkit-line-clamp: 2;\n	line-clamp: 2; \n	-webkit-box-orient: vertical;\n	margin-left: -0.05em;\n}\n.new-interface-info__details{\n	color: rgba(255, 255, 255, 0.6);\n	margin-bottom: 2em;\n	display: flex;\n	align-items: center;\n	flex-wrap: wrap;\n	min-height: 1.9em;\n}\n.new-interface-info__split{\n	margin: 0 1em;\n	font-size: 0.5em\n}\n.new-interface-info__description{\n	font-size: 1.2em;\n	font-weight: 300;\n	line-height: 1.5;\n	overflow: hidden;\n	text-overflow: \".\";\n	display: -webkit-box;\n	-webkit-line-clamp: 4;\n	line-clamp: 4; \n	-webkit-box-orient: vertical;\n}\n.new-interface .card-more__box{\n	padding-bottom: 95%;\n}\n.new-interface .full-start__background{\n	height: 108%;\n	top: -6em;\n}\n.new-interface .full-start__rate{\n	margin-right: 0;\n	margin-left: -0.25em;\n}\n.new-interface .full-start__rate > div:first-child{\n	padding: 0 1em;\n	background: rgba(255, 255, 255, 0.1);\n}\nbody.light--version .new-interface .full-start__rate > div:first-child{\n	font-size: 1em;\n	padding: 0;\n	margin-top: -0.1em;\n	margin-right: 0.2em;\n}\nbody.light--version .new-interface .full-start__rate > div:last-child{\n	font-size: 0.8em;\n	padding: 0;\n	opacity: 0.7;\n}\nbody.light--version .new-interface-info__body{\n	width: 69%;\n	padding-top: 1.5em;\n}\nbody.light--version .new-interface-info{\n	height: 25.3em;\n}\nbody {\n	background: #000;\n}\n.menu__item{\n	color: #eee;\n}\n.menu__item:after{\n	display: block;\n	position: absolute;\n	display: none;\n	top: 3em;\n	left: 0.46em;\n	width: 1.6em;\n	height: 4px;\n	background-color: #e50914;\n	margin-left: 1.6em;\n}\n.menu__item.focus {\n	background: none;\n}\n.menu__item.focus:after {\n	display: block;\n}\n.menu__ico{\n	margin-left: 0.45em;\n	margin-right: 1.5em;\n	width: 1.75em;\n	height: 1.75em;\n}\n.menu__split {\n	margin: 1em 1.7em;\n}\n.menu__text{\n	opacity: 0.5;\n}\n.menu__item.focus .menu__text{\n	opacity: 1.0;\n}\n.settings__content, .selectbox__content{\n	background: #1a1a1a;\n}\n.settings-folder__name{\n	line-height: 1.4;\n}\n.modal__content{\n	background-color: #1a1a1a;\n}\n.activity__loader {\n	fill: #e50914;\n	filter: invert(80%) sepia(80%) saturate(5000%) hue-rotate(350deg) brightness(100%) contrast(100%);\n}\n</style>");
		$('body').append(Lampa.Template.get('new_interface_style', {}, true));
	}

	if (!window.plugin_interface_ready) startPlugin();
	
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
				var ico = '<svg version="1.1" id="exit" color="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n<g>\n	<path fill="currentColor" d="M256,5.1c138.6,0,250.9,112.3,250.9,250.9S394.6,506.9,256,506.9S5.1,394.6,5.1,256S117.4,5.1,256,5.1z\n		 M256,40.1C136.7,40.1,40.1,136.7,40.1,256S136.7,471.9,256,471.9S471.9,375.3,471.9,256S375.3,40.1,256,40.1z M311.4,176.6\n		c6.7-6.7,17.5-6.7,24.2,0c6.7,6.7,6.7,17.5,0,24.2l-55.1,55.1l55.1,55c6.7,6.7,6.7,17.5,0,24.2c-6.7,6.7-17.5,6.7-24.2,0L256.3,280\n		l-55.1,55.1c-6,6-15.4,6.6-22.1,1.8l-2.2-1.8c-6.7-6.7-6.7-17.5,0-24.2l55.1-55l-55.1-55c-6.7-6.7-6.7-17.5,0-24.2s17.5-6.7,24.2,0\n		l55.1,55.1L311.4,176.6z"/>\n</g>\n</svg>';
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
