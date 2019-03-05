<?php 
namespace humhub\modules\drawio\controllers;

use Yii;
use humhub\modules\content\components\ContentContainerController;

class ListController extends ContentContainerController
{
    public function actionIndex()
    {
        return $this->render('index', [
            'contentContainer' => $this->contentContainer,
        ]);
    }
}