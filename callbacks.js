$("#riepilogo-btn").click(() =>
    $("#riepilogo-modal").css("display", "block")
);

$(".close").click(() =>
    $(".modal").css("display", "none")
);

/* Aggiunta prestazione */
$("form").submit(function (_) {
    let onorario = +$("#onorario").val();
    if (isNaN(onorario) || onorario === 0) {
        alert("Inserire un onorario numerico maggiore di 0, usando il punto per le cifre decimali");
        return false;
    }
    prestazioneSequence++;
    prestazioni.push({
        id: prestazioneSequence,
        tipo: {
            codice: $("#form-tipo").val(),
            descrizione: $(`#form-tipo [value=${$("#form-tipo").val()}]`).text()
        },
        nome: $('#form-nome').val() || 'Fattura ' + prestazioneSequence,
        onorario: onorario,
        isParziale: $('#parziale-check').is(':checked')
    });
    $('#form-nome').attr('placeholder', `Fattura ${prestazioneSequence + 1}`)
    updatePage();
    return false;
})

$("#salva-btn").click((cb) => {
    var pdf = new jsPDF('p', 'pt', 'letter');
    pdf.cellInitialize();
    pdf.setFontSize(10);
    $.each($('#stat-table'), function (_, elem) { // for head and body
        $.each($(`#${elem.id} tr`), function (i, row) {
            $.each($(row).find("td, th"), function (j, cell) {
                var txt = $(cell).text().trim() || " ";
                var width = (j == 0) ? 300 : 100; //make 0th column bigger
                pdf.cell(10, 50, width, 30, txt, i);
            });
        });
    });
    pdf.save('ISA.pdf');
})