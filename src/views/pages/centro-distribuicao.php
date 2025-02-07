<?php $render('header'); ?>

<style>
    .form-container {
        max-width: 80%;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-top: 100px;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }


    h5 {
        margin: 0;
    }
    .form-cad{
        margin-left: 100px;
    }
    @media (max-width: 395px) {
        .form-cad {
            font-size: 0.90rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.90rem;
            margin-left: 10px;
        }
    }

    @media (max-width: 412px) {
        .form-cad {
            font-size: 0.90rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.90rem;
            margin-left: 10px;
        }
    }

    @media (max-width: 600px) {
        .form-cad {
            font-size: 0.90rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.90rem;
            margin-left: 10px;
        }
    }

    @media (max-width: 900px) {
        .form-cad {
            font-size: 0.99rem;
            margin-left: 20px;
        }

        .media-h5 {
            font-size: 0.99rem;
            margin-left: 10px;
        }
    }
</style>

<main class='main-div' style="width:100%;">
    <div class="form-container">
        <div class="header-container">
            <button id="novo" class="btn-custom" onclick="limparForm()">Novo</button>
            <h5 id="form-title" class="form-cad">Cadastrando CD</h5>
            <h5 class="media-h5">Informações básicas</h5>
        </div>

        <div style="margin-top: 50px;">
            <div class="row">
                <input id="idfilial" type="text" class="form-control" hidden>

                <div class="col-md-6 mb-3">
                    <label for="nome" class="form-label">Nome<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nome" placeholder="Nome">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="cnpj_cpf" class="form-label">CNPJ<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="cnpj_cpf" placeholder="CNPJ">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">E-mail<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="email" placeholder="E-mail">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="telefone" class="form-label">Telefone<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="telefone" placeholder="Telefone">
                </div>
            </div>
            <div class="form-footer">
                <button id="cadastro" class="btn-custom">Gravar</button>
            </div>
        </div>
    </div>

    <div class="form-container">
        <h1><strong>Centro de Distribuição</strong></h1>
        Gestão de centros de distribuição
        <table id="mytable" class="table table-bordered display nowrap" style="width:100%">

        </table>
    </div>


</main>

</body>
<script src="<?= $base; ?>/js/centro-distribuicao.js"></script>
<!-- Bootstrap JS -->
<script>
    const base = '<?= $base; ?>';
</script>