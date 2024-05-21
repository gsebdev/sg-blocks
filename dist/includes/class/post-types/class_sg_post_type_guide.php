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

    public function set_labels()
    {
        $labels = array(
            'name' => __('Guides', 'sg-blocks'),
            'singular_name' => __('Guide', 'sg-blocks'),
            'add_new_item' => __('Add a Guide', 'sg-blocks'),
            'edit_item' => __('Modify this guide', 'sg-blocks'),
            'new_item' => __('New Guide', 'sg-blocks'),
            'view_item' => __('View this guide', 'sg-blocks'),
            'search_items' => __('Search for Guides', 'sg-blocks'),
            'not_found' => __('No guide found', 'sg-blocks'),
            'not_found_in_trash' => __('No guide found in trash', 'sg-blocks'),
            'parent_item_colon' => __('Parent guide:', 'sg-blocks'),
        );
        $this->args['labels'] = $labels;
    }
}

