// https://cub.watch/plugin/iptv

(function () {
		'use strict';

		function Api() {
			var network = new Lampa.Reguest();
			var api_url = 'http://cub.watch/api/iptv/'; //let api_url = 'http://localhost:3100/api/iptv/'

			this.get = function (method) {
				return new Promise(function (resolve, reject) {
					//var account = Lampa.Storage.get('account', '{}');
					//console.log("account.token: " + account.token + " profile: " + account.profile.id);
					//if (account.token) {
						network.silent(api_url + method, resolve, reject, false, {
							headers: {
								token: 'eyJpZCI6MjExNDF9.WQl+KH5ZLHhV+1VToXOGe/8zSIqV7Cmrl+rXFtajOYc=',//account.token,
								profile: '22856'//account.profile.id
							}
						});
					//} else {
					//	reject();
					//}
				});
			};

			this.destroy = function () {
				network.clear();
			};
		}

		function Component(object) {
			var _self = this;

			var api = new Api();
			var event = new Lampa.Event();
			var html = $('<div></div>');
			var zone = 0;
			var channels_list = [];
			var channels_page = 0;
			var element_last_focus;
			var program_last_result = {
				id: 0,
				data: {}
			};
			var html_content = Lampa.Template.get('iptv_content');
			var html_menu = Lampa.Template.get('iptv_menu');
			var html_details = Lampa.Template.get('iptv_details');
			var html_channels = Lampa.Template.get('iptv_channels');
			var scroll_menu = new Lampa.Scroll({
				mask: true,
				over: true
			});
			var scroll_channels = new Lampa.Scroll({
				mask: true,
				over: true
			});
			var scroll_details = new Lampa.Scroll({
				mask: true,
				over: true
			});
			scroll_channels.render().find('.scroll__body').addClass('notransition');

			this.create = function () {
				this.activity.loader(true);
				this.start = this.controllerList.bind(this);
//				if (window.innerWidth < 767) this.empty(); else {
					api.get('list').then(this.list.bind(this)).then(function (id) {
						return api.get('playlist/' + id);
					}).then(this.build.bind(this))["catch"](this.empty.bind(this));
//				}
				return this.render();
			};

			this.background = function () {
				Lampa.Background.immediately('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC');
			};

			this.list = function (data) {
				var _this = this;

				return new Promise(function (resolve, reject) {
					if (data.list.length > 1) {
						console.log("data.list: " + data.list.toString()); 
						var html_list = Lampa.Template.get('iptv_list');
						data.list.reverse().forEach(function (item) {
							var li = $('<div class="iptv-list__item selector">' + (item.name || Lampa.Lang.translate('player_playlist')) + '</div>');
							li.on('hover:enter', function () {
								_this.activity.loader(true);

								resolve(item.id);
							});
							html_list.find('.iptv-list__items').append(li);
						});
						html.append(html_list);

						_this.activity.loader(false);

						_this.start = _this.controllerList.bind(_this);

						_this.activity.toggle();
					} else if (data.list.length == 1) {
						resolve(data.list[0].id);
					} else reject();
				});
			};

			this.empty = function () {
				var empty = new Lampa.Empty();
				html.empty();
				html.append(empty.render());
				this.start = empty.start;
				this.activity.loader(false);
				this.activity.toggle();
			};

			this.program = function (title, list) {
				var body = $("\n						<div class=\"iptv-details__program-body\">\n								<div class=\"iptv-details__program-title\">".concat(title, "</div>\n								<div class=\"iptv-details__program-list\"></div>\n						</div>\n				"));
				list.forEach(function (item) {
					var li = $("<div class=\"iptv-program selector\">\n								 <div class=\"iptv-program__time\">".concat(Lampa.Utils.parseTime(item.start).time, "</div>\n								 <div class=\"iptv-program__body\">\n										 <div class=\"iptv-program__title\">").concat(item.title, "</div>\n								 </div>\n						 </div>"));
					li.on('hover:focus', function (e, is_mouse) {
						element_last_focus = li[0];
						if (!is_mouse) scroll_details.update(li, true);
					});
					body.find('.iptv-details__program-list').append(li);
				});
				return body;
			};

			this.details = function (channel) {
				var _this2 = this;

				html_details.find('.iptv-details__title').text(channel.name);
				var prog = html_details.find('.iptv-details__program').empty();
				var load = $('<div class="iptv-details__program-loading">' + Lampa.Lang.translate('loading') + '...</div>');
				prog.append(load);
				scroll_details.reset();

				if (channel.id) {
					var draw = function draw(data) {
						if (data.result) {
							load.remove();

							var now = _this2.program(Lampa.Lang.translate('iptv_now'), data.result.slice(0, 1));

							var later = _this2.program(Lampa.Lang.translate('iptv_later'), data.result.slice(1));

							prog.append(now).append(later);
						} else {
							load.remove();
						}
					};

					if (program_last_result.name == channel.name) draw(program_last_result.data); else {
						var time = new Date();
						var offset = channel.name.match(/([+|-]\d)$/);

						if (offset && channel.similar) {
							time.setHours(time.getHours() + parseInt(offset[1]));
						}

						event.call('program', {
							channel_id: channel.id,
							time: time.getTime()
						}, function (data) {
							program_last_result.id = channel.id;
							program_last_result.data = data;
							program_last_result.name = channel.name;

							if (offset && channel.similar) {
								data.result.forEach(function (item) {
									item.start = item.start - parseInt(offset[1]) * 3600000;
									item.stop = item.stop - parseInt(offset[1]) * 3600000;
								});
							}

							draw(program_last_result.data);
						});
					}
				} else {
					load.remove();
				}
			};

			this.removeIco = function (channel) {
				var ico = channel.data('ico');
				ico.onerror = null;
				ico.onload = null;
				ico.src = '';
			};

			this.channelsDisplay = function (prev_focus, need_focus) {
				var _this3 = this;

				var limit = 20;
				var position = channels_page * limit;
				var start = Math.max(0, position - limit);
				var channels = channels_list.slice(start, position + limit + 4);
				var last_focus = 0;
				html_channels.find('.selector').each(function () {
					var channel = $(this);

					if (!channels.find(function (a) {
						return a.index == channel.data('position');
					})) {
						_self.removeIco(channel);

						channel.remove();
					}
				});

				var createPlaylist = function createPlaylist(current) {
					var playlist = [];
					var index = channels_list.indexOf(current);
					var start = Math.max(0, index - 50);
					var end = 100 - (index - start);
					channels_list.slice(start, index + end).forEach(function (item) {
						var cell = {
							title: item.name,
							url: item.url,
							tv: true,
							callback: function callback() {
								Lampa.Player.playlist(createPlaylist(item));
							}
						};

						if (item.logo) {
							cell.icon = '<img src="' + item.logo + '" />';
							cell.template = 'selectbox_icon';
						}

						playlist.push(cell);
					});
					return playlist;
				};

				channels.forEach(function (item) {
					if (html_channels.find('[data-position="' + item.index + '"]').length) return;
					var channel = $('<div class="iptv-channel selector" data-position="' + item.index + '"><div class="iptv-channel__body"><img src="" class="iptv-channel__ico" /></div></div>');
					var ico = channel.find('.iptv-channel__ico')[0];

					ico.onerror = function () {
						channel.find('.iptv-channel__body').empty().append('<div class="iptv-channel__name">' + item.name + '</div>');
					};

					ico.onload = function () {
						channel.addClass('loaded');
					};

					channel.data('ico', ico);
					channel.on('hover:enter', function () {
						var playlist = createPlaylist(item);
						Lampa.Player.play({
							title: item.name,
							url: item.url,
							tv: true
						});
						Lampa.Player.playlist(playlist);
					});
					channel.on('hover:focus', function (e, is_mouse) {
						var page = Math.round(item.index / limit);

						if (page != channels_page && !is_mouse) {
							channels_page = page;

							_this3.channelsDisplay(last_focus, item.index);
						} else {
							if (!is_mouse) scroll_channels.update(channel);

							_this3.details(item);

							last_focus = item.index;
							element_last_focus = channel[0];
							html_channels.find('.last--focus').removeClass('last--focus');
							channel.addClass('last--focus');
						}
					});
					if (item.logo) ico.src = item.logo; else ico.onerror();
					html_channels.append(channel);
				});
				html_channels.find('.selector').sort(function (a, b) {
					return $(a).attr('data-position') - $(b).attr('data-position');
				}).appendTo(html_channels);
				var focus = need_focus || 0;
				Lampa.Controller.collectionSet(this.render());

				if (typeof need_focus !== 'undefined') {
					Lampa.Controller.collectionFocus(html_channels.find('[data-position="' + focus + '"]')[0], this.render());
				} else {
					scroll_channels.update(html_channels.find('[data-position="0"]'));
					this.details(channels[0]);
				}
			};

			this.channels = function (channels) {
				channels_list = channels.map(function (a, i) {
					a.index = i;
					return a;
				});
				channels_page = 0;
				html_channels.find('.selector').each(function () {
					_self.removeIco($(this));
				});
				html_channels.empty();
				scroll_channels.reset();
				this.channelsDisplay();
			};

			this.build = function (data) {
				var _this4 = this;

				html.empty();
				html_menu.find('.iptv-menu__title').text(data.name || Lampa.Lang.translate('player_playlist'));
				data.playlist.menu.forEach(function (menu, i) {
					if (menu.count == 0) return;
					var li = $('<div class="iptv-menu__list-item selector">' + (menu.name || Lampa.Lang.translate('iptv_all_channels')) + '<span>' + menu.count + '</span></div>');
					li.on('hover:enter', function (e, is_mouse) {
						_this4.channels(menu.name ? data.playlist.channels.filter(function (a) {
							return a.group == menu.name;
						}) : data.playlist.channels);

						html_menu.find('.active').removeClass('active');
						li.addClass('active');
						Lampa.Controller.collectionFocus(li[0], html_menu);
						html_details.find('.iptv-details__group').text(menu.name || Lampa.Lang.translate('iptv_all_channels'));
					});
					li.on('hover:focus', function () {
						scroll_menu.update(li, true);
						element_last_focus = li[0];
						html_menu.find('.last--focus').removeClass('last--focus');
						li.addClass('last--focus');
					});
					html_menu.find('.iptv-menu__list').append(li);
				});
				html_menu.find('.iptv-menu__list .selector').eq(0).trigger('hover:enter');
				scroll_menu.append(html_menu);
				scroll_menu.minus();
				scroll_channels.append(html_channels);
				scroll_channels.minus();
				scroll_details.append(html_details);
				scroll_details.minus();
				html_content.find('.iptv-content__menu').append(scroll_menu.render());
				html_content.find('.iptv-content__channels').append(scroll_channels.render());
				html_content.find('.iptv-content__details').append(scroll_details.render());
				html.append(html_content);
				this.activity.loader(false);
				this.start = this.controllerChannels.bind(this);
				this.activity.toggle();
			};

			this.back = function () {
				Lampa.Activity.backward();
			};

			this.toZone = function (dir) {
				zone = Math.max(-1, Math.min(2, zone + dir));

				if (zone == -1) {
					Lampa.Controller.toggle('menu');
					zone = 0;
				} else if (zone == 0) {
					var last = html_menu.find('.last--focus');
					Lampa.Controller.collectionSet(html_menu);
					Lampa.Controller.collectionFocus(last.length ? last[0] : false, html_menu);
				} else if (zone == 1) {
					var _last = html_channels.find('.last--focus');

					Lampa.Controller.collectionSet(html_channels);
					Lampa.Controller.collectionFocus(_last.length ? _last[0] : false, html_channels);
				} else {
					var any = html_details.find('.selector');
					Lampa.Controller.collectionSet(html_details);
					Lampa.Controller.collectionFocus(any.length ? any[0] : false, html_details);
				}
			};

			this.controllerChannels = function () {
				var _this5 = this;

				if (Lampa.Activity.active().activity !== this.activity) return;
				this.background();
				Lampa.Controller.add('content', {
					toggle: function toggle() {
						Lampa.Controller.collectionSet(_this5.render());
						Lampa.Controller.collectionFocus(element_last_focus, _this5.render());
					},
					left: function left() {
						_this5.toZone(-1);
					},
					right: function right() {
						_this5.toZone(1);
					},
					up: function up() {
						if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
					},
					down: function down() {
						if (Navigator.canmove('down')) Navigator.move('down');
					},
					back: function back() {
						Lampa.Activity.replace();
					}
				});
				Lampa.Controller.toggle('content');
			};

			this.controllerList = function () {
				var _this6 = this;

				if (Lampa.Activity.active().activity !== this.activity) return;
				this.background();
				Lampa.Controller.add('content', {
					toggle: function toggle() {
						Lampa.Controller.collectionSet(_this6.render());
						Lampa.Controller.collectionFocus(element_last_focus, _this6.render());
					},
					left: function left() {
						if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
					},
					right: function right() {
						if (Navigator.canmove('right')) Navigator.move('right');else Lampa.Controller.toggle('right');
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

			this.start = function () {};

			this.pause = function () {};

			this.stop = function () {};

			this.render = function () {
				return html;
			};

			this.destroy = function () {
				api.destroy();
				html_channels.find('.selector').each(function () {
					_self.removeIco($(this));
				});
				scroll_menu.destroy();
				scroll_channels.destroy();
				scroll_details.destroy();
				channels_list = [];
				html.empty();
			};
		}

		Lampa.Lang.add({
			iptv_select_playlist: {
				ru: 'Выберите плейлист',
				uk: 'Виберіть плейлист',
				be: 'Выберыце плэйліст'
			},
			iptv_all_channels: {
				ru: 'Все каналы',
				uk: 'Усі канали',
				be: 'Усе каналы'
			},
			iptv_now: {
				ru: 'Сейчас',
				uk: 'Зараз',
				be: 'Цяпер'
			},
			iptv_later: {
				ru: 'Далее',
				uk: 'Потім',
				be: 'Потым'
			},
			iptv_title: {
				ru: 'IP-ТВ',
				uk: 'IP-ТВ',
				en: 'IPTV',
				be: 'IP-ТВ'
			}
		});

		function startPlugin() {
			window.plugin_iptv_ready = true;
			Lampa.Component.add('iptv', Component);
			Lampa.Template.add('iptv_content', "\n				<div class=\"iptv-content\">\n						<div class=\"iptv-content__menu\"></div>\n						<div class=\"iptv-content__channels\"></div>\n						<div class=\"iptv-content__details\"></div>\n				 </div>\n		 ");
			Lampa.Template.add('iptv_menu', "\n				 <div class=\"iptv-menu\">\n						<div class=\"iptv-menu__body\">\n								 <div class=\"iptv-menu__title\"></div>\n								 <div class=\"iptv-menu__list\"></div>\n						</div>\n				</div>\n		");
			Lampa.Template.add('iptv_channels', "\n				 <div class=\"iptv-channels\">\n						\n				</div>\n		");
			Lampa.Template.add('iptv_details', "\n				<div class=\"iptv-details\">\n						<div class=\"iptv-details__group\"></div>\n						 <div class=\"iptv-details__title\"></div>\n\n						<div class=\"iptv-details__program\">\n\n						 </div>\n				 </div>\n		 ");
			Lampa.Template.add('iptv_list', "\n				 <div class=\"iptv-list layer--height\">\n						<div class=\"iptv-list__ico\">\n								<svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n										<rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n										 <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n										 <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n										 <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n								</svg>\n						</div>\n						<div class=\"iptv-list__title\">#{iptv_select_playlist}</div>\n						 <div class=\"iptv-list__items\"></div>\n				 </div>\n		 ");
			Lampa.Template.add('iptv_style', "<style>\n	.iptv-list{\n		padding:1.5em;\n		display:-webkit-box;\n		display:-webkit-flex;\n		display:-moz-box;\n		display:-ms-flexbox;\n		display:flex;\n		-webkit-box-align:center;\n		-webkit-align-items:center;\n		-moz-box-align:center;\n		-ms-flex-align:center;\n		align-items:center;\n		-webkit-box-pack:center;\n		-webkit-justify-content:center;\n		-moz-box-pack:center;\n		-ms-flex-pack:center;\n		justify-content:center;\n		-webkit-box-orient:vertical;\n		-webkit-box-direction:normal;\n		-webkit-flex-direction:column;\n		-moz-box-orient:vertical;\n		-moz-box-direction:normal;\n		-ms-flex-direction:column;\n		flex-direction:column;\n		padding-bottom:1em}\n	.iptv-list__ico{\n		width:6em;\n		margin-bottom:2em\n	}\n	.iptv-list__title{\n		font-size:1.9em;\n		margin-bottom:1em\n	}\n	.iptv-list__items{\n		display:-webkit-box;\n		display:-webkit-flex;\n		display:-moz-box;\n		display:-ms-flexbox;\n		display:flex;\n		-webkit-flex-wrap:wrap;\n		-ms-flex-wrap:wrap;\n		flex-wrap:wrap;\n		-webkit-box-pack:center;\n		-webkit-justify-content:center;\n		-moz-box-pack:center;\n		-ms-flex-pack:center;\n		justify-content:center;\n		-webkit-box-align:center;\n		-webkit-align-items:center;\n		-moz-box-align:center;\n		-ms-flex-align:center;\n		align-items:center;\n		width:100%;\n		margin:0 auto\n	}\n	.iptv-list__item{\n		display:-webkit-box;\n		display:-webkit-flex;\n		display:-moz-box;\n		display:-ms-flexbox;\n		display:flex;\n		-webkit-box-align:center;\n		-webkit-align-items:center;\n		-moz-box-align:center;\n		-ms-flex-align:center;\n		align-items:center;\n		-webkit-box-pack:center;\n		-webkit-justify-content:center;\n		-moz-box-pack:center;\n		-ms-flex-pack:center;\n		justify-content:center;\n		text-align:center;\n		word-break:break-all;\n		padding:1em;\n		background-color:rgba(255,255,255,0.1);\n		width:10em;\n		height:6em;\n		font-size:1.3em;\n		line-height:1.3;\n		-webkit-border-radius:.3em;\n		-moz-border-radius:.3em;\n		border-radius:.3em;\n		margin:1em\n	}\n	.iptv-list__item.focus{\n		background-color:#fff;\n		color:black\n	}\n	.iptv-content{\n		display:-webkit-box;\n		display:-webkit-flex;\n		display:-moz-box;\n		display:-ms-flexbox;\n		display:flex;\n		padding:0 1.5em;\n		line-height:1.3\n	}\n	.iptv-content>div{\n		-webkit-flex-shrink:0;\n		-ms-flex-negative:0;\n		flex-shrink:0\n	}\n	.iptv-content__menu{\n		width:30%;\n		padding-right:4em\n	}\n	.iptv-content__channels{\n		width:20%\n	}\n	.iptv-content__details{\n		width:50%;\n		padding-left:4em\n	}\n	.iptv-menu__title{\n		font-size:2.4em;\n		font-weight:300;\n		margin-bottom:1em\n	}\n	.iptv-menu__list-item{\n		color:rgba(255,255,255,0.6);\n		font-size:1.4em;\n		font-weight:300;\n		position:relative;\n		padding:.5em .8em;\n		display:-webkit-box;\n		display:-webkit-flex;\n		display:-moz-box;\n		display:-ms-flexbox;\n		display:flex\n	}\n	.iptv-menu__list-item>span{\n		-webkit-flex-shrink:0;\n		-ms-flex-negative:0;\n		flex-shrink:0;\n		padding-left:1em;\n		margin-left:auto\n	}\n	.iptv-menu__list-item.active{\n		color:#fff;\n		background-color:rgba(255,255,255,0.1);\n		-webkit-border-radius:.2em;\n		-moz-border-radius:.2em;\n		border-radius:.2em\n	}\n	.iptv-menu__list-item.focus{\n		color:#000;\n		background-color:white;\n		-webkit-border-radius:.2em;\n		-moz-border-radius:.2em;\n		border-radius:.2em\n	}\n	.iptv-menu__list>div+div{\n		margin-top:.3em\n	}\n	.iptv-channels{\n		padding:1em\n	}\n	.iptv-channel{\n		background-color:#464646;\n		-webkit-border-radius:.3em;\n		-moz-border-radius:.3em;\n		border-radius:.3em;\n		padding-bottom:52%;\n		position:relative\n	}\n	.iptv-channel__body{\n		position:absolute;\n		top:0;\n		left:0;\n		right:0;\n		bottom:0;\n		display:-webkit-box;\n		display:-webkit-flex;\n		display:-moz-box;\n		display:-ms-flexbox;\n		display:flex;\n		-webkit-box-align:center;\n		-webkit-align-items:center;\n		-moz-box-align:center;\n		-ms-flex-align:center;\n		align-items:center;\n		-webkit-box-pack:center;\n		-webkit-justify-content:center;\n		-moz-box-pack:center;\n		-ms-flex-pack:center;\n		justify-content:center;\n		-webkit-box-orient:vertical;\n		-webkit-box-direction:normal;\n		-webkit-flex-direction:column;\n		-moz-box-orient:vertical;\n		-moz-box-direction:normal;\n		-ms-flex-direction:column;\n		flex-direction:column;\n		padding:1em 3em\n	}\n	.iptv-channel__ico{\n		width:80%;\n		opacity:0\n	}\n	.iptv-channel__name{\n		text-align:center;\n		font-size:1.2em\n	}\n	.iptv-channel.loaded .iptv-channel__ico{\n		opacity:1\n	}\n	.iptv-channel.focus::after,.iptv-channel.last--focus::after{\n		content:'';\n		position:absolute;\n		top:-0.6em;\n		left:-0.6em;\n		right:-0.6em;\n		bottom:-0.6em;\n		border:.3em solid #fff;\n		-webkit-border-radius:.8em;\n		-moz-border-radius:.8em;\n		border-radius:.8em;\n		opacity:.4\n	}\n	.iptv-channel.focus::after{\n		opacity:1\n	}\n	.iptv-channel+.iptv-channel{\n		margin-top:1em\n	}\n	.iptv-details__group{\n		font-size:1.3em;\n		margin-bottom:.9em;\n		opacity:.5\n	}\n	.iptv-details__title{\n		font-size:4em;\n		font-weight:400\n	}\n	.iptv-details__program{\n		padding-top:4em\n	}\n	.iptv-details__program-title{\n		font-size:1.2em;\n		padding-left:4.9em;\n		margin-bottom:1em;\n		opacity:.5\n	}\n	.iptv-details__program-list>div+div{\n		margin-top:1.6em\n	}\n	.iptv-details__program>div+div{\n		margin-top:2em\n	}\n	.iptv-program{\n		display:-webkit-box;\n		display:-webkit-flex;\n		display:-moz-box;\n		display:-ms-flexbox;\n		display:flex;\n		font-size:1.2em;\n		font-weight:300\n	}\n	.iptv-program__time{\n		-webkit-flex-shrink:0;\n		-ms-flex-negative:0;\n		flex-shrink:0;\n		width:5em;\n		position:relative\n	}\n	.iptv-program.focus .iptv-program__time::after{\n		content:'';\n		position:absolute;\n		top:.5em;\n		right:.9em;\n		width:.4em;\n		background-color:#fff;\n		height:.4em;\n		-webkit-border-radius:100%;\n		-moz-border-radius:100%;\n		border-radius:100%;\n		margin-top:-0.1em;\n		font-size:1.2em\n	}\n	body.light--version .iptv-content{\n		font-size:.9em\n	}\n</style>\n");

			function add() {
				var button = $("<li class=\"menu__item selector\" data-action=\"iptv\">\n								 <div class=\"menu__ico\">\n										<svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n												<rect x=\"2\" y=\"8\" width=\"34\" height=\"21\" rx=\"3\" stroke=\"white\" stroke-width=\"3\"/>\n												 <line x1=\"13.0925\" y1=\"2.34874\" x2=\"16.3487\" y2=\"6.90754\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n												 <line x1=\"1.5\" y1=\"-1.5\" x2=\"9.31665\" y2=\"-1.5\" transform=\"matrix(-0.757816 0.652468 0.652468 0.757816 26.197 2)\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n												 <line x1=\"9.5\" y1=\"34.5\" x2=\"29.5\" y2=\"34.5\" stroke=\"white\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n										</svg>\n								</div>\n								<div class=\"menu__text\">" + Lampa.Lang.translate('iptv_title') + "</div>\n						</li>");
				button.on('hover:enter', function () {
					Lampa.Activity.push({
						url: '',
						title: 'IPTV',
						component: 'iptv',
						page: 1
					});
				});
				$('.menu .menu__list').eq(0).append(button);
				$('body').append(Lampa.Template.get('iptv_style', {}, true));
			}

			if (window.appready) add();else {
				Lampa.Listener.follow('app', function (e) {
					if (e.type == 'ready') add();
				});
			}
		}

		if (!window.plugin_iptv_ready && Lampa.Manifest.app_digital >= 154) startPlugin();

})();
