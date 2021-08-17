const { ipcRenderer, clipboard } = require(`electron`);
const ipc = ipcRenderer

var oldData;

setInterval(function(){
    var onoff;

    if(document.getElementById("toggle-state").checked) {
        onoff = 1;
    }
    else {
        onoff = 0;
    }

    var red = ('00' + document.getElementById("slider_red").value).slice(-3);
    var green = ('00' + document.getElementById("slider_green").value).slice(-3);
    var blue = ('00' + document.getElementById("slider_blue").value).slice(-3);

    var data = `${onoff}${red}${green}${blue}`

    if(data !== oldData) {
        ipc.send(`update`, data)
        oldData = data;
    }
}, 3000);

minimizeBtn.addEventListener(`click`, () => {
    ipc.send(`minimizeApp`)
})

closeBtn.addEventListener(`click`, () => {
    ipc.send(`closeApp`)
})

copyBtn.addEventListener(`click`, () => {
    clipboard.writeText(hex.innerText);
})