sortById = (p1, p2) => p1.id - p2.id
sortByName = (p1, p2) => p1.nome.toLowerCase().localeCompare(p2.nome.toLowerCase())
sortByOnorario = (p1, p2) => p1.onorario - p2.onorario
sortByTipo = (p1, p2) => p1.tipo.codice.toLowerCase().localeCompare(p2.tipo.codice.toLowerCase())
sortByParziale = (p1, p2) => !p1.isParziale

$('#data-sort').change((_) => updateData())

function getDataSorter() {
    switch ($('#data-sort').val()) {
        case 'nome':
            return sortByName;
        case 'inserimento':
            return sortById;
        case 'tipo':
            return sortByTipo;
        case 'onorario':
            return sortByOnorario;
        case 'parziali':
            return sortByParziale;
    }
}

function updateData() {
    dataSorter = getDataSorter();
    $("#data-table").empty();
    const parzialeCheckbox = $("<td/>");
    prestazioni.sort(dataSorter)
        .forEach((p, i) =>
            $("#data-table").append(
                $("<tr/>")
                    .append($("<td/>").text(p.tipo.descrizione).addClass("tipo"))
                    .append($("<td/>").text(p.nome))
                    .append($("<td/>").text(p.onorario))
                    .append($("<td/>")
                        .append(`<input type="checkbox"${p.isParziale ? ' checked="true"' : ''}></td>`).click((cb) => {
                            p.isParziale = !p.isParziale;
                            cb.checked = !cb.checked;
                        }))
                    .append($("<button/>")
                        .text("Rimuovi")
                        .on("click", (_) => {
                            prestazioni = prestazioni.filter(prest => prest.id !== p.id);
                            updateData();
                            updateStats();
                        })
                    ).css("background-color", i % 2 ? "rgb(51, 51, 51)" : "#363636")
            )
        );
}