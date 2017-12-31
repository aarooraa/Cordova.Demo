var admobid = {}
if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
  admobid = {
    banner: 'ca-app-pub-1144612008712915/7593821740'
  }
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  // for ios
  admobid = {
    banner: 'ca-app-pub-3940256099942544/2934735716'
  }
}

phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: false,
        enableBrowserBackButton: true
    },

    i18n: null
});

var app = phonon.navigator();

app.on({ page: 'home', content: 'home.html' });

app.on({ page: 'battery', content: 'battery.html' }, function (activity) {
    activity.onReady(function () {
        window.addEventListener("batterystatus", function (status) {
            $('#batterylevel').html(status.level);
            $('#batteryplugged').html((status.isPlugged) ? "Yes" : "No");
        }, false);

        window.addEventListener("batterylow", function (status) {
            $('#batterylow').html("Yes");
        }, false);

        window.addEventListener("batterycritical", function (status) {
            $('#batterycritical').html("Yes");
        }, false);
    });
});

app.on({ page: 'device', content: 'device.html' }, function (activity) {
    activity.onReady(function () {
        $('#devicecordova').html(device.cordova);
        $('#devicemodel').html(device.model);
        $('#deviceplatform').html(device.platform);
        $('#deviceuuid').html(device.uuid);
        $('#devicemanufacturer').html(device.manufacturer);
        $('#deviceisvirtual').html(device.isVirtual);
        $('#deviceserial').html(device.serial);
    });
});

app.on({ page: 'devicemotion', content: 'devicemotion.html' }, function (activity) {
    activity.onReady(function () {
        navigator.accelerometer.watchAcceleration(
            function(acceleration) {
                $('#accelerationx').html(acceleration.x);
                $('#accelerationy').html(acceleration.y);
                $('#accelerationz').html(acceleration.z);
            }, 
            function() { alert("Device motion not detected."); }, 
            { frequency: 100 });
    });
});

document.addEventListener('deviceready', function () {
    app.start()

    admob.banner.config({
        id: admobid.banner,
        isTesting: true,
        autoShow: true,
    });

    admob.banner.prepare();

    admob.interstitial.config({
        id: admobid.interstitial,
        isTesting: true,
        autoShow: false,
    });

    admob.interstitial.prepare();
});

