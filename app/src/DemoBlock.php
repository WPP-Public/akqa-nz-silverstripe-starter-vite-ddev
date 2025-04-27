<?php

use DNADesign\Elemental\Models\BaseElement;

class DemoBlock extends BaseElement
{
    private static $inline_editable = false;

    private static $db = [
        'Title' => 'Varchar(255)',
        'Content' => 'HTMLText',
    ];


    public function getType()
    {
        return 'Demo Block';
    }

}
