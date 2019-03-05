<?php

/**
 * @link https://www.humhub.org/
 * @copyright Copyright (c) 2017 HumHub GmbH & Co. KG
 * @license https://www.humhub.com/licences
 */

namespace humhub\modules\drawio\assets;

use Yii;
use yii\web\AssetBundle;

class Assets extends AssetBundle
{

    public $publishOptions = [
        'forceCopy' => true
    ];
    public $css = [
        'css/site.css'
    ];
    public $jsOptions = [
        'position' => \yii\web\View::POS_END
    ];

    public function init()
    {

        $this->js = [
            'three.js',
            'GLTF2Loader.js',
            'OrbitControls.js',
            'util.js',
            'humhub.drawio.js'
        ];


        $this->sourcePath = dirname(__FILE__) . '/../resources';
        parent::init();
    }

}
