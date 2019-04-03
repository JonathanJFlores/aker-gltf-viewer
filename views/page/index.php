<?php 

$bundle = \humhub\modules\drawio\assets\Assets::register($this);
?>

<div id="canvas-container">
    <a id="close-btn" class="close-btn" onclick="return window.history.back()"> X </a>
    <section id="loading-screen">
        <div id="loader"></div>
    </section>
    <div id="model" style="display: none;">
        <?php
        $backSlash = preg_split('/\//', $route);
        setcookie(preg_split('/\./', $backSlash[sizeof($backSlash) - 1])[0], true, time() + (86400 * 365));
        echo $route
        ?>

    </div>
</div> 