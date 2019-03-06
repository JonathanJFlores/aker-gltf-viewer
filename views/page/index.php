<?php 
use humhub\libs\Html;

$bundle = \humhub\modules\drawio\assets\Assets::register($this);
?>

<div class="panel panel-default">
    <div id="canvas-container" class="panel-body">
        <section id="loading-screen" class="row">
            <div id="loader"></div>
        </section>
        <div id="model" style="display: none;">
            <?php
            $backSlash = preg_split('/\//', $route);
            setcookie(preg_split('/\./', $backSlash[sizeof($backSlash) - 1])[0], true, time() + (86400 * 365));
            echo $bundle->baseUrl . $route
            ?>

        </div>

    </div>
</div> 