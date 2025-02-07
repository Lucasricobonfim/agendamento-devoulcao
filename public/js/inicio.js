$(document).ready(function () {
    Load()

})

let myPieChart;
let todos = 0


function Load() {
    getTransportadora()
    getCd()
    getSituacao()
    getDashBoard()
    getQtdDash()
}



function listar() {


    app.callController({
        method: 'GET',
        url: base + '/getTotalSolicitações',
        params: null,
        onSuccess(res) {
            let dados = res[0].ret.result


            if (parseInt(dados[0].idtipofilial) == 1) {
                $('#totalsolicitacoes').text(dados[0].total)
                return
            }
            if (parseInt(dados[0].idtipofilial) == 3) {
                $('#totalsolicitacoes').text(dados[0].total)
                return
            }
            if (parseInt(dados[1].idtipofilial) == 2) {
                $('#totalagendamento').text(dados[1].total)
                return
            }


        },
        onFailure(res) {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar total de Solicitações!"
            });
            return
        }
    })
}



$('#pesquisar').on('click', function () {
    todos = 1
    let dados = {
        idtransportadora: $('#idtransportadora').val(),
        idcd: $('#idcd').val(),
        datainicio: $('#datainicio').val(),
        datafim: $('#datafim').val(),
        idsituacao: $('#idsituacao').val()
    }
    $('#datainicio').on('input', function () {
        $(this).removeClass('erro');
    });
    $('#datafim').on('input', function () {
        $(this).removeClass('erro');
    });
    $('#idsituacao').on('input', function () {
        $(this).removeClass('erro');
    });
    
    if (dados.datainicio > dados.datafim) {
        Swal.fire({
            icon: 'warning',
            title: 'Aviso',
            text: 'Data Inicio maior que a Data fim.',
        });
        return
    }

    if (!app.validarCampos(dados)) {
        Swal.fire({
            icon: "warning",
            title: "Atenção!!",
            text: "Preencha todos os campos!"
        });
        return
    }

    getDashBoard(dados)
    getQtdDash(dados)

})


function limparCampos() {

    $('#datainicio').val(''),
    $('#datafim').val(''),
    $('#idsituacao').val('')

    $('#datainicio').removeClass('erro');
    $('#datafim').removeClass('erro');
    $('#idsituacao').removeClass('erro');
}

function Limpar(grupo) {


    limparCampos()
    todos = 0
    getDashBoard()
    getQtdDash()


}

function grafico(dados) {
    let quantidades = {
        pendente: 0,
        andamento: 0,
        finalizado: 0,
        recusado: 0,
        cancelada: 0
    };

    // Preenchendo o objeto quantidades com os dados recebidos
    $.each(dados, function (i, el) {
        switch (parseInt(el.idsituacao)) {
            case 1:
                quantidades.pendente = el.qtd;
                break;
            case 2:
                quantidades.andamento = el.qtd;
                break;
            case 3:
                quantidades.finalizado = el.qtd;
                break;
            case 4:
                quantidades.recusado = el.qtd;
                break;
            case 5:
                quantidades.cancelada = el.qtd;
                break;
        }
    });


    const totalQuantidades = Object.values(quantidades).reduce((acc, curr) => acc + curr, 0);

    if (totalQuantidades === 0) {
        // Exibe a mensagem "SEM DADOS" e oculta o canvas
        document.getElementById('myPieChart').style.display = 'none';
        document.getElementById('noDataMessage').style.display = 'block';
        return; // Interrompe a execução para não criar o gráfico
    } else {
        // Caso haja dados, mostra o canvas e oculta a mensagem "SEM DADOS"
        document.getElementById('myPieChart').style.display = 'block';
        document.getElementById('noDataMessage').style.display = 'none';
    }

    var ctx = document.getElementById('myPieChart').getContext('2d');

    // Verifica se já existe um gráfico e o destrói, se necessário
    if (myPieChart) {
        myPieChart.destroy();
    }

    // Cria um novo gráfico
    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['PENDENTE', 'ANDAMENTO', 'FINALIZADO', 'RECUSADO', 'CANCELADO'],
            datasets: [{
                label: 'Exemplo de Gráfico Pizza',
                data: [
                    parseInt(quantidades.pendente),
                    parseInt(quantidades.andamento),
                    parseInt(quantidades.finalizado),
                    parseInt(quantidades.recusado),
                    parseInt(quantidades.cancelada)
                ],
                backgroundColor: [
                    'rgb(235, 190, 43)',  // Amarelo
                    'rgb(43, 72, 235)',   // Azul
                    'rgb(51, 170, 51)',   // Verde
                    'rgb(235, 43, 43)',   // Vermelho
                    'rgb(100, 11, 85)'    // Roxo
                ],
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let label = tooltipItem.label || '';
                            let value = tooltipItem.raw || 0;
                            return `${label}: ${value} agendamentos`;
                        }
                    }
                }
            }
        }
    });
}


function getTransportadora() {
    app.callController({
        method: 'GET',
        url: base + '/get-transportadora-dash',
        params: { idgrupo: 2 },
        onSuccess(res) {

            var rec = res[0].ret

            opp = $('.oppt');
            opp.html('');
            if (rec != '') {
                $.each(rec, function (i, el) {

                    opp.append("<option id='idtransportadora' value='" + el.idtransportadora + "' >" + el.descricao + "</option>")
                })
            }



        },
        onFailure(res) {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar Transportadora!"
            });
            return
        }
    })
}


function getCd() {
    app.callController({
        method: 'GET',
        url: base + '/get=cd-dash',
        params: { idgrupo: 3 },
        onSuccess(res) {

            var rec = res[0].ret

            opp = $('.oppc');
            opp.html('');
            if (rec != '') {

                $.each(rec, function (i, el) {

                    opp.append("<option id='idcd' value='" + el.idcd + "' >" + el.descricao + "</option>")
                })
            }

        },
        onFailure(res) {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar centro de distribuição!"
            });
            return
        }
    })
}



function getDashBoard(dados = null) {

    app.callController({
        method: 'GET',
        url: base + '/get-dashboard',
        params: { dados: dados, todos: todos },
        onSuccess(res) {
            var rec = res[0].ret

            Table(rec)
        },
        onFailure(res) {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar dados DashBoard!"
            });
            return
        }
    })
}


function getQtdDash(dados = null) {

    app.callController({
        method: 'GET',
        url: base + '/get-dashboard-qtd',
        params: { dados: dados, todos: todos },
        onSuccess(res) {
            var rec = res[0].ret

            grafico(rec)
        },
        onFailure(res) {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar quantidades!"
            });
            return
        }
    })
}




function getSituacao() {
    app.callController({
        method: 'GET',
        url: base + '/getsituacao',
        params: null,
        onSuccess(res) {
            var rec = res[0].ret
            opp = $('.opps');
            opp.html('');
            if (rec != '') {
                opp.append("<option  id='idsituacao' value=''>Selecione</option>")
                $.each(rec, function (i, el) {
                    opp.append("<option id='idsituacao' value='" + el.idsituacao + "' >" + el.situacao + "</option>")
                })
            }
        },
        onFailure(res) {
            Swal.fire({
                icon: "error",
                title: "Atenção!!",
                text: "Erro ao listar as situações!"
            });
            return
        }
    })
}








const Table = function (dados, idsituacao) {

    //var dados = JSON.parse(ret)
    $('#mytable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        stateSave: true,
        "bDestroy": true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json"
        },
        buttons: [
            {
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6] // Exporta somente as colunas escolhidas para planilha 
                }
            },
            {
                extend: 'excelHtml5',
                title: 'RELATORIO',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            },
            {
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            },
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'A3',
                title: 'RELATORIO',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
                },
                customize: function (doc) {
                    // Reduz as margens da página para expandir a tabela
                    doc.pageMargins = [10, 10, 10, 10];

                    // Centraliza o título
                    doc.content[0].alignment = 'center';

                    // Ajusta o tamanho da fonte do título
                    doc.content[0].fontSize = 14;

                    // Aumenta o tamanho da tabela
                    doc.content[1].layout = {
                        hLineWidth: function () { return 0.5; },
                        vLineWidth: function () { return 0.5; },
                        paddingLeft: function () { return 5; },
                        paddingRight: function () { return 5; },
                        paddingTop: function () { return 5; },
                        paddingBottom: function () { return 5; }
                    };

                    // Define o estilo do cabeçalho da tabela
                    doc.styles.tableHeader = {
                        alignment: 'center',
                        fillColor: '#2D9CDB',
                        color: 'white',
                        bold: true,
                        fontSize: 12
                    };

                    // Ajusta o conteúdo da tabela para centralizar
                    doc.styles.tableBodyEven = { alignment: 'center' };
                    doc.styles.tableBodyOdd = { alignment: 'center' };

                    // Define o alinhamento padrão para todo o conteúdo
                    doc.defaultStyle.alignment = 'center';

                    // Ajusta o tamanho das colunas para preencher mais a página
                    var table = doc.content[1].table;
                    table.widths = Array(table.body[0].length).fill('*'); // Define a largura de todas as colunas para distribuir igualmente
                }
            }
        ],
        lengthMenu: [
            [10, 100, 500, -1],
            [10, 100, 500, "All"]
        ],
        data: dados,
        columns: [
            {
                title: 'Cód Solicitacao',
                data: 'idsolicitacao',
            },
            {
                title: 'CD',
                data: 'nome_cd',
            },
            {
                title: 'Transportadora',
                data: 'nome_transportadora'
            },
            {
                title: 'Placa',
                data: 'placa',
                render: function (data) {
                    const placaMascara = data.replace(/^([A-Z]{3})(\d{1}[A-Z]\d{2})$/, "$1-$2") // Para o formato ABC-1A34
                        .replace(/^([A-Z]{3})(\d{4})$/, "$1-$2"); // Para o formato ABC-1234
                    return placaMascara;
                }
            },
            {
                title: 'Data Agendada',
                data: 'data',
            },
            {
                title: 'QTD Notas',
                data: 'quantidadenota',
            },
            {
                title: 'Situação',
                data: 'situacao',
                render: function (data, type, row) {
                    let statusClass = '';

                    // Usando switch case para definir a classe de acordo com a situação
                    switch (parseInt(row.idsituacao)) {
                        case 1: statusClass = 'status-pendente'; break;
                        case 2: statusClass = 'status-andamento'; break;
                        case 3: statusClass = 'status-finalizado'; break;
                        case 4: statusClass = 'status-recusado'; break;
                        case 5: statusClass = 'status-cancelado'; break;
                        default: statusClass = '';
                    }

                    return `<span class="${statusClass}">${data}</span>`;
                }
            },
            {
                title: 'Observação',
                data: null, // Usamos `null` se não há uma propriedade específica para essa coluna no objeto de dados.
                render: function (data, type, row) {
                    dados = JSON.stringify(row).replace(/"/g, '&quot;');
                    return '<button style="width: 100%; " class="btn btn-primary btn-sm" onclick="abrirModalObs(' + dados + ')">Observação</button> '
                }
            },
        ],
        columnDefs: [
            {
                targets: [0], // Índice da coluna "Cód Solicitacao"
                width: '1px' // Definindo a largura desejada
            },
            {
                targets: [2], // Índice da coluna "Cód Solicitacao"
                width: '1px' // Definindo a largura desejada
            },
            {
                targets: [4], // Índice da coluna "Cód Solicitacao"
                width: '1px' // Definindo a largura desejada
            }
        ],
        rowCallback: function (row, data) { },
        initComplete: function (settings, json) { }
    });




    if (!$('#kt_datatable_example_export_menu').data('events-bound')) {
        $('#kt_datatable_example_export_menu').data('events-bound', true);
        var exportButtons = document.querySelectorAll('#kt_datatable_example_export_menu [data-kt-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();
                const exportValue = e.target.getAttribute('data-kt-export');


                const target = document.querySelector('.dt-buttons .buttons-' + exportValue);
                target.click();
            });
        });
    }



}


function abrirModalObs(dados) {

    opp = $('.obshist');
    opp.html('');
    if (dados.observacoes) {
        observacoes = dados.observacoes.split('|');
        situacao_operacao = dados.situacao_operacao.split('|');
        dataoperacao = dados.dataoperacao.split('|');
    }

    let registros = observacoes.map((obs, index) => ({
        observacao: obs || '',
        situacao: situacao_operacao[index] || '',
        data: dataoperacao[index] || ''
    }));

    registros.sort((a, b) => {
        let dateA = new Date(a.data.trim().replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
        let dateB = new Date(b.data.trim().replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
        return dateA - dateB;
    });
    $('#observacaoModal').modal('show');

    for (let registro of registros) {
        opp.append(
            "<tr><td>" + registro.observacao + "</td><td>" + registro.situacao + "</td><td>" + registro.data + "</td></tr>"
        );
    }

}

function fechaModalObs() {
    $('#conteudo_obs').text('')
    $('#observacaoModal').modal('hide');

}