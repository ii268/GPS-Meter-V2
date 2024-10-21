const key_name = 'GPS-MATER-V1';
var seting_data;

const maininfo = document.querySelector('.main-info');
var id, power = false;

const bodys = document.querySelector('body');
function darkmode(e) {
    if (e) {
        bodys.classList.add('dark');
    } else {
        bodys.classList.remove('dark');
    }
}

if (!localStorage.hasOwnProperty(key_name)) {
    console.info('create key');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        seting_data = '{ "darkmode": true, "speedgoh": 0, "speedgos": 0}';
        darkmode(true);
        dackmode_set.checked = true;
    } else {
        seting_data = '{ "darkmode": false, "speedgoh": 0, "speedgos": 0}';
    }
    localStorage.setItem(key_name, seting_data);
    seting_data = JSON.parse(seting_data);
    info_dia.showModal();
} else {
    seting_data = JSON.parse(localStorage.getItem(key_name));
    speedgoh.value = seting_data["speedgoh"];
    speedgos.value = seting_data["speedgos"];

    darkmode(seting_data["darkmode"]);
    dackmode_set.checked = seting_data["darkmode"];
}

on_off_btn.addEventListener("click", onoff);

function onoff() {
    if (power) {
        navigator.geolocation.clearWatch(id);
        on_off_btn.style = '';
        on_off_btn.innerText = 'OFF';
        maininfo.style = '';
        power = false;
    } else {
        id = navigator.geolocation.watchPosition(gps, err, { "enableHighAccuracy": true });
        on_off_btn.style.background = '#1e56a0';
        on_off_btn.innerText = 'ON';
        maininfo.style.borderColor = '#080';
        power = true;
    }
}

function gps(p) {
    const co = p.coords;
    speed_h.innerText = Math.round(co.speed * 3.6) + eval(speedgoh.value);
    speed_m.innerText = Math.round(co.speed) + eval(speedgos.value);

    latitude.innerHTML = co.latitude;
    longitude.innerHTML = co.longitude;
    accuracy.innerHTML = Math.round(co.accuracy);
    altitude.innerHTML = Math.round(co.altitude);
    heading.innerHTML = Math.round(co.heading);

    mapurl.setAttribute("href", 'https://www.google.com/maps/search/?api=1&query=' + co.latitude + "," + co.longitude);
}

function err(p) {
    err_dia.showModal();
    errcode.innerText = p.code;
}
errclose.addEventListener("click", () => {
    err_dia.close();
});
err_dia.addEventListener("close", () => {
    onoff();
    maininfo.style.borderColor = '#a11';
});

seting_btn.addEventListener("click", () => {
    setting_dia.showModal();
});

settingclose.addEventListener("click", () => {
    setting_dia.close();
});

setting_dia.addEventListener("close", () => {
    seting_data["speedgoh"] = speedgoh.value;
    seting_data["speedgos"] = speedgos.value;

    darkmode(dackmode_set.checked);
    seting_data["darkmode"] = dackmode_set.checked;

    localStorage.setItem(key_name, JSON.stringify(seting_data));
    console.log(seting_data);
});
info_btn.addEventListener("click",()=>{
    info_dia.showModal();
});
infoclose.addEventListener("click",()=>{
    info_dia.close();
});