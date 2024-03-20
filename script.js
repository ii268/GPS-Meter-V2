const maininfo = document.querySelector('.main-info');
var id,power = false;

on_off_btn.addEventListener("click",()=>{
    if (power) {
        navigator.geolocation.clearWatch(id);
        on_off_btn.style = '';
        on_off_btn.innerText = 'OFF';
        maininfo.style = '';
        power = false;
    } else {
        id = navigator.geolocation.watchPosition(gps, error, { "enableHighAccuracy": true });
        on_off_btn.style.background = '#1e56a0';
        on_off_btn.innerText = 'ON';
        maininfo.style.borderColor = '#080';
        power = true;
    }
});

function gps(p) {
    speed_h.innerText = Math.round(p.coords.speed * 3.6);
    speed_m.innerText = Math.round(p.coords.speed);

    latitude.innerHTML = p.coords.latitude;
    longitude.innerHTML = p.coords.longitude;
    accuracy.innerHTML = Math.round(p.coords.accuracy);
    altitude.innerHTML = Math.round(p.coords.altitude);
    heading.innerHTML = Math.round(p.coords.heading);
}
function error(p) {
    maininfo.style.borderColor = '#a11';
    alert("ERROR!!\n code:"+p.code);
}