<?php
if (!isset($_SESSION['token'])) {
    header("Location: " . $base . '/');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.css" />
    <script src="https://cdn.datatables.net/2.1.3/js/dataTables.js"></script>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- css do arquivo -->
    <link rel="stylesheet" href="<?= $base; ?>/css/header/header.css">
</head>
<body style="background-color: #EDF2F6;">
    <header class="header">
        <div>
            <h1>AGN</h1>
        </div>
        <div>
            <h4>Agendamento de devoluções</h4>
        </div>

        <!-- validar se é admin -->
         <?php  if($_SESSION['idgrupo'] == 1) {  ?>
            <div>
                <a style="color:white; text-decoration:none;" href="">Usuários</a>  
            </div>
        <?php } ?>
        <div>
        <i class="fas fa-user-circle"></i></i>  <?=$_SESSION['usuario'] ?>
            <a href="<?= $base; ?>/deslogar" style="color:white; text-decoration:none;">Sair</a>
        </div>
    </header>

    <aside class="sidebar">
        <img src="<?= $base; ?>/img/logo_topo.png" alt="texte" style="width:100%; padding: 10px;">
        <hr style="color:#000;">
        <ul>
            <li>
                <a href="#transportadoraMenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Transportadoras</a>
                <ul class="collapse list-unstyled" id="transportadoraMenu">
                    <li class="collapse-item">
                        <a href="<?= $base; ?>/transportadoras">Manutenção</a>
                    </li>
                </ul>
            </li>
        </ul>

        <ul>
            <li>
                <a href="#transportadoraMenu1" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Devoluções</a>
                <ul class="collapse list-unstyled" id="transportadoraMenu1">
                    <li class="collapse-item">
                        <a href="<?= $base; ?>/transportadoras">Agendar</a>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>