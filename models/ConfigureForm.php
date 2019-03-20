<?php

namespace humhub\modules\drawio\models;

use Yii;

/**
 * ConfigureForm defines the configurable fields.

 */
class ConfigureForm extends \yii\base\Model
{

    public $serverUrl;

    public static function getModelsByGrade($grade)
    {
        $routes = [
            "K1" => [
                "/robots/kinder/K1/K1_L01.gltf",
                "/robots/kinder/K1/K1_L02.gltf",
                "/robots/kinder/K1/K1_L03.gltf",
                "/robots/kinder/K1/K1_L04.gltf"
            ],
            "K2" => [
                "/robots/kinder/K2/K2_L01_1.gltf",
                "/robots/kinder/K2/K2_L01_2.gltf",
                "/robots/kinder/K2/K2_L01_3.gltf",
                "/robots/kinder/K2/K2_L02.gltf",
                "/robots/kinder/K2/K2_L03.gltf",
                "/robots/kinder/K2/K2_L04.gltf",
                "/robots/kinder/K2/K2_L05.gltf",
                "/robots/kinder/K2/K2_L06.gltf",
                "/robots/kinder/K2/K2_L06.gltf",
                "/robots/kinder/K2/K2_L07.gltf",
                "/robots/kinder/K2/K2_L08.gltf",
                "/robots/kinder/K2/K2_L09.gltf",
                "/robots/kinder/K2/K2_L10.gltf",
                "/robots/kinder/K2/K2_L11.gltf",
                "/robots/kinder/K2/K2_L12.gltf",
                "/robots/kinder/K2/K2_L13.gltf",
                "/robots/kinder/K2/K2_L14.gltf",
                "/robots/kinder/K2/K2_L15.gltf",
                "/robots/kinder/K2/K2_L16.gltf",
                "/robots/kinder/K2/K2_L17.gltf",
                "/robots/kinder/K2/K2_L18.gltf",
                "/robots/kinder/K2/K2_L19.gltf",
                "/robots/kinder/K2/K2_L20.gltf",
                "/robots/kinder/K2/K2_L21.gltf",
                "/robots/kinder/K2/K2_L22.gltf",

            ],
            "K3" => [
                "/robots/kinder/K3/K3_L01_1.gltf",
                "/robots/kinder/K3/K3_L01_2.gltf",
                "/robots/kinder/K3/K3_L02.gltf",
                "/robots/kinder/K3/K3_L03.gltf",
                "/robots/kinder/K3/K3_L04.gltf",
                "/robots/kinder/K3/K3_L05.gltf",
                "/robots/kinder/K3/K3_L06.gltf",
                "/robots/kinder/K3/K3_L07.gltf",
                "/robots/kinder/K3/K3_L08.gltf",
                "/robots/kinder/K3/K3_L09.gltf",
                "/robots/kinder/K3/K3_L10.gltf",
                "/robots/kinder/K3/K3_L11.gltf",
                "/robots/kinder/K3/K3_L12.gltf",
                "/robots/kinder/K3/K3_L13.gltf",
                "/robots/kinder/K3/K3_L14.gltf",
                "/robots/kinder/K3/K3_L15.gltf",
                "/robots/kinder/K3/K3_L16_1.gltf",
                "/robots/kinder/K3/K3_L16_2.gltf",
                "/robots/kinder/K3/K3_L17.gltf",
                "/robots/kinder/K3/K3_L18.gltf",
                "/robots/kinder/K3/K3_L19.gltf",
                "/robots/kinder/K3/K3_L20.gltf",
                "/robots/kinder/K3/K3_L21.gltf",
                "/robots/kinder/K3/K3_L22.gltf",
            ],
            "P1" => [
                "/robots/primaria/P1/P1_L01_1.gltf",
                "/robots/primaria/P1/P1_L01_2.gltf",
                "/robots/primaria/P1/P1_L01_3.gltf",
                "/robots/primaria/P1/P1_L02_1.gltf",
                "/robots/primaria/P1/P1_L02_2.gltf",
                "/robots/primaria/P1/P1_L03.gltf",
                "/robots/primaria/P1/P1_L04.gltf",
                "/robots/primaria/P1/P1_L05.gltf",
                "/robots/primaria/P1/P1_L06.gltf",
                "/robots/primaria/P1/P1_L07.gltf",
                "/robots/primaria/P1/P1_L08.gltf",
                "/robots/primaria/P1/P1_L09.gltf",
                "/robots/primaria/P1/P1_L10.gltf",
                "/robots/primaria/P1/P1_L11.gltf",
                "/robots/primaria/P1/P1_L12.gltf",
                "/robots/primaria/P1/P1_L13.gltf",
                "/robots/primaria/P1/P1_L14_1.gltf",
                "/robots/primaria/P1/P1_L14_2.gltf",
                "/robots/primaria/P1/P1_L15.gltf",
                "/robots/primaria/P1/P1_L16.gltf",
                "/robots/primaria/P1/P1_L17.gltf",
                "/robots/primaria/P1/P1_L18.gltf",
                "/robots/primaria/P1/P1_L19.gltf",
                "/robots/primaria/P1/P1_L20.gltf",
                "/robots/primaria/P1/P1_L21.gltf",
                "/robots/primaria/P1/P1_L22.gltf",
                "/robots/primaria/P1/P1_L23.gltf",
                "/robots/primaria/P1/P1_L24.gltf",
                "/robots/primaria/P1/P1_L25.gltf",

            ],
            "P2" => [
                "/robots/primaria/P2/P2_L01_1.gltf",
                "/robots/primaria/P2/P2_L01_2.gltf",
                "/robots/primaria/P2/P2_L01_3.gltf",
                "/robots/primaria/P2/P2_L02.gltf",
                "/robots/primaria/P2/P2_L03.gltf",
                "/robots/primaria/P2/P2_L04.gltf",
                "/robots/primaria/P2/P2_L05.gltf",
                "/robots/primaria/P2/P2_L06.gltf",
                "/robots/primaria/P2/P2_L07.gltf",
                "/robots/primaria/P2/P2_L08.gltf",
                "/robots/primaria/P2/P2_L09.gltf",
                "/robots/primaria/P2/P2_L10.gltf",
                "/robots/primaria/P2/P2_L11.gltf",
                "/robots/primaria/P2/P2_L12.gltf",
                "/robots/primaria/P2/P2_L13.gltf",
                "/robots/primaria/P2/P2_L14.gltf",
                "/robots/primaria/P2/P2_L15_1.gltf",
                "/robots/primaria/P2/P2_L15_2.gltf",
                "/robots/primaria/P2/P2_L16.gltf",
                "/robots/primaria/P2/P2_L17.gltf",
                "/robots/primaria/P2/P2_L18.gltf",
                "/robots/primaria/P2/P2_L19.gltf",
                "/robots/primaria/P2/P2_L20.gltf",
                "/robots/primaria/P2/P2_L21.gltf",
                "/robots/primaria/P2/P2_L22.gltf",
                "/robots/primaria/P2/P2_L23.gltf",
                "/robots/primaria/P2/P2_L24.gltf",
                "/robots/primaria/P2/P2_L25.gltf",
            ],
            "P3" => [
                "/robots/primaria/P3/P3_L01_1.gltf",
                "/robots/primaria/P3/P3_L01_2.gltf",
                "/robots/primaria/P3/P3_L01_3.gltf",
                "/robots/primaria/P3/P3_L02_1.gltf",
                "/robots/primaria/P3/P3_L02_2.gltf",
                "/robots/primaria/P3/P3_L02_3.gltf",
                "/robots/primaria/P3/P3_L03.gltf",
                "/robots/primaria/P3/P3_L04.gltf",
                "/robots/primaria/P3/P3_L5.gltf",
                "/robots/primaria/P3/P3_L6.gltf",
                "/robots/primaria/P3/P3_L7.gltf",
                "/robots/primaria/P3/P3_L8.gltf",
                "/robots/primaria/P3/P3_L9.gltf",
                "/robots/primaria/P3/P3_L10.gltf",
                "/robots/primaria/P3/P3_L11.gltf",
                "/robots/primaria/P3/P3_L12.gltf",
                "/robots/primaria/P3/P3_L13.gltf",
                "/robots/primaria/P3/P3_L14.gltf",
                "/robots/primaria/P3/P3_L15.gltf",
                "/robots/primaria/P3/P3_L16.gltf",
                "/robots/primaria/P3/P3_L17.gltf",
                "/robots/primaria/P3/P3_L18.gltf",
                "/robots/primaria/P3/P3_L19.gltf",
                "/robots/primaria/P3/P3_L20.gltf",
                "/robots/primaria/P3/P3_L21.gltf",
                "/robots/primaria/P3/P3_L22.gltf",
                "/robots/primaria/P3/P3_L23.gltf",
                "/robots/primaria/P3/P3_L24.gltf",
                "/robots/primaria/P3/P3_L25.gltf",

            ],
            "P4" => [
                "/robots/primaria/P4/P4_L01.gltf",
                "/robots/primaria/P4/P4_L02.gltf",
                "/robots/primaria/P4/P4_L03.gltf",
                "/robots/primaria/P4/P4_L04.gltf",
                "/robots/primaria/P4/P4_L05.gltf",
                "/robots/primaria/P4/P4_L06.gltf",
                "/robots/primaria/P4/P4_L07.gltf",
                "/robots/primaria/P4/P4_L08.gltf",
                "/robots/primaria/P4/P4_L09.gltf",
                "/robots/primaria/P4/P4_L10.gltf",
                "/robots/primaria/P4/P4_L11.gltf",
                "/robots/primaria/P4/P4_L12.gltf",
                "/robots/primaria/P4/P4_L13.gltf",
                "/robots/primaria/P4/P4_L14.gltf",
                "/robots/primaria/P4/P4_L15.gltf",
                "/robots/primaria/P4/P4_L16.gltf",
                "/robots/primaria/P4/P4_L17.gltf",
                "/robots/primaria/P4/P4_L18.gltf",
                "/robots/primaria/P4/P4_L19.gltf",
                "/robots/primaria/P4/P4_L20.gltf",
                "/robots/primaria/P4/P4_L21.gltf",
                "/robots/primaria/P4/P4_L22.gltf",
                "/robots/primaria/P4/P4_L23.gltf",
                "/robots/primaria/P4/P4_L24.gltf",
                "/robots/primaria/P4/P4_L25.gltf",

            ],
            "P5" => [
                "/robots/primaria/P5/P5_L01.gltf",
                "/robots/primaria/P5/P5_L02.gltf",
                "/robots/primaria/P5/P5_L03.gltf",
                "/robots/primaria/P5/P5_L04.gltf",
                "/robots/primaria/P5/P5_L05.gltf",
                "/robots/primaria/P5/P5_L06.gltf",
                "/robots/primaria/P5/P5_L07.gltf",
                "/robots/primaria/P5/P5_L08.gltf",
            ],
            "P6" => [
                "/robots/primaria/P6/P6_L01.gltf",
                "/robots/primaria/P6/P6_L02.gltf",
                "/robots/primaria/P6/P6_L03.gltf",
                "/robots/primaria/P6/P6_L04_1.gltf",
                "/robots/primaria/P6/P6_L06.gltf",
                "/robots/primaria/P6/P6_L07.gltf",
                "/robots/primaria/P6/P6_L08.gltf",
                "/robots/primaria/P6/P6_L09.gltf",
                "/robots/primaria/P6/P6_L10.gltf",
                "/robots/primaria/P6/P6_L11.gltf",
                "/robots/primaria/P6/P6_L12.gltf",
                "/robots/primaria/P6/P6_L13.gltf",
                "/robots/primaria/P6/P6_L14.gltf",
                "/robots/primaria/P6/P6_L15.gltf",
                "/robots/primaria/P6/P6_L16.gltf",
                "/robots/primaria/P6/P6_L17.gltf",
                "/robots/primaria/P6/P6_L18.gltf",
                "/robots/primaria/P6/P6_L19.gltf",
                "/robots/primaria/P6/P6_L20.gltf",
                "/robots/primaria/P6/P6_L21.gltf",
                "/robots/primaria/P6/P6_L22.gltf",
                "/robots/primaria/P6/P6_L23.gltf",
                "/robots/primaria/P6/P6_L24.gltf",
            ],
            "S1" => [
                "/robots/secundaria/S1/S1_L01.gltf",
                "/robots/secundaria/S1/S1_L02.gltf",
                "/robots/secundaria/S1/S1_L03.gltf",
                "/robots/secundaria/S1/S1_L04.gltf",
                "/robots/secundaria/S1/S1_L05.gltf",
                "/robots/secundaria/S1/S1_L06.gltf",
                "/robots/secundaria/S1/S1_L07.gltf",
                "/robots/secundaria/S1/S1_L08.gltf",

            ],
            "S2" => [
                "/robots/secundaria/S2/S2_L01.gltf",
                "/robots/secundaria/S2/S2_L02.gltf",
                "/robots/secundaria/S2/S2_L03.gltf",
                "/robots/secundaria/S2/S2_L04.gltf",
                "/robots/secundaria/S2/S2_L05.gltf",
                "/robots/secundaria/S2/S2_L06.gltf",
                "/robots/secundaria/S2/S2_L07.gltf",
                "/robots/secundaria/S2/S2_L08.gltf",
                "/robots/secundaria/S2/S2_L09.gltf",
                "/robots/secundaria/S2/S2_L10.gltf",
                "/robots/secundaria/S2/S2_L11.gltf",
                "/robots/secundaria/S2/S2_L12.gltf",
                "/robots/secundaria/S2/S2_L13.gltf",
                "/robots/secundaria/S2/S2_L14.gltf",
                "/robots/secundaria/S2/S2_L15.gltf",
                "/robots/secundaria/S2/S2_L16.gltf",
                "/robots/secundaria/S2/S2_L17.gltf",
                "/robots/secundaria/S2/S2_L18.gltf",
                "/robots/secundaria/S2/S2_L19.gltf",
                "/robots/secundaria/S2/S2_L20.gltf",
                "/robots/secundaria/S2/S2_L21.gltf",
                "/robots/secundaria/S2/S2_L22.gltf",
                "/robots/secundaria/S2/S2_L23.gltf",
                "/robots/secundaria/S2/S2_L24.gltf",
                "/robots/secundaria/S2/S2_L25.gltf",
            ],
            "S3" => [
                "/robots/secundaria/S3/S3_L01.gltf",
                "/robots/secundaria/S3/S3_L02.gltf",
                "/robots/secundaria/S3/S3_L03.gltf",
                "/robots/secundaria/S3/S3_L04_1.gltf",
            ],
            "B1" => [
                "/robots/bachillerato/B1/LS4-L05.gltf",
                "/robots/bachillerato/B1/LS4-L06.gltf",
                "/robots/bachillerato/B1/LS4-L07.gltf",
                "/robots/bachillerato/B1/LS4-L08.gltf",
                "/robots/bachillerato/B1/LS4-L09.gltf",
                "/robots/bachillerato/B1/LS4-L10.gltf",
                "/robots/bachillerato/B1/LS4-L11.gltf"
            ],
            "B2" => [
                "/robots/bachillerato/B2/LS5_L05.gltf",
                "/robots/bachillerato/B2/LS5_L07.gltf",
                "/robots/bachillerato/B2/LS5_L08.gltf"
            ],
        ];
        return $routes[$grade];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['serverUrl', 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'serverUrl' => Yii::t('DrawioModule.base', 'Hostname'),
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeHints()
    {
        return [
            'serverUrl' => Yii::t('DrawioModule.base', 'e.g. https://draw.io'),
        ];
    }

    public function loadSettings()
    {
        $this->serverUrl = Yii::$app->getModule('drawio')->settings->get('serverUrl');

        return true;
    }

    public function save()
    {
        Yii::$app->getModule('drawio')->settings->set('serverUrl', $this->serverUrl);

        return true;
    }
}
