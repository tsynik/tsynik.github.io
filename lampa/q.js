(function () {
    'use strict';

    var network = new Lampa.Reguest();
    var api_url = 'https://cub.watch/api/quality/';

    function get(url, page, resolve, reject) {
      var account = Lampa.Storage.get('account', '{}');

      if (account.token) {
        network.silent(api_url + url + '/' + page, resolve, reject, false, {
          headers: {
            token: account.token
          }
        });
      } else {
        reject();
      }
    }

    function main(oncomplite, onerror) {
      var qualitys = ['webdl', 'dvdrip', 'hdrip', 'bd', 'update'];
      var status = new Lampa.Status(qualitys.length);

      status.onComplite = function () {
        var fulldata = [];
        qualitys.reverse().forEach(function (quality) {
          if (status.data[quality] && status.data[quality].results.length) {
            fulldata.push(status.data[quality]);
          }
        });
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        json.url = name;
        status.append(name, json);
      };

      qualitys.forEach(function (q) {
        get(q, 1, function (json) {
          append(Lampa.Lang.translate('quality_' + q), q, json);
        }, status.error.bind(status));
      });
    }

    function full(params, oncomplite, onerror) {
      get(params.url, params.page, oncomplite, onerror);
    }

    function clear() {
      network.clear();
    }

    var Api = {
      get: get,
      main: main,
      full: full,
      clear: clear
    };

    function component$1(object) {
      var comp = new Lampa.InteractionMain(object);

      comp.create = function () {
        this.activity.loader(true);
        Api.main(this.build.bind(this), this.empty.bind(this));
        return this.render();
      };

      comp.onMore = function (data) {
        Lampa.Activity.push({
          url: data.url,
          title: object.title + ' - ' + data.title,
          component: 'quality_full',
          page: Lampa.Storage.field('light_version') && window.innerWidth >= 767 ? 1 : 2
        });
      };

      return comp;
    }

    function component(object) {
      var comp = new Lampa.InteractionCategory(object);

      comp.create = function () {
        Api.full(object, this.build.bind(this), this.empty.bind(this));
      };

      comp.nextPageReuest = function (object, resolve, reject) {
        Api.full(object, resolve.bind(comp), reject.bind(comp));
      };

      return comp;
    }

    Lampa.Lang.add({
      quality_menu: {
        ru: 'В качестве',
        uk: 'В якості',
        en: 'In the quality',
        zh: '作为'
      },
      quality_webdl: {
        ru: 'WEB-Rip'
      },
      quality_dvdrip: {
        ru: 'DVD-Rip'
      },
      quality_hdrip: {
        ru: 'HD-Rip'
      },
      quality_bd: {
        ru: 'Blu-Ray'
      },
      quality_update: {
        ru: 'Обновление',
        uk: 'Оновлення',
        en: 'Update',
        zh: '更新'
      }
    });

    function startPlugin() {
      window.plugin_quality_ready = true;
      Lampa.Component.add('quality', component$1);
      Lampa.Component.add('quality_full', component);
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
          var button = $("<li class=\"menu__item selector\" data-action=\"sisi\">\n                <div class=\"menu__ico\">\n                    <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"></rect>\n                        <path d=\"M18.105 22H15.2936V16H9.8114V22H7V8H9.8114V13.6731H15.2936V8H18.105V22Z\" fill=\"white\"></path>\n                        <path d=\"M20.5697 22V8H24.7681C25.9676 8 27.039 8.27885 27.9824 8.83654C28.9321 9.38782 29.6724 10.1763 30.2034 11.2019C30.7345 12.2212 31 13.3814 31 14.6827V15.3269C31 16.6282 30.7376 17.7853 30.2128 18.7981C29.6943 19.8109 28.9602 20.5962 28.0105 21.1538C27.0609 21.7115 25.9895 21.9936 24.7962 22H20.5697ZM23.3811 10.3365V19.6827H24.7399C25.8395 19.6827 26.6798 19.3141 27.2608 18.5769C27.8419 17.8397 28.1386 16.7853 28.1511 15.4135V14.6731C28.1511 13.25 27.8637 12.1731 27.289 11.4423C26.7142 10.7051 25.8739 10.3365 24.7681 10.3365H23.3811Z\" fill=\"white\"></path>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">".concat(Lampa.Lang.translate('quality_menu'), "</div>\n            </li>"));
          button.on('hover:enter', function () {
            Lampa.Activity.push({
              url: '',
              title: Lampa.Lang.translate('quality_menu'),
              component: 'quality',
              page: 1
            });
          });
          $('.menu .menu__list').eq(0).append(button);
        }
      });
    }

    if (!window.plugin_quality_ready) startPlugin();

})();
