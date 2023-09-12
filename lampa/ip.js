(function () {
    "use strict";

    Lampa.Lang.add({
        exit_menu: {
            en: "IP"
        }
    });

    function exit_m(object) {
        this.create = function () {};
        this.build = function () {};
        this.start = function () {};
        this.pause = function () {};
        this.stop = function () {};
        this.render = function () {};
        this.destroy = function () {};
    }

    //get the IP addresses associated with an account
    function getIPs(callback) {
        var ip_dups = {};
        //compatibility for firefox and chrome
        var RTCPeerConnection =
            window.RTCPeerConnection ||
            window.mozRTCPeerConnection ||
            window.webkitRTCPeerConnection;
        var useWebKit = !!window.webkitRTCPeerConnection;
        //bypass naive webrtc blocking using an iframe
        if (!RTCPeerConnection) {
            //NOTE: you need to have an iframe in the page right above the script tag
            //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
            //<script>...getIPs called in here...
            //
            var win = iframe.contentWindow;
            RTCPeerConnection =
                win.RTCPeerConnection ||
                win.mozRTCPeerConnection ||
                win.webkitRTCPeerConnection;
            useWebKit = !!win.webkitRTCPeerConnection;
        }
        if (!RTCPeerConnection) {
            console.log("IP", "Your browser does not support this API");
            reject('Your browser does not support this API');
          }
        //minimal requirements for data connection
        var mediaConstraints = {
            optional: [{ RtpDataChannels: true }]
        };
        var servers = {
            iceServers: [
                {
                    urls: !!navigator.userAgent.match(/\bfirefox\b/i)
                        ? "stun:54.217.240.163"
                        : "stun:turn.calls.bitrix24.com"
                }
            ]
        };
        //construct a new RTCPeerConnection
        var pc = new RTCPeerConnection(servers, mediaConstraints);
        function handleCandidate(candidate) {
            //match just the IP address
            var ip_regex =
                /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
            var ip_addr = ip_regex.exec(candidate)[1];
            //remove duplicates
            if (ip_dups[ip_addr] === undefined) callback(ip_addr);
            ip_dups[ip_addr] = true;
        }
        //listen for candidate events
        pc.onicecandidate = function (ice) {
            //skip non-candidate events
            if (ice.candidate) handleCandidate(ice.candidate.candidate);
        };
        //create a bogus data channel
        pc.createDataChannel("");
        //create an offer sdp
        pc.createOffer(
            function (result) {
                //trigger the stun server request
                pc.setLocalDescription(
                    result,
                    function () {},
                    function () {}
                );
            },
            function () {}
        );
        //wait for a while to let everything done
        setTimeout(function () {
            //read candidate info from local description
            var lines = pc.localDescription.sdp.split("\n");
            lines.forEach(function (line) {
                if (line.indexOf("a=candidate:") === 0) handleCandidate(line);
            });
        }, 1000);
    }

    function add() {
        var ifr =
            '<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>';
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
            getIPs(function (ip) {
                alert(ip);
            });
        });
        $(".menu .menu__list").eq(1).append(menu_items);
        $(".menu .menu__list").eq(1).append(ifr);
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
        //log IP addresses
        getIPs(function (ip) {
            //local IPs
            if (
                ip.match(
                    /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/
                )
            )
                console.log("IP", "Local IPs: ", ip);
            //IPv6 addresses
            else if (ip.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/))
                console.log("IP", "IPv6 Addresses: ", ip);
            //assume the rest are public IPs
            else console.log("IP", "Public IPs: ", ip);
        });
    }
    if (!window.plugin_exit_m_ready) createExitMenu();
})();
