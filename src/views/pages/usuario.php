<?php $render('header');?> 

<style>

.form-container {
    max-width: 62%;
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
    margin-bottom: 20px; /* ajuste conforme necessário */
}


h5 {
    margin: 0; /* remove o espaçamento padrão */
}
</style>

<div class="form-container">
    <div class="header-container">
        <button id="novo" class="btn btn-primary" onclick="limparForm()">Novo</button>
        <h5>Informações básicas</h5>
    </div>

    <div style="margin-top: 50px;">
        <div class="row">
            <input id="idfilial" type="text" class="form-control"  hidden>

            <div class="mb-3">
                        <label for="nome" class="form-label">Nome<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                    </div>
                    <div class="mb-3">
                        <label for="login" class="form-label">Login<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="login" name="login" required>
                    </div>
                    <div class="mb-3">
                        <label for="senha" class="form-label">Senha<span class="text-danger">*</span></label>
                        <input type="password" class="form-control" id="senha" name="senha" required>
                    </div>
                    <div class="mb-3">
                        <label for="idfilial" class="form-label">Filial<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="idfilial" name="idfilial" required>
                    </div>
                    <div class="mb-3">
                        <label for="grupo" class="form-label">Grupo<span class="text-danger">*</span></label>
                        <select class="form-select" id="idgrupo" name="idgrupo" required>
                            <option value="">Selecionar</option>
                            <option value="1">ADM</option>
                            <option value="2">Transportadora</option>
                            <option value="3">CD</option>
                        </select>
                    </div>
        </div>
        <div class="form-footer">
            <button id="cadastro" class="btn btn-primary">Gravar</button>
        </div>
    </div>
</div>

<div class="form-container">
    <table id="mytable" class="table table-striped table-bordered display nowrap" style="width:100%">
        
    </table>
</div>
 


</body>
<script src="<?= $base; ?>/js/usuario.js" ></script>
<!-- Bootstrap JS -->
<script>
    const base = '<?= $base; ?>';
</script> 