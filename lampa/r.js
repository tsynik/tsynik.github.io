// Radio SomaFM by @tsynik
// https://somafm.com/channels.xml
// https://somafm.com/channels.json
// https://github.com/rainner/soma-fm-player
// https://codeberg.org/cuschk/somafm

(function () {
  'use strict';

  let api_url = 'https://somafm.com/channels.json';
  let genres_url = 'https://tsynik.github.io/lampa/genres.json';
  let img_bg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg=='
  let logo = '<svg enable-background="new 0 0 284 80.7" viewBox="0 0 284 80.7" xmlns="http://www.w3.org/2000/svg"><g fill="#ed1f24"><path d="m-474.8-759.5h14.7c2.3 0 4.3.7 6.1 2 1.8 1.4 2.6 2.7 2.6 4 0 .9-.3 1.7-1 2.3-.6.6-1.4.9-2.1.9-1 0-1.9-.5-2.8-1.4-.8-.9-1.7-1.4-2.6-1.4h-14.4c-1.4 0-2.1.6-2.1 1.7 0 .8.5 1.4 1.4 1.8l17 7.6c1.7.8 3.1 2 4.2 3.7s1.7 3.6 1.7 5.6c0 2.7-1 5.1-2.9 7s-4.1 2.9-6.6 2.9h-13c-2.2 0-4.3-.7-6.2-2-1.9-1.4-2.9-2.7-2.9-3.9 0-.8.3-1.6.9-2.2.6-.7 1.4-1 2.4-1 .8 0 1.7.5 2.6 1.4s2.3 1.4 4 1.4h11.9c.9 0 1.7-.4 2.4-1.1.6-.7 1-1.6 1-2.5 0-1.4-.7-2.5-2.1-3.1l-17.2-7.7c-1.7-.7-2.9-1.8-3.8-3.2s-1.3-2.8-1.3-4.3c0-2.3.8-4.3 2.4-6 1.4-1.6 3.4-2.5 5.7-2.5" transform="translate(509.62346 785.52008)"/><path d="m-474.8-752.4c-2.7-2.4-5.5-3.6-8.4-3.6h-7.5c-3.1 0-5.9 1.2-8.5 3.7s-3.9 5.1-3.9 7.9v13.5c0 2.8 1.3 5.4 4 7.9s5.5 3.7 8.4 3.7h7.5c2.9 0 5.7-1.2 8.4-3.7 2.7-2.4 4.1-5.1 4.1-8v-13.5c0-2.7-1.4-5.4-4.1-7.9m-20.6 5.8 2.2-1.9c.8-.7 1.9-1 3.3-1h6.6c1 0 1.9.3 2.7 1l2.2 1.8c.8.6 1.2 1.5 1.2 2.8v12.9c0 1.1-.4 1.9-1.2 2.6l-1.9 1.7c-.9.8-1.9 1.2-3 1.2h-7.4c-1 0-1.7-.2-2.2-.7l-2.4-2.1c-.8-.7-1.3-1.6-1.3-2.8v-12.9c.1-1.1.5-2 1.2-2.6" transform="translate(564.37836 781.97068)"/><path d="m-474.8-692.2v-30.4c0-.9.3-1.6.9-2.3.6-.6 1.4-.9 2.3-.9 1.7 0 2.7.8 3.2 2.5 1.8-1.7 3.7-2.5 5.9-2.5 2.6 0 4.7 1.1 6.3 3.3 2-2.2 4.3-3.3 6.7-3.3 2 0 3.7.7 5.1 2.1 1.5 1.4 2.2 3.2 2.3 5.4l1 26.1c0 .9-.3 1.6-1 2.2-.6.6-1.4.9-2.3.9s-1.7-.3-2.3-.9-1-1.4-1-2.2l-.8-25c-.1-1.4-.5-2.1-1.3-2.1-.4 0-.9.2-1.3.6l-3.8 3.2v23.4c0 .9-.3 1.6-.9 2.2s-1.4.9-2.3.9-1.6-.3-2.3-.9c-.6-.6-1-1.4-1-2.3v-25.4c0-1.1-.5-1.6-1.4-1.6-.5 0-.9.2-1.2.5l-4.6 3.9v22.7c0 .9-.3 1.6-.9 2.2s-1.4.9-2.2.9c-.9 0-1.7-.3-2.3-1-.4-.6-.8-1.4-.8-2.2" transform="translate(573.79246 751.91648)"/><path d="m-474.8-726.3c-1.9 1.9-2.9 4.2-2.9 6.8v3.7c0 2.7.9 5 2.8 6.9s4.2 2.8 6.9 2.8h10.8l5.4-3.2c0 .9.3 1.7 1 2.3.6.6 1.4.9 2.3.9s1.6-.3 2.3-.9c.6-.6 1-1.4 1-2.3l-.8-24c-.1-2.7-1.1-5-2.9-6.8-1.9-1.9-4.1-2.8-6.8-2.8h-12.2c-.9 0-1.7.3-2.3.9s-.9 1.4-.9 2.3.3 1.6 1 2.3c.6.6 1.4 1 2.3 1h12.2c.9 0 1.7.3 2.3.9s.9 1.4.9 2.3l.1 4.5c-1.3-.3-2.3-.4-3-.4h-12.6c-2.7 0-5 .9-6.9 2.8m15.9 13.6h-9c-.9 0-1.6-.3-2.3-.9-.6-.6-1-1.4-1-2.2v-3.5c0-.9.3-1.6.9-2.2s1.4-.9 2.3-.9h12.6c.9 0 1.6.3 2.2.9s.9 1.3 1 2.2l.2 2.6z" transform="translate(614.65666 768.93358)"/><path d="m-474.8-746.6v27.2c0 .9-.3 1.6-1 2.3-.6.6-1.4.9-2.3.9s-1.7-.3-2.3-.9-1-1.4-1-2.3v-27.2h-3.3c-.9 0-1.6-.3-2.2-1-.6-.6-.9-1.4-.9-2.3 0-.8.3-1.6.8-2.2.6-.7 1.3-1 2.3-1h3.3v-2.5c0-3.3 1.1-6 3.4-8.1 2.3-2.2 5.1-3.2 8.5-3.2h7.5c.9 0 1.7.3 2.3 1 .6.6.9 1.4.9 2.3s-.3 1.6-1 2.3c-.6.6-1.4 1-2.3 1h-7.5c-1.5 0-2.8.5-3.8 1.4s-1.5 2.1-1.5 3.5v2.5h6.4c.9 0 1.6.3 2.3.9.6.6 1 1.4 1 2.3s-.3 1.6-.9 2.3c-.6.6-1.4 1-2.2 1h-6.5z" transform="translate(680.67526 779.08838)"/><path d="m-474.8-692.2v-30.4c0-.9.3-1.6.9-2.3.6-.6 1.4-.9 2.3-.9 1.7 0 2.7.8 3.2 2.5 1.8-1.7 3.7-2.5 5.9-2.5 2.6 0 4.7 1.1 6.3 3.3 2-2.2 4.3-3.3 6.7-3.3 2 0 3.7.7 5.1 2.1 1.5 1.4 2.2 3.2 2.3 5.4l1 26.1c0 .9-.3 1.6-1 2.2-.6.6-1.4.9-2.3.9s-1.7-.3-2.3-.9-1-1.4-1-2.2l-.8-25c-.1-1.4-.5-2.1-1.3-2.1-.4 0-.9.2-1.3.6l-3.8 3.2v23.4c0 .9-.3 1.6-.9 2.2s-1.4.9-2.3.9-1.6-.3-2.3-.9c-.6-.6-1-1.4-1-2.3v-25.4c0-1.1-.5-1.6-1.4-1.6-.5 0-.9.2-1.2.5l-4.6 3.9v22.7c0 .9-.3 1.6-.9 2.2s-1.4.9-2.2.9c-.9 0-1.7-.3-2.3-1-.4-.6-.8-1.4-.8-2.2" transform="translate(694.63226 751.91648)"/></g></svg>'

  const PREFERRED_STREAMS = [
    // 320k MP3
    { urlRegex: /320\.pls$/, format: 'mp3' },
    // 256k MP3
    { urlRegex: /256\.pls$/, format: 'mp3' },
    // 128k AAC
    { quality: 'highest', format: 'aac' },
    // 128k MP3
    { quality: 'highest', format: 'mp3' },
    // 64k AAC
    { quality: 'high', format: 'aacp' },
    // 32k AAC
    { quality: 'low', format: 'aacp' },
  ];

  Lampa.Lang.add({
    somafm_title: {
      ru: "Радио SomaFM",
      en: "SomaFM Radio",
      uk: "Радіо SomaFM",
      be: "Радыё SomaFM",
      zh: "SomaFM 电台",
      pt: "Rádio SomFM",
      bg: "SomaFM радио",
      he: "רדיו SomaFM"
    },
    somafm_error: {
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

  // parse pls
  function parseINIString(data) {
    var regex = {
      section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
      param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
      comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/[\r\n]+/);
    var section = null;
    lines.forEach(function (line) {
      if (regex.comment.test(line)) {
        return;
      } else if (regex.param.test(line)) {
        var match = line.match(regex.param);
        if (section) {
          value[section][match[1]] = match[2];
        } else {
          value[match[1]] = match[2];
        }
      } else if (regex.section.test(line)) {
        var match = line.match(regex.section);
        value[match[1]] = {};
        section = match[1];
      } else if (line.length == 0 && section) {
        section = null;
      };
    });
    return value;
  }

  // parse channels list from api response
  function parseChannels(channels) {
    let output = [];


    if (Array.isArray(channels)) {

      for (let c of channels) {
        const streamHighestQuality = getHighestQualityStream(c, PREFERRED_STREAMS);

        if (!Array.isArray(c.playlists)) continue;

        c.stream = streamHighestQuality;
        c.stream.urls = getStreamUrls(c);
        c.plsfile = 'https://api.somafm.com/' + c.id + '.pls';
        // c.mp3file = 'https://ice1.somafm.com/' + c.id + '-128-mp3';
        // c.aacfile = 'https://ice1.somafm.com/' + c.id + '-128-aac';
        c.songsurl = 'https://somafm.com/songs/' + c.id + '.json';
        c.infourl = 'https://somafm.com/' + c.id + '/';
        c.twitter = c.twitter ? 'https://twitter.com/@' + c.twitter : '';
        c.route = '/channel/' + c.id;
        c.listeners = c.listeners | 0;
        c.updated = c.updated | 0;
        c.favorite = false;
        c.active = false;
        c.genre = c.genre.replace(/\|/g, ' • ') // '/'
        output.push(c);
      }
    }
    return output;
  }

  function getHighestQualityStream(channel, streams) {
    for (const stream of streams) {
      for (const playlist of channel.playlists) {
        if (
          (!stream.urlRegex || stream.urlRegex.test(playlist.url))
          && (!stream.quality || playlist.quality === stream.quality)
          && (!stream.format || playlist.format === stream.format)
        ) {
          return {
            url: playlist.url,
            format: playlist.format,
            quality: playlist.quality
          };
        }
      }
    }
    return null;
  }


  function getChannelById(id, channels) {
    return new Promise((resolve, reject) => {
      if (id === 'random') {
        resolve(channels[
          Math.floor(channels.length * Math.random())
        ]);
      }

      for (const channel of channels) {
        if (id === channel.id) {
          resolve(channel);
        }
      }

      reject(new Error('Channel not found.'));
    });
  }

  function getStreamUrls(channel) {
    if (channel.stream.urls) {
      return Promise.resolve(channel.stream.urls);
    }

    return getUrlsFromPlaylist(channel.stream.url);
  }

  function list() {
    return new Promise((resolve, reject) => {
      this.network.native(this.api_url, (result) => {
        Lampa.Cache.rewriteData('other', 'somafm_list', result).finally(resolve.bind(resolve, result))
      }, () => {
        Lampa.Cache.getData('other', 'somafm_list').then(resolve).catch(reject)
      })
    })
  }

  function getUrlsFromPlaylist(playlistUrl) {
    return new Promise((resolve, reject) => {
      //const response = await got(playlistUrl);
      let network = new Lampa.Reguest();
      network.timeout(5000)
      network.native(playlistUrl, (response) => {
        try {
          //const data = ini.decode(response.body);            
          const data = parseINIString(response);
          //console.log('SomaFM', "getUrlsFromPlaylist data:", data);
          const result = [];
          for (const key of Object.keys(data.playlist)
            .filter(x => x.match(/^File\d+$/))) {
            result.push(data.playlist[key]);
          }
          resolve(result);
        } catch (error) {
          console.log('SomaFM', error);
          reject(error);
        }
      }, () => {
      }, false, { dataType: 'text' })
    });
  }


  function item(data) {
    var item = Lampa.Template.get('somafm_item', {
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

  function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function component() {
    var network = new Lampa.Reguest();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true,
      step: 250
    });
    var player = window.somafm_player;
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
      Lampa.Background.immediately(img_bg);
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
    var html = Lampa.Template.get('somafm_player', {});
    var audio = new Audio();
    var url = '';
    var format = '';
    var played = false;
    var hls;
    audio.addEventListener("play", function (event) {
      played = true;
      //html.toggleClass('loading', false);
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
                Lampa.Noty.show(Lampa.Lang.translate("somafm_error"));
              }
            }
          });
          hls.on(Hls.Events.MANIFEST_LOADED, function () {
            start();
          });
        } catch (e) {
          Lampa.Noty.show(Lampa.Lang.translate("somafm_error"));
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
      //url = data.mp3file ? data.mp3file : data.aacfile;
      Promise.resolve(data.stream.urls).then(value => {
        url = random_item(value);
        console.log('SomaFM', 'Play URL:', url)
      })
      //console.log('SomaFM', 'channel:', data.id, 'stream:', data.stream, "url", url);
      html.find('.somafm-player__name').text(data.title);
      html.toggleClass('hide', false);
      html.toggleClass('loading', true);
      play();
    };
  }

  function add() {
    var ico = '<svg enable-background="new 0 0 533.3 377.1" viewBox="0 0 533.3 377.1" xmlns="http://www.w3.org/2000/svg"><path d="m266.7 121.9c36.8 0 66.7 29.8 66.7 66.7s-29.8 66.7-66.7 66.7-66.7-29.9-66.7-66.7 29.8-66.7 66.7-66.7zm-116.7 66.7c0 32.2 13.1 61.4 34.2 82.5l-35.4 35.4c-30.2-30.2-48.8-71.8-48.8-117.9 0-46 18.7-87.7 48.8-117.9l35.4 35.4c-21.1 21.1-34.2 50.2-34.2 82.5zm233.3 0c0-32.2-13.1-61.4-34.2-82.5l35.4-35.4c30.2 30.2 48.8 71.8 48.8 117.9 0 46-18.7 87.7-48.8 117.9l-35.4-35.4c21.2-21.2 34.2-50.3 34.2-82.5zm-333.3 0c0 59.8 24.3 114 63.5 153.2l-35.4 35.4c-48.3-48.3-78.1-115-78.1-188.6s29.8-140.3 78.1-188.6l35.4 35.4c-39.2 39.2-63.5 93.3-63.5 153.2zm433.3 0c0-59.8-24.3-114-63.5-153.2l35.4-35.4c48.3 48.3 78.1 114.9 78.1 188.6s-29.8 140.3-78.1 188.6l-35.4-35.4c39.3-39.2 63.5-93.4 63.5-153.2z" fill="#eee"/></svg>'
    Lampa.Template.add('somafm_item', "<div class=\"selector somafm-item\">\n        <div class=\"somafm-item__imgbox\">\n            <img class=\"somafm-item__img\" />\n        </div>\n\n        <div class=\"somafm-item__name\">{name}</div>\n    </div>");
    Lampa.Template.add('somafm_player', "<div class=\"selector somafm-player loading stop hide\">\n        <div class=\"somafm-player__name\">Soma FM</div>\n\n        <div class=\"somafm-player__button\">\n            <i></i>\n            <i></i>\n            <i></i>\n            <i></i>\n        </div>\n    </div>");
    Lampa.Template.add('somafm_style', "<style>\n.somafm-item {\n  margin-left: 1em;\n  margin-bottom: 1em;\n  width: 13%;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.somafm-item__imgbox {\n  background-color: #3e3e3e;\n  padding-bottom: 100%;\n  position: relative;\n  -webkit-border-radius: 0.3em;\n  -moz-border-radius: 0.3em;\n  border-radius: 0.3em;\n}\n.somafm-item__img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 0.4em;\n}\n.somafm-item__name {\n  font-size: 1.1em;\n  margin-top: 0.8em;\n}\n.somafm-item.focus .somafm-item__imgbox:after {\n  border: solid 0.26em #fff;\n  content: \"\";\n  display: block;\n  position: absolute;\n  left: -0.5em;\n  top: -0.5em;\n  right: -0.5em;\n  bottom: -0.5em;\n  -webkit-border-radius: 0.8em;\n  -moz-border-radius: 0.8em;\n  border-radius: 0.8em;\n}\n\n@-webkit-keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n\n@-moz-keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n\n@-o-keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n\n@keyframes sound {\n  0% {\n    height: 0.1em;\n  }\n  100% {\n    height: 1em;\n  }\n}\n@-webkit-keyframes sound-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@-moz-keyframes sound-loading {\n  0% {\n    -moz-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@-o-keyframes sound-loading {\n  0% {\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes sound-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n    -moz-transform: rotate(0deg);\n    -o-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    -moz-transform: rotate(360deg);\n    -o-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.somafm-player {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-border-radius: 0.3em;\n  -moz-border-radius: 0.3em;\n  border-radius: 0.3em;\n  padding: 0.2em 0.8em;\n  margin-left: 1em;\n  margin-right: 1em;\n  background-color: #3e3e3e;\n}\n.somafm-player__name {\n  margin-right: 1em;\n  white-space: nowrap;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n  max-width: 8em;\n}\n@media screen and (max-width: 580px) {\n  .somafm-item {\n    width: 20%;\n  }\n}\n@media screen and (max-width: 385px) {\n  .somafm-player__name {\n    display: none;\n  }\n  .somafm-item__name {\n    display: none;\n  }\n  .somafm-item {\n    width: 25%;\n  }\n}\n.somafm-player__button {\n  position: relative;\n  width: 1.5em;\n  height: 1.5em;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.somafm-player__button i {\n  display: block;\n  width: 0.2em;\n  background-color: #fff;\n  margin: 0 0.1em;\n  -webkit-animation: sound 0ms -800ms linear infinite alternate;\n  -moz-animation: sound 0ms -800ms linear infinite alternate;\n  -o-animation: sound 0ms -800ms linear infinite alternate;\n  animation: sound 0ms -800ms linear infinite alternate;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.somafm-player__button i:nth-child(1) {\n  -webkit-animation-duration: 474ms;\n  -moz-animation-duration: 474ms;\n  -o-animation-duration: 474ms;\n  animation-duration: 474ms;\n}\n.somafm-player__button i:nth-child(2) {\n  -webkit-animation-duration: 433ms;\n  -moz-animation-duration: 433ms;\n  -o-animation-duration: 433ms;\n  animation-duration: 433ms;\n}\n.somafm-player__button i:nth-child(3) {\n  -webkit-animation-duration: 407ms;\n  -moz-animation-duration: 407ms;\n  -o-animation-duration: 407ms;\n  animation-duration: 407ms;\n}\n.somafm-player__button i:nth-child(4) {\n  -webkit-animation-duration: 458ms;\n  -moz-animation-duration: 458ms;\n  -o-animation-duration: 458ms;\n  animation-duration: 458ms;\n}\n.somafm-player.stop .somafm-player__button {\n  -webkit-border-radius: 100%;\n  -moz-border-radius: 100%;\n  border-radius: 100%;\n  border: 0.2em solid #fff;\n}\n.somafm-player.stop .somafm-player__button i {\n  display: none;\n}\n.somafm-player.stop .somafm-player__button:after {\n  content: \"\";\n  width: 0.5em;\n  height: 0.5em;\n  background-color: #fff;\n}\n.somafm-player.loading .somafm-player__button:before {\n  content: \"\";\n  display: block;\n  border-top: 0.2em solid #fff;\n  border-left: 0.2em solid transparent;\n  border-right: 0.2em solid transparent;\n  border-bottom: 0.2em solid transparent;\n  -webkit-animation: sound-loading 1s linear infinite;\n  -moz-animation: sound-loading 1s linear infinite;\n  -o-animation: sound-loading 1s linear infinite;\n  animation: sound-loading 1s linear infinite;\n  width: 0.9em;\n  height: 0.9em;\n  -webkit-border-radius: 100%;\n  -moz-border-radius: 100%;\n  border-radius: 100%;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n}\n.somafm-player.loading .somafm-player__button i {\n  display: none;\n}\n.somafm-player.focus {\n  background-color: #fff;\n  color: #000;\n}\n.somafm-player.focus .somafm-player__button {\n  border-color: #000;\n}\n.somafm-player.focus .somafm-player__button i,\n.somafm-player.focus .somafm-player__button:after {\n  background-color: #000;\n}\n.somafm-player.focus .somafm-player__button:before {\n  border-top-color: #000;\n}\n</style>");
    window.somafm_player = new player();
    var button = $("<li class=\"menu__item selector\" data-action=\"radio\">\n                <div class=\"menu__ico\">\n                    " + ico + "\n                </div>\n                <div class=\"menu__text\">Soma FM</div>\n            </li>");
    button.on('hover:enter', function () {
      Lampa.Activity.push({
        url: '',
        title: Lampa.Lang.translate("somafm_title"),
        component: 'somafm',
        page: 1
      });
    });
    $('.menu .menu__list').eq(0).append(button);
    $('body').append(Lampa.Template.get('somafm_style', {}, true));
    window.somafm_player.create();

  }

  function createSomaFM() {
    window.somafm = true;
    Lampa.Component.add("somafm", component);
    if (window.appready) add();
    else {
      Lampa.Listener.follow("app", function (e) {
        if (e.type == "ready") add();
      });
    }
  }
  if (!window.somafm) createSomaFM();

})();
