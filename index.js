/* TODO
$("#modal-salva-btn").click((cb) => {
    const filename = 'isa.txt';
    var file = new Blob(prestazioni, { type: "text" });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
});*/

function updatePage() {
    updateData();
    updateStats();
}

updatePage();