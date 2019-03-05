<?php

/**
 * @link https://www.humhub.org/
 * @copyright Copyright (c) 2017 HumHub GmbH & Co. KG
 * @license https://www.humhub.com/licences
 */

namespace humhub\modules\drawio;

use humhub\modules\space\models\Space;
use humhub\modules\content\components\ContentContainerModule;
use humhub\modules\content\components\ContentContainerActiveRecord;
use Yii;
use yii\helpers\Url;

/**
 * File Module
 *
 * @since 0.5
 */
class Module extends ContentContainerModule
{

    public $resourcesPath = 'resources';

    public function getContentContainerTypes()
    {
        return [
            Space::class,
        ];
    }

    public function disable()
    {
        parent::disable();
    }

    public function getContentContainerDescription(ContentContainerActiveRecord $container)
    {
        if ($container instanceof Space) {
            return Yii::t('DrawioModule.base', 'View GLTF file');
        }
    }

    public function disableContentContainer(ContentContainerActiveRecord $container)
    {
        parent::disableContentContainer($container);
    }

    /**
     * @inheritdoc
     */
    public function getConfigUrl()
    {
        return Url::to([
            '/drawio/admin'
        ]);
    }

    public function getServerUrl()
    {
        $url = $this->settings->get('serverUrl');
        if (empty($url)) {
            return 'https://draw.io';
        }

        return $url;
    }

    public function getExtensions()
    {
        return ['xml', 'drawio'];
    }

}
