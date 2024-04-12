<?php

return array(
    'title'       => 'SG Image + Text',
    'categories'  => array('sg-blocks'),
    'description' => 'Images with text beside.',
    'content'     => '<!-- wp:sg/container {"layout":"grid","gap":{"default":3},"margin":{"default":{"y":3}},"columns":{"default":2}} -->
    <div class="grid g-3 my-3 columns-2">
    <!-- wp:sg/image {"aspectRatio":"3 / 2","fixedWidth":"100%"} -->
    <!-- /wp:sg/image -->
    
    <!-- wp:sg/container -->
    <div><!-- wp:heading {"className":"mt-0"} -->
    <h2 class="wp-block-heading mt-0">Titre</h2>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph -->
    <p>Texte à ajouter</p>
    <!-- /wp:paragraph --></div>
    <!-- /wp:sg/container --></div>
    <!-- /wp:sg/container -->'
);