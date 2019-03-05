<?php 
namespace humhub\modules\drawio\controllers;

use Yii;
use humhub\modules\content\components\ContentContainerController;

class PageController extends ContentContainerController
{
    public function actionIndex($route)
    {

        //return var_dump($route);
        return $this->render('index', [
            'contentContainer' => $this->contentContainer,
            'route' => $route
        ]);
    }
}