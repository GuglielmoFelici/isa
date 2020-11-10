function updateStats() {
    const reduceOnorari = (result, p) => result + +p.onorario;
    totale = prestazioni.reduce(reduceOnorari, 0);
    tipi.forEach((tipo, idx) => {
        let prestazioniByTipo = prestazioni.filter(p => p.tipo.codice === tipo.codice)
        let numero = prestazioniByTipo.length;
        let totaleTipo = prestazioniByTipo.reduce(reduceOnorari, 0);
        let percentuale = totale ? totaleTipo * 100 / totale : 0;
        $(`#stat-${tipo.codice} .numero`)
            .text(numero);
        $(`#stat-${tipo.codice} .totale`)
            .text(totaleTipo);
        $(`#stat-${tipo.codice} .percentuale`)
            .text(`${percentuale ? percentuale.toFixed(2) : percentuale}%`);
    });

    const totaleNumero = prestazioni.length;
    const prestazioniParziali = prestazioni.filter(p => p.isParziale);
    const numeroParziali = prestazioniParziali.length
    const valoreParziali = prestazioniParziali.reduce(reduceOnorari, 0);
    const percentualeParziali = totale ? (valoreParziali / totale) * 100 : 0;
    $("#stat-totale .numero").text(totaleNumero);
    $("#stat-totale .valore").text(totale);
    $('#numero-parziali').text(numeroParziali);
    $('#valore-parziali').text(valoreParziali);
    $('#percentuale-parziali').text(`${percentualeParziali ? percentualeParziali.toFixed(2) : percentualeParziali}%`);
}

/* Inizializza lista tipi. TODO: invertire flusso: da js a html */
$("#insert-new option[value]").each((_, e) => tipi.push({
    codice: e.getAttribute("value"),
    descrizione: e.textContent
}))

/* Inizializza stat */
tipi.forEach((tipo, i) => {
    $("#stat-parziali")
        .before(
            $("<tr/>")
                .attr("id", `stat-${tipo.codice}`)
                .append(
                    $("<td/>")
                        .addClass("tipo")
                        .text(tipo.descrizione),
                    $("<td/>")
                        .addClass("numero")
                        .text(0),
                    $("<td/>")
                        .addClass("totale")
                        .text(0),
                    $("<td/>")
                        .addClass("percentuale")
                        .text("0%")
                )
                .css("background-color", i % 2 ? "rgb(51, 51, 51)" : "#363636"))
});