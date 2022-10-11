// http://newtv.mail66.org/tv.js
(function() {
	'use strict';
	
	Lampa.Lang.add({
		tv_menu: {
			ru: 'IP-ТВ',
			en: 'IPTV',
			uk: 'IPTV',
			be: 'IPTV',
			zh: 'IPTV',
			pt: 'IPTV'
		}
	});

	function iptvskaz_n(object) {
		var network = new Lampa.Reguest();
		var scroll = new Lampa.Scroll({ mask: true, over: true, step: 250 });
		var items = [];
		var html = $('');
		var body = $('');
		var info = null;
		var last = null;
		var catalogs = [
			{ title: 'Все каналы', url: 'http://newtv.mail66.org/tv2.json' },
			{ title: 'Федеральные', url: 'http://newtv.mail66.org/tv2.json?gr=tv' },
			{ title: 'Детские', url: 'http://newtv.mail66.org/tv2.json?gr=%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B5' },
			{ title: 'Развлекательные', url: 'http://newtv.mail66.org/tv2.json?gr=%D1%80%D0%B0%D0%B7%D0%B2%D0%BB%D0%B5%D0%BA%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5' },
			{ title: 'Спортивные', url: 'http://newtv.mail66.org/tv2.json?gr=%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B5' },
			{ title: 'Фильмы', url: 'http://newtv.mail66.org/tv2.json?gr=%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D1%8B' },
			{ title: 'Научные', url: 'http://newtv.mail66.org/tv2.json?gr=%D0%BD%D0%B0%D1%83%D1%87%D0%BD%D1%8B%D0%B5' },
			{ title: 'Музыка', url: 'http://newtv.mail66.org/tv2.json?gr=%D0%BC%D1%83%D0%B7%D1%8B%D0%BA%D0%B0' },
			{ title: 'Хобби', url: 'http://newtv.mail66.org/tv2.json?gr=%D1%85%D0%BE%D0%B1%D0%B1%D0%B8' }
		];
		this.create = function() {
			var _this = this;
			this.activity.loader(true);
			network.silent(object.url, this.build.bind(this), function() {
				var empty = new Lampa.Empty();
				html.append(empty.render());
				_this.start = empty.start;
				_this.activity.loader(false);
				_this.activity.toggle();
			});
			return this.render();
		};
		this.append = function (data) {
			var _this3 = this;
			data.forEach(function (element) {
				var card = Lampa.Template.get('card', { title: element.tvtitle, release_year: '' });
				$('.info').css('height','4em');
				card.addClass('card--collection');
				if (!element.tvshift) element.tvshift = 0;
				card.addClass('card-id-'+element.tvid+'_'+element.tvshift);
				card.find('.card__img').css({ 'cursor': 'pointer', 'background-color': '#353535a6' });
				card.find('.card__age').css({ 'margin-top': '0.2em' });
				var img = card.find('.card__img')[0];
				img.onload = function () { card.addClass('card--loaded'); };
				img.onerror = function (e) { };
				img.src = element.tvlogo;
				card.on('hover:focus', function () {
					last = card[0];
					scroll.update(card, true);
					info.find('.info__title').text(element.tvtitle);
					info.find('.info__title-original').text(element.tvgroup); 
				});
				card.on('hover:enter', function () {
					var video = { title: element.tvtitle, url: element.tvmedia };
					Lampa.Player.play(video);
					var playlist = [];
					var i = 1;
					data.forEach(function (elem) {
						playlist.push({ title: i + ' - ' + elem.tvtitle, url: elem.tvmedia }); i++; });
						//Lampa.Storage.set('player_hls_method','application');
						Lampa.Player.playlist(playlist);
						$('.noti').html(element.tvid+'_'+element.tvshift);
						if ($('.player-info__body')[0]) {
							if (Lampa.Player.render().find('#title_epg').length === 0) Lampa.Player.render().find('.player-info__name').append('');
							parseOne($('.noti').html());
						}
					});
					body.append(card);
					items.push(card);
				});
			};
			var skset1 = setInterval(function () {
				if ($('.player-info__body')[0]) {
					parseOne($('.noti').html());
				} else {
					parseEpg();
				}
			}, 60000);
			var parseOne = function (str) {
				$.get('http://newtv.mail66.org/2.php?ids='+str, function(data, status){
					Lampa.Player.render().find('#title_epg').text(' - Сейчас: ' + data);
				});
			}
			var parseEpg = function (str) {
				if (!$('.player-info__body')[0]) {
					return new Promise(function (resolve, reject) {
						network.clear();
						network.timeout(60000);
						var DOM = 'http://newtv.mail66.org/2.php';
						network.silent(DOM, function (json) {
							var obj = JSON.parse(json, function (key, value) {
								$('.card-id-'+key+' > .card__age').html(value);
							});
						}, function (a, c) { });
					});
				}
			};
			this.build = function(data) {
				var _this2 = this;
				Lampa.Template.add('button_category', "Разделы\n ");
				Lampa.Template.add('info_radio', '()');
				var btn = Lampa.Template.get('button_category');
				info = Lampa.Template.get('info_radio');
				info.find('#stantion_filtr').append(btn);
				info.find('.view--category').on('hover: enter hover: click', function () {
					_this2.selectGroup();
				});
				scroll.render().addClass('layer--wheight').data('mheight', info);
				html.append(info.append());
				html.append(scroll.render());
				this.append(data);
				scroll.append(body);
				this.activity.loader(false);
				this.activity.toggle();
				parseEpg();
			};
			this.selectGroup = function () {
				Lampa.Select.show({
					title: 'Плейлист',
					items: catalogs,
					onSelect: function onSelect(a) {
						Lampa.Activity.push({ url: a.url, title: a.tvmedia, component: 'iptvskaz_n', page: 1 });
					},
					onBack: function onBack() {
						Lampa.Controller.toggle('content');
						parseEpg();
					}
				});
			};
			this.start = function () {
				var _this = this;
				Lampa.Controller.add('content', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(scroll.render());
					Lampa.Controller.collectionFocus(last || false, scroll.render());
				},
				left: function left() {
					if (Navigator.canmove('left'))
						Navigator.move('left');
					else
						Lampa.Controller.toggle('menu');
				},
				right: function right() {
					if (Navigator.canmove('right '))
						Navigator.move('right ');
					else
						_this.selectGroup();
				},
				up: function up() {
					if (Navigator.canmove('up')) {
						Navigator.move('up');
					} else {
						if (!info.find('.view--category ').hasClass('focus')) {
							if (!info.find('.view--category ').hasClass('focus')) {
								Lampa.Controller.collectionSet(info);
								Navigator.move('right')
							}
						} else 
							Lampa.Controller.toggle('head');
					}
				},
				down: function down() {
					if (Navigator.canmove('down'))
						Navigator.move('down');
					else
						if (info.find('.view--category ').hasClass('focus')) {
							Lampa.Controller.toggle('content');
						}
				},
				back: function back() {
					Lampa.Activity.backward();
				}
			});
			Lampa.Controller.toggle('content');
		};
		this.pause = function() {
			clearInterval(skset1);
			skset1=null;
		};
		this.stop = function() {};
		this.render = function() { return html; };
		this.destroy = function() {
			network.clear();
			scroll.destroy();
			if (info) info.remove();
			html.remove();
			body.remove();
			network = null;
			items = null;
			html = null;
			body = null;
			info = null;
		};
	}
		
	function iptv_skaz() {
		window.plugin_iptvskaz_n_ready = true;
		Lampa.Component.add('iptvskaz_n', iptvskaz_n);
		Lampa.Listener.follow('app', function(r) {
			if (r.type == 'ready') {
				var icos = '';
				var mtitle = Lampa.Lang.translate('tv_menu');
				var menu_itemss = $('' + icos + 'ТВ');
				menu_itemss.on('hover: enter', function() {
					Lampa.Activity.push({
						url: 'http://newtv.mail66.org/tv2.json',
						title: 'ТВ',
						component: 'iptvskaz_n',
						page: 1
					});
				});
				$('.menu .menu__list').eq(0).append(menu_itemss);
			}
		});
	}

	if (!window.plugin_iptvskaz_n_ready) iptv_skaz();

})();