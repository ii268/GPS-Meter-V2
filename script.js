const maininfo = document.querySelector('.main-info');
var id,power = false;

on_off_btn.addEventListener("click",onoff);

function onoff(){
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
errclose.addEventListener("click",()=>{
    err_dia.close();
});
err_dia.addEventListener("close",()=>{
    onoff();
    maininfo.style.borderColor = '#a11';
});

seting_btn.addEventListener("click",()=>{
    setting_dia.showModal();
});
settingclose.addEventListener("click",()=>{
    setting_dia.close();
});