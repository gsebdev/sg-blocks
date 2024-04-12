<?php

return array(
    'title'       => 'SG Produt Card',
    'categories'  => array('sg-blocks'),
    'description' => 'Cards for products.',
    'content'     => '<!-- wp:sg/container {"Tag":"article","layout":"grid","gap":{"default":{"y":2}},"className":"sg-product-card"} -->
    <article class="grid gy-2 sg-product-card"><!-- wp:sg/featured-image {"sizes":{"default":768}} /-->
    
    <!-- wp:sg/container {"layout":"grid","className":"sg-product-card__container"} -->
    <div class="grid sg-product-card__container"><!-- wp:sg/custom-tags-list {"taxonomy":"sport","fontSize":"xs","separator":true} /-->
    
    <!-- wp:post-title {"level":3,"className":"f-m f-b"} /-->
    
    <!-- wp:sg/mini-price /--></div>
    <!-- /wp:sg/container -->
    
    <!-- wp:sg/container {"layout":"grid","gap":{"default":1},"className":"sg-product-card__tags pos-abs"} -->
    <div class="grid g-1 sg-product-card__tags pos-abs"><!-- wp:sg/container {"padding":{"default":{"y":1,"x":2}},"className":"sg-product-card__type bg-color-primary-light"} -->
    <div class="px-2 py-1 sg-product-card__type bg-color-primary-light"><!-- wp:sg/custom-tags-list {"taxonomy":"activity-type","fontSize":"xs","centerItems":true,"gap":{"default":{"y":0,"x":2}},"separator":true,"fontHeading":false,"className":"f-b"} /--></div>
    <!-- /wp:sg/container -->
    
    <!-- wp:sg/container {"padding":{"default":{"y":1,"x":2}},"className":"sg-product-card__duration bg-color-accent"} -->
    <div class="px-2 py-1 sg-product-card__duration bg-color-accent"><!-- wp:sg/custom-tags-list {"taxonomy":"duration","fontSize":"xs","centerItems":true,"separator":true,"fontHeading":false,"className":"color-bg f-b"} /--></div>
    <!-- /wp:sg/container -->
    
    <!-- wp:sg/container {"padding":{"default":{"y":1,"x":2}},"className":"sg-product-card__difficulty bg-color-accent-xlight"} -->
    <div class="px-2 py-1 sg-product-card__difficulty bg-color-accent-xlight"><!-- wp:sg/custom-tags-list {"taxonomy":"difficulty","fontSize":"xs","centerItems":true,"separator":true,"fontHeading":false,"className":"f-b"} /--></div>
    <!-- /wp:sg/container --></div>
    <!-- /wp:sg/container --></article>
    <!-- /wp:sg/container -->'
);
