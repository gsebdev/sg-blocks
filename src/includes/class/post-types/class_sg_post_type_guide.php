<?php

namespace gsebdev\sg_blocks\post_types;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Post_Type_Guide extends SG_Post_Type
{
    public $post_type = 'guides';
    protected $no_single = true;

    public $args = array(
        'public' => true,
        'has_archive' => true,
        'publicly_queryable' => true,
        'query_var' => true,
        'show_in_rest' => true,
        'rewrite' => true,
        'menu_icon' => 'dashicons-groups',
        'supports' => array('title', 'excerpt', 'thumbnail', 'custom-fields'),
    );

    public function __construct()
    {
        $labels = array(
            'name' => __('Guides', 'sg-theme'),
            'singular_name' => __('Guide', 'sg-theme'),
            'add_new_item' => __('Ajouter un Guide', 'sg-theme'),
            'edit_item' => __('Modifier le guide', 'sg-theme'),
            'new_item' => __('Nouveau Guide', 'sg-theme'),
            'view_item' => __('Voir le guide', 'sg-theme'),
            'search_items' => __('Chercher des Guides', 'sg-theme'),
            'not_found' => __('Aucun guide trouvé', 'sg-theme'),
            'not_found_in_trash' => __('Aucun guide trouvé dans la corbeille', 'sg-theme'),
            'parent_item_colon' => __('Guide parent:', 'sg-theme'),
        );
        $this->args['labels'] = $labels;

        parent::__construct();
    }
}

