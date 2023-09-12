// Main Menu Exit
(function () {
    "use strict";

    Lampa.Lang.add({
        exit_menu: {
            ru: "Выход",
            en: "Exit",
            uk: "Вихід",
            be: "Вынахад",
            zh: "出口",
            pt: "Saída",
	    bg: "Изход"
        }
    });

    function exit_m(object) {
        this.create = function () {};
        this.build = function () {}; // this.activity.loader(false);
        this.start = function () {};
        this.pause = function () {};
        this.stop = function () {};
        this.render = function () {};
        this.destroy = function () {};
    }

    function getLocalIP() {
        return new Promise(function (resolve, reject) {
            // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
            var RTCPeerConnection =
                /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection ||
                window.mozRTCPeerConnection;

            if (!RTCPeerConnection) {
                reject("Your browser does not support this API");
            }

            var rtc = new RTCPeerConnection({ iceServers: [] });
            var addrs = {};
            addrs["0.0.0.0"] = false;

            function grepSDP(sdp) {
                var hosts = [];
                var finalIP = "";
                sdp.split("\r\n").forEach(function (line) {
                    // c.f. http://tools.ietf.org/html/rfc4566#page-39
                    if (~line.indexOf("a=candidate")) {
                        // http://tools.ietf.org/html/rfc4566#section-5.13
                        var parts = line.split(" "), // http://tools.ietf.org/html/rfc5245#section-15.1
                            addr = parts[4],
                            type = parts[7];
                        if (type === "host") {
                            finalIP = addr;
                        }
                    } else if (~line.indexOf("c=")) {
                        // http://tools.ietf.org/html/rfc4566#section-5.7
                        var parts = line.split(" "),
                            addr = parts[2];
                        finalIP = addr;
                    }
                });
                return finalIP;
            }

            if (1 || window.mozRTCPeerConnection) {
                // FF [and now Chrome!] needs a channel/stream to proceed
                rtc.createDataChannel("", { reliable: false });
            }

            rtc.onicecandidate = function (evt) {
                // convert the candidate to SDP so we can run it through our general parser
                // see https://twitter.com/lancestout/status/525796175425720320 for details
                if (evt.candidate) {
                    var addr = grepSDP("a=" + evt.candidate.candidate);
                    resolve(addr);
                }
            };
            rtc.createOffer(
                function (offerDesc) {
                    rtc.setLocalDescription(offerDesc);
                },
                function (e) {
                    console.warn("offer failed", e);
                }
            );
        });
    }

    function add() {
        var ico =
            '<svg version="1.1" id="exit" color="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">\n<g>\n	<path fill="currentColor" d="M256,5.1c138.6,0,250.9,112.3,250.9,250.9S394.6,506.9,256,506.9S5.1,394.6,5.1,256S117.4,5.1,256,5.1z\n		 M256,40.1C136.7,40.1,40.1,136.7,40.1,256S136.7,471.9,256,471.9S471.9,375.3,471.9,256S375.3,40.1,256,40.1z M311.4,176.6\n		c6.7-6.7,17.5-6.7,24.2,0c6.7,6.7,6.7,17.5,0,24.2l-55.1,55.1l55.1,55c6.7,6.7,6.7,17.5,0,24.2c-6.7,6.7-17.5,6.7-24.2,0L256.3,280\n		l-55.1,55.1c-6,6-15.4,6.6-22.1,1.8l-2.2-1.8c-6.7-6.7-6.7-17.5,0-24.2l55.1-55l-55.1-55c-6.7-6.7-6.7-17.5,0-24.2s17.5-6.7,24.2,0\n		l55.1,55.1L311.4,176.6z"/>\n</g>\n</svg>';
        var menu_items = $(
            '<li class="menu__item selector" data-action="exit_r"><div class="menu__ico">' +
                ico +
                '</div><div class="menu__text">' +
                Lampa.Lang.translate("exit_menu") +
                "</div></li>"
        );
        menu_items.on("hover:enter", function () {
            Lampa.Activity.out();
            if (Lampa.Platform.is("tizen"))
                tizen.application.getCurrentApplication().exit();
            if (Lampa.Platform.is("webos")) window.close();
            if (Lampa.Platform.is("android")) Lampa.Android.exit();
            if (Lampa.Platform.is("orsay")) Lampa.Orsay.exit();
            if (Lampa.Platform.is("nw")) nw.Window.get().close();
        });
        $(".menu .menu__list").eq(1).append(menu_items);
    }

    function createExitMenu() {
        window.plugin_exit_m_ready = true;
        Lampa.Component.add("exit_m", exit_m);
        if (window.appready) add();
        else {
            Lampa.Listener.follow("app", function (e) {
                if (e.type == "ready") add();
            });
        }
        console.log("App", "IP:", getLocalIP());
        const getIP = async () => {
            const { RTCPeerConnection } = window;
            const pc = new RTCPeerConnection({ iceServers: [] });
            pc.createDataChannel("");
            pc.createOffer().then(pc.setLocalDescription.bind(pc));
            pc.onicecandidate = (ice) => {
                if (!ice || !ice.candidate || !ice.candidate.candidate) return;
                const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                const ipMatch = ice.candidate.candidate.match(ipRegex);
                const ip = ipMatch && ipMatch[1];
                //console.log(ip);
				console.log("App", "IP:", ip);
                pc.onicecandidate = () => {};
            };
        };
        getIP();
    }
    if (!window.plugin_exit_m_ready) createExitMenu();
})();
