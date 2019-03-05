<?php

use humhub\modules\drawio\Module;
use yii\helpers\Url;
use humhub\widgets\ActiveForm;
use humhub\libs\Html;
use Yii;

\humhub\modules\drawio\assets\Assets::register($this);

$modal = \humhub\widgets\ModalDialog::begin([
    'header' => Yii::t('DrawioModule.base', 'Robotics model')
])
?>
<?php $form = ActiveForm::begin(); ?>

<div id="modal-body" class="modal-body">
    <h1>Model X:</h1>
</div>

<div class="modal-footer">
<?= Html::submitButton('Click me!', ['data-action-click' => 'drawio.handleButton', 'data-ui-loader' => '', 'class' => 'btn btn-primary']); ?>
    @Vertex Studio
</div>

<?php ActiveForm::end(); ?>


<?php \humhub\widgets\ModalDialog::end(); ?>
