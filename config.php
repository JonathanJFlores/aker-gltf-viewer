<?php

use humhub\modules\file\handler\FileHandlerCollection;
use humhub\modules\space\widgets\Menu;

return [
    'id' => 'drawio',
    'class' => 'humhub\modules\drawio\Module',
    'namespace' => 'humhub\modules\drawio',
    'events' => [
        ['class' => Menu::class, 'event' => Menu::EVENT_INIT, 'callback' => ['humhub\modules\drawio\Events', 'onSpaceMenuInit']],
        // [FileHandlerCollection::className(), FileHandlerCollection::EVENT_INIT, ['humhub\modules\drawio\Events', 'onFileHandlerCollection']],
    ]
];
?>