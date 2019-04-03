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
            $models = ConfigureForm::getModelsByGrade(strtoupper($grade)); ?>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <td scope="col">Número de lección</td>
                        <td scope="col"></td>
                        <td scope="col">Estado</td>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($models as $key => $value) : ?>
                    <tr>
                        <?php 
                        $routes = preg_split('/\//', $value);
                        $msg = 'Sin completar';
                        $model = preg_split('/\./', $routes[sizeof($routes) - 1])[0];
                        if (isset($_COOKIE[$model])) {
                            $msg = "Visto";
                        }
                        ?>
                        <td><?php echo $model ?></td>
                        <td><?php echo Button::primary(Yii::t('DrawioModule.base', 'Ver'))->link($contentContainer->createUrl("//drawio/page", ['route' => $value])) ?></td>
                        <td><?php echo $msg ?> </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>



        </div>
    </div>
</div> 