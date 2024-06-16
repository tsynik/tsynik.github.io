// Radio SomaFM by @tsynik
// https://somafm.com/channels.xml
// https://somafm.com/channels.json
// https://github.com/rainner/soma-fm-player
(function () {
  'use strict';

  var api_url = 'https://somafm.com/channels.json';
  var genres_url = 'https://tsynik.github.io/lampa/genres.json';
  var logo = '<svg enable-background="new 0 0 284 80.7" viewBox="0 0 284 80.7" xmlns="http://www.w3.org/2000/svg"><g fill="#ed1f24"><path d="m-474.8-759.5h14.7c2.3 0 4.3.7 6.1 2 1.8 1.4 2.6 2.7 2.6 4 0 .9-.3 1.7-1 2.3-.6.6-1.4.9-2.1.9-1 0-1.9-.5-2.8-1.4-.8-.9-1.7-1.4-2.6-1.4h-14.4c-1.4 0-2.1.6-2.1 1.7 0 .8.5 1.4 1.4 1.8l17 7.6c1.7.8 3.1 2 4.2 3.7s1.7 3.6 1.7 5.6c0 2.7-1 5.1-2.9 7s-4.1 2.9-6.6 2.9h-13c-2.2 0-4.3-.7-6.2-2-1.9-1.4-2.9-2.7-2.9-3.9 0-.8.3-1.6.9-2.2.6-.7 1.4-1 2.4-1 .8 0 1.7.5 2.6 1.4s2.3 1.4 4 1.4h11.9c.9 0 1.7-.4 2.4-1.1.6-.7 1-1.6 1-2.5 0-1.4-.7-2.5-2.1-3.1l-17.2-7.7c-1.7-.7-2.9-1.8-3.8-3.2s-1.3-2.8-1.3-4.3c0-2.3.8-4.3 2.4-6 1.4-1.6 3.4-2.5 5.7-2.5" transform="translate(509.62346 785.52008)"/><path d="m-474.8-752.4c-2.7-2.4-5.5-3.6-8.4-3.6h-7.5c-3.1 0-5.9 1.2-8.5 3.7s-3.9 5.1-3.9 7.9v13.5c0 2.8 1.3 5.4 4 7.9s5.5 3.7 8.4 3.7h7.5c2.9 0 5.7-1.2 8.4-3.7 2.7-2.4 4.1-5.1 4.1-8v-13.5c0-2.7-1.4-5.4-4.1-7.9m-20.6 5.8 2.2-1.9c.8-.7 1.9-1 3.3-1h6.6c1 0 1.9.3 2.7 1l2.2 1.8c.8.6 1.2 1.5 1.2 2.8v12.9c0 1.1-.4 1.9-1.2 2.6l-1.9 1.7c-.9.8-1.9 1.2-3 1.2h-7.4c-1 0-1.7-.2-2.2-.7l-2.4-2.1c-.8-.7-1.3-1.6-1.3-2.8v-12.9c.1-1.1.5-2 1.2-2.6" transform="translate(564.37836 781.97068)"/><path d="m-474.8-692.2v-30.4c0-.9.3-1.6.9-2.3.6-.6 1.4-.9 2.3-.9 1.7 0 2.7.8 3.2 2.5 1.8-1.7 3.7-2.5 5.9-2.5 2.6 0 4.7 1.1 6.3 3.3 2-2.2 4.3-3.3 6.7-3.3 2 0 3.7.7 5.1 2.1 1.5 1.4 2.2 3.2 2.3 5.4l1 26.1c0 .9-.3 1.6-1 2.2-.6.6-1.4.9-2.3.9s-1.7-.3-2.3-.9-1-1.4-1-2.2l-.8-25c-.1-1.4-.5-2.1-1.3-2.1-.4 0-.9.2-1.3.6l-3.8 3.2v23.4c0 .9-.3 1.6-.9 2.2s-1.4.9-2.3.9-1.6-.3-2.3-.9c-.6-.6-1-1.4-1-2.3v-25.4c0-1.1-.5-1.6-1.4-1.6-.5 0-.9.2-1.2.5l-4.6 3.9v22.7c0 .9-.3 1.6-.9 2.2s-1.4.9-2.2.9c-.9 0-1.7-.3-2.3-1-.4-.6-.8-1.4-.8-2.2" transform="translate(573.79246 751.91648)"/><path d="m-474.8-726.3c-1.9 1.9-2.9 4.2-2.9 6.8v3.7c0 2.7.9 5 2.8 6.9s4.2 2.8 6.9 2.8h10.8l5.4-3.2c0 .9.3 1.7 1 2.3.6.6 1.4.9 2.3.9s1.6-.3 2.3-.9c.6-.6 1-1.4 1-2.3l-.8-24c-.1-2.7-1.1-5-2.9-6.8-1.9-1.9-4.1-2.8-6.8-2.8h-12.2c-.9 0-1.7.3-2.3.9s-.9 1.4-.9 2.3.3 1.6 1 2.3c.6.6 1.4 1 2.3 1h12.2c.9 0 1.7.3 2.3.9s.9 1.4.9 2.3l.1 4.5c-1.3-.3-2.3-.4-3-.4h-12.6c-2.7 0-5 .9-6.9 2.8m15.9 13.6h-9c-.9 0-1.6-.3-2.3-.9-.6-.6-1-1.4-1-2.2v-3.5c0-.9.3-1.6.9-2.2s1.4-.9 2.3-.9h12.6c.9 0 1.6.3 2.2.9s.9 1.3 1 2.2l.2 2.6z" transform="translate(614.65666 768.93358)"/><path d="m-474.8-746.6v27.2c0 .9-.3 1.6-1 2.3-.6.6-1.4.9-2.3.9s-1.7-.3-2.3-.9-1-1.4-1-2.3v-27.2h-3.3c-.9 0-1.6-.3-2.2-1-.6-.6-.9-1.4-.9-2.3 0-.8.3-1.6.8-2.2.6-.7 1.3-1 2.3-1h3.3v-2.5c0-3.3 1.1-6 3.4-8.1 2.3-2.2 5.1-3.2 8.5-3.2h7.5c.9 0 1.7.3 2.3 1 .6.6.9 1.4.9 2.3s-.3 1.6-1 2.3c-.6.6-1.4 1-2.3 1h-7.5c-1.5 0-2.8.5-3.8 1.4s-1.5 2.1-1.5 3.5v2.5h6.4c.9 0 1.6.3 2.3.9.6.6 1 1.4 1 2.3s-.3 1.6-.9 2.3c-.6.6-1.4 1-2.2 1h-6.5z" transform="translate(680.67526 779.08838)"/><path d="m-474.8-692.2v-30.4c0-.9.3-1.6.9-2.3.6-.6 1.4-.9 2.3-.9 1.7 0 2.7.8 3.2 2.5 1.8-1.7 3.7-2.5 5.9-2.5 2.6 0 4.7 1.1 6.3 3.3 2-2.2 4.3-3.3 6.7-3.3 2 0 3.7.7 5.1 2.1 1.5 1.4 2.2 3.2 2.3 5.4l1 26.1c0 .9-.3 1.6-1 2.2-.6.6-1.4.9-2.3.9s-1.7-.3-2.3-.9-1-1.4-1-2.2l-.8-25c-.1-1.4-.5-2.1-1.3-2.1-.4 0-.9.2-1.3.6l-3.8 3.2v23.4c0 .9-.3 1.6-.9 2.2s-1.4.9-2.3.9-1.6-.3-2.3-.9c-.6-.6-1-1.4-1-2.3v-25.4c0-1.1-.5-1.6-1.4-1.6-.5 0-.9.2-1.2.5l-4.6 3.9v22.7c0 .9-.3 1.6-.9 2.2s-1.4.9-2.2.9c-.9 0-1.7-.3-2.3-1-.4-.6-.8-1.4-.8-2.2" transform="translate(694.63226 751.91648)"/></g></svg>'
  var menu_icon = '<svg width="800" height="800" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="m0 0h32v32h-32z"/><path d="m22.1906215 3.93969262c.1888925.5189779-.0786945 1.09282026-.5976725 1.28171276l-7.634949 2.77803523 11.042.00055939c3.7854517 0 6.8690987 3.0047834 6.995941 6.7593502l.004059.2406498v6c0 3.8659932-3.1340068 7-7 7h-18c-3.86599325 0-7-3.1340068-7-7v-6c0-3.8659932 3.13400675-7 7-7l1.11-.00055939 12.7989088-4.65742047c.5189779-.18889251 1.0928202.07869458 1.2817127.59767248zm2.8093785 6.06030738h-18c-2.76142375 0-5 2.2385763-5 5v6c0 2.7614237 2.23857625 5 5 5h18c2.7614237 0 5-2.2385763 5-5v-6c0-2.7614237-2.2385763-5-5-5zm-15 3c2.7614237 0 5 2.2385763 5 5s-2.2385763 5-5 5c-2.76142375 0-5-2.2385763-5-5s2.23857625-5 5-5zm15 6.5c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1h-6c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1zm-15-4.5c-1.65685425 0-3 1.3431458-3 3s1.34314575 3 3 3c1.6568542 0 3-1.3431458 3-3s-1.3431458-3-3-3zm15-.5c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1h-6c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1z" fill="#eee" fill-rule="nonzero"/></g></svg>'
  var menu_icon_alt='<svg fill="none" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="#eee"><path clip-rule="evenodd" d="m5.46689 4.39207c.2926.29319.29213.76806-.00106 1.06066-1.67861 1.67527-2.71583 3.98945-2.71583 6.54727 0 2.5878 1.06163 4.9262 2.77503 6.6059.29579.29.30051.7648.01054 1.0606-.28996.2958-.76481.3005-1.0606.0105-1.98933-1.9501-3.22497-4.6699-3.22497-7.677 0-2.97217 1.20721-5.66384 3.15623-7.60898.29318-.2926.76806-.29213 1.06066.00105zm13.14951.07239c.2958-.28997.7706-.28525 1.0606.01054 1.9001 1.93826 3.073 4.59543 3.073 7.525 0 2.9645-1.2009 5.6499-3.141 7.5938-.2926.2932-.7675.2937-1.0606.0011-.2932-.2926-.2937-.7675-.0011-1.0607 1.6709-1.6742 2.7027-3.983 2.7027-6.5342 0-2.52127-1.0078-4.8057-2.6441-6.47493-.29-.29579-.2853-.77064.0105-1.06061zm-10.30717 3.02311c.28303.30244.26729.77705-.03515 1.06008-.94891.88799-1.52408 2.10255-1.52408 3.43455 0 1.3475.58869 2.5751 1.55756 3.4657.30495.2803.32492.7547.0446 1.0597-.28031.3049-.75477.3249-1.05972.0446-1.25277-1.1516-2.04244-2.7698-2.04244-4.57 0-1.7792.77148-3.38092 1.99916-4.52978.30244-.28303.77705-.26729 1.06007.03515zm7.43367.03802c.2863-.29933.761-.30988 1.0604-.02357 1.1972 1.14512 1.9467 2.72658 1.9467 4.48018 0 1.7746-.7675 3.3726-1.9896 4.5208-.3018.2837-.7765.2689-1.0601-.033s-.2688-.7765.033-1.0601c.9445-.8874 1.5167-2.0991 1.5167-3.4277 0-1.313-.5589-2.51174-1.4836-3.39621-.2993-.28631-.3098-.76107-.0235-1.0604z" fill-rule="evenodd"/><path d="m13.6563 10.4512c.8958.6576 1.3437.9864 1.3437 1.5489 0 .5624-.4479.8912-1.3437 1.5489-.2472.1815-.4925.3524-.7179.4949-.1977.1249-.4216.2542-.6535.3811-.8936.4891-1.3405.7336-1.7412.4629-.4008-.2708-.4372-.8376-.51-1.9712-.0206-.3206-.0337-.6349-.0337-.9166 0-.2818.0131-.5961.0337-.9167.0728-1.13358.1092-1.70039.51-1.97114.4007-.27076.8476-.02621 1.7412.46289.2319.12688.4558.25614.6535.3811.2254.14245.4707.31335.7179.49495z"/></g></svg>'
  Lampa.Lang.add({
    radio_title: {
      ru: "Радио SomaFM",
      en: "SomaFM Radio",
      uk: "Радіо SomaFM",
      be: "Радыё SomaFM",
      zh: "SomaFM 电台",
      pt: "Rádio SomFM",
      bg: "SomaFM радио",
      he: "רדיו SomaFM"
    },
    radio_error: {
      ru: "Ошибка в загрузке потока",
      en: "Error loading station",
      uk: "Помилка завантаження станції",
      be: "Памылка загрузкі станцыі",
      zh: "错误加载站点",
      pt: "Erro ao carregar estação",
      bg: "Грешка при зареждане на станцията",
      he: "שגיאה בטעינת התחנה"
    }
  });

  // parse channels list from api response
  function parseChannels(channels) {
    let output = [];
    if (Array.isArray(channels)) {
      for (let c of channels) {
        if (!Array.isArray(c.playlists)) continue;
        c.plsfile = 'https://api.somafm.com/' + c.id + '.pls';
        c.mp3file = 'https://ice1.somafm.com/' + c.id + '-128-mp3';
        c.aacfile = 'https://ice1.somafm.com/' + c.id + '-128-aac';
        c.songsurl = 'https://somafm.com/songs/' + c.id + '.json';
        c.infourl = 'https://somafm.com/' + c.id + '/';
        c.twitter = c.twitter ? 'https://twitter.com/@' + c.twitter : '';
        c.route = '/channel/' + c.id;
        c.listeners = c.listeners | 0;
        c.updated = c.updated | 0;
        c.favorite = false;
        c.active = false;
        output.push(c);
      }
    }
    return output;
  }

  function item(data) {
    var item = Lampa.Template.get('radio_item', {
      name: data.title,
      genre: data.genre,
      description: data.description
    });
    var img = item.find('img')[0];
    img.onerror = function () {
      img.src = './img/img_broken.svg';
    };
    img.src = data.image;
    this.render = function () {
      return item;
    };
    this.destroy = function () {
      img.onerror = function () { };
      img.onload = function () { };
      img.src = '';
      item.remove();
    };
  }

  function component() {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true,
      step: 250
    });
    var player = window.radio_player;
    var items = [];
    var html = $('<div></div>');
    var body = $('<div class="category-full"></div>');
    var active;
    var last;
    this.create = function () {
      var _this = this;
      this.activity.loader(true);
      var prox = Lampa.Platform.is('webos') || Lampa.Platform.is('tizen') || Lampa.Storage.field('proxy_other') === false ? '' : '';
      network["native"](prox + api_url, this.build.bind(this), function () {
        var empty = new Lampa.Empty();
        html.append(empty.render());
        _this.start = empty.start;
        _this.activity.loader(false);
        _this.activity.toggle();
      });
      return this.render();
    };
    this.build = function (data) {
      scroll.minus();
      var stations = parseChannels(data.channels).sort(function (a, b) {
        return a.sort - b.sort;
      });
      this.append(stations);
      scroll.append(body);
      html.append(scroll.render());
      this.activity.loader(false);
      this.activity.toggle();
    };
    this.append = function (element) {
      element.forEach(function (el) {
        var item$1 = new item(el);
        item$1.render().on('hover:focus', function () {
          last = item$1.render()[0];
          active = items.indexOf(item$1);
          scroll.update(items[active].render(), true);
        }).on('hover:enter', function () {
          player.play(el);
        });
        body.append(item$1.render());
        items.push(item$1);
      });
    };
    this.back = function () {
      Lampa.Activity.backward();
    };
    this.background = function () {
      Lampa.Background.immediately('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==');
    };
    this.start = function () {
      if (Lampa.Activity.active().activity !== this.activity) return;
      this.background();
      Lampa.Controller.add('content', {
        toggle: function toggle() {
          Lampa.Controller.collectionSet(scroll.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu');
        },
        right: function right() {
          Navigator.move('right');
        },
        up: function up() {
          if (Navigator.canmove('up')) Navigator.move('up'); else Lampa.Controller.toggle('head');
        },
        down: function down() {
          if (Navigator.canmove('down')) Navigator.move('down');
        },
        back: this.back
      });
      Lampa.Controller.toggle('content');
    };
    this.pause = function () { };
    this.stop = function () { };
    this.render = function () {
      return html;
    };
    this.destroy = function () {
      network.clear();
      Lampa.Arrays.destroy(items);
      scroll.destroy();
      html.remove();
      items = null;
      network = null;
    };
  }

  function player() {
    var html = Lampa.Template.get('radio_player', {});
    var audio = new Audio();
    var url = '';
    var format = '';
    var played = false;
    var hls;
    audio.addEventListener("play", function (event) {
      played = true;
      html.toggleClass('loading', false);
    });
    function prepare() {
      if (audio.canPlayType('audio/vnd.apple.mpegurl')) load(); else if (Hls.isSupported() && format == "aacp") {
        try {
          hls = new Hls();
          hls.attachMedia(audio);
          hls.loadSource(url);
          hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
              if (data.reason === "no EXTM3U delimiter") {
                Lampa.Noty.show(Lampa.Lang.translate("radio_error"));
              }
            }
          });
          hls.on(Hls.Events.MANIFEST_LOADED, function () {
            start();
          });
        } catch (e) {
          Lampa.Noty.show(Lampa.Lang.translate("radio_error"));
        }
      } else load();
    }
    function load() {
      audio.src = url;
      audio.load();
      start();
    }
    function start() {
      var playPromise;
      try {
        playPromise = audio.play();
      } catch (e) { }
      if (playPromise !== undefined) {
        playPromise.then(function () {
          console.log('SomaFM', 'start playing');
        })["catch"](function (e) {
          console.log('SomaFM', 'play promise error:', e.message);
        });
      }
    }
    function play() {
      html.toggleClass('loading', true);
      html.toggleClass('stop', false);
      prepare();
    }
    function stop() {
      played = false;
      html.toggleClass('stop', true);
      html.toggleClass('loading', false);
      if (hls) {
        hls.destroy();
        hls = false;
      }
      audio.src = '';
    }
    html.on('hover:enter', function () {
      if (played) stop(); else if (url) play();
    });
    this.create = function () {
      $('.head__actions .open--search').before(html);
    };
    this.play = function (data) {
      stop();
      url = data.mp3file ? data.mp3file : data.aacfile;
      html.find('.radio-player__name').text(data.title);
      html.toggleClass('hide', false);
      play();
    };
  }

  function startPlugin() {
    window.somafm = true;
    Lampa.Component.add('somafm', component);
    Lampa.Template.add('radio_item', "<div class=\"selector radio-item\">\n        <div class=\"radio-item__imgbox\">\n            <img class=\"radio-item__img\" />\n        </div>\n\n        <div class=\"radio-item__name\">{name}</div>\n    </div>");
    Lampa.Template.add('radio_player', "<div class=\"selector radio-player stop hide\">\n        <div class=\"radio-player__name\">Soma FM</div>\n\n        <div class=\"radio-player__button\">\n            <i></i>\n            <i></i>\n            <i></i>\n            <i></i>\n        </div>\n    </div>");
    Lampa.Template.add('radio_style', "<style>\n.radio-item {\n  margin-left: 1em;\n  margin-bottom: 1em;\n  width: 12.5%;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.radio-item__imgbox {\n  background-color: #3e3e3e;\n  padding-bottom: 100%;\n  position: relative;\n  -webkit-border-radius: 0.3em;\n  -moz-border-radius: 0.3em;\n  border-radius: 0.3em;\n}\n.radio-item__img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 0.4em;\n}\n.radio-item__name {\n  font-size: 1.1em;\n  margin-top: 0.8em;\n}\n.radio-item.focus .radio-item__imgbox:after {\n  border: solid 0.26em #fff;\n  content: \"\";\n  display: block;\n  position: absolute;\n  left: -0.5em;\n  top: -0.5em;\n  right: -0.5em;\n  bottom: -0.5em;\n  -webkit-border-radius: 0.8em;\n  -moz-border-radius: 0.8em;\n  border-radius: 0.8em;\n}\n\n@-webkit-keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n\n@-moz-keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n\n@-o-keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n\n@keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n@-webkit-keyframes sound-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@-moz-keyframes sound-loading {\n  0% {\n    -moz-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@-o-keyframes sound-loading {\n  0% {\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes sound-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.radio-player {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-border-radius: 0.3em;\n  -moz-border-radius: 0.3em;\n  border-radius: 0.3em;\n  padding: 0.2em 0.8em;\n  background-color: #3e3e3e;\n}\n.radio-player__name {\n  margin-right: 1em;\n  white-space: nowrap;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n  max-width: 8em;\n}\n@media screen and (max-width: 580px) {\n  .radio-item {\n    width: 20%;\n  }\n}\n@media screen and (max-width: 385px) {\n  .radio-player__name {\n    display: none;\n  }\n  .radio-item__name {\n    display: none;\n  }\n  .radio-item {\n    width: 25%;\n  }\n}\n.radio-player__button {\n  position: relative;\n  width: 1.5em;\n  height: 1.5em;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.radio-player__button i {\n  display: block;\n  width: 0.2em;\n  background-color: #fff;\n  margin: 0 0.1em;\n  -webkit-animation: sound 0ms -800ms linear infinite alternate;\n  -moz-animation: sound 0ms -800ms linear infinite alternate;\n  -o-animation: sound 0ms -800ms linear infinite alternate;\n  animation: sound 0ms -800ms linear infinite alternate;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.radio-player__button i:nth-child(1) {\n  -webkit-animation-duration: 474ms;\n  -moz-animation-duration: 474ms;\n  -o-animation-duration: 474ms;\n  animation-duration: 474ms;\n}\n.radio-player__button i:nth-child(2) {\n  -webkit-animation-duration: 433ms;\n  -moz-animation-duration: 433ms;\n  -o-animation-duration: 433ms;\n  animation-duration: 433ms;\n}\n.radio-player__button i:nth-child(3) {\n  -webkit-animation-duration: 407ms;\n  -moz-animation-duration: 407ms;\n  -o-animation-duration: 407ms;\n  animation-duration: 407ms;\n}\n.radio-player__button i:nth-child(4) {\n  -webkit-animation-duration: 458ms;\n  -moz-animation-duration: 458ms;\n  -o-animation-duration: 458ms;\n  animation-duration: 458ms;\n}\n.radio-player.stop .radio-player__button {\n  -webkit-border-radius: 100%;\n  -moz-border-radius: 100%;\n  border-radius: 100%;\n  border: 0.2em solid #fff;\n}\n.radio-player.stop .radio-player__button i {\n  display: none;\n}\n.radio-player.stop .radio-player__button:after {\n  content: \"\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: #fff;\n}\n.radio-player.loading .radio-player__button:before {\n  content: \"\";\n  display: block;\n  border-top: 0.2em solid #fff;\n  border-left: 0.2em solid transparent;\n  border-right: 0.2em solid transparent;\n  border-bottom: 0.2em solid transparent;\n  -webkit-animation: sound-loading 1s linear infinite;\n  -moz-animation: sound-loading 1s linear infinite;\n  -o-animation: sound-loading 1s linear infinite;\n  animation: sound-loading 1s linear infinite;\n  width: 0.9em;\n  height: 0.9em;\n  -webkit-border-radius: 100%;\n  -moz-border-radius: 100%;\n  border-radius: 100%;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.radio-player.loading .radio-player__button i {\n  display: none;\n}\n.radio-player.focus {\n  background-color: #fff;\n  color: #000;\n}\n.radio-player.focus .radio-player__button {\n  border-color: #000;\n}\n.radio-player.focus .radio-player__button i,\n.radio-player.focus .radio-player__button:after {\n  background-color: #000;\n}\n.radio-player.focus .radio-player__button:before {\n  border-top-color: #000;\n}\n</style>");
    window.radio_player = new player();
    Lampa.Listener.follow('app', function (e) {
      if (e.type == 'ready') {
        var button = $("<li class=\"menu__item selector\" data-action=\"radio\">\n                <div class=\"menu__ico\">\n                    " + menu_icon_alt + "\n                </div>\n                <div class=\"menu__text\">Soma FM</div>\n            </li>");
        button.on('hover:enter', function () {
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate("radio_title"),
            component: 'somafm',
            page: 1
          });
        });
        $('.menu .menu__list').eq(0).append(button);
        $('body').append(Lampa.Template.get('radio_style', {}, true));
        window.radio_player.create();
      }
    });
  }
  if (!window.somafm) startPlugin();

})();
