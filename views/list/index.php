<?php
use humhub\libs\Html;
use humhub\modules\drawio\models\ConfigureForm;
use \yii\helpers\Url;
use humhub\widgets\Button;
use Yii;
?>

<div class="panel panel-default">
<div class="panel-body">
        <div class="row">
            <?php
            $cookies = Yii::$app->request->cookies;
            $parts = preg_split('/-+/', $contentContainer->name);
            $grade = $parts[0][strlen($parts[0]) - 2] . $parts[0][strlen($parts[0]) - 1];
            $models = ConfigureForm::getModelsByGrade(strtoupper($grade));
            $counter = 0;
            echo "<ul>";
            foreach ($models as $key => $value) {
                $routes = preg_split('/\//', $value);
                $msg = 'Sin completar';
                $model = preg_split('/\./', $routes[sizeof($routes) - 1])[0];
                if (isset($_COOKIE[$model])) {
                    $msg = "Visto!";
                }
                echo "<li> Modelo: " . $model . " " .
                    Button::primary(Yii::t('DrawioModule.base', 'Ver'))->link($contentContainer->createUrl("//drawio/page", ['route' => $value])) .
                    " " . $msg .
                    " </li>";



            }
            echo "</ul>"
            ?>
            
            
        </div>
    </div>
</div>