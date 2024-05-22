<?php

namespace gsebdev\sg_blocks\taxonomies;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Duration_Taxonomy extends SG_Taxonomy
{
    public $id = 'duration';

    public $config = array(
        'public' => true,
        'show_in_rest' => true,
        'show_in_nav_menus' => true,
        'show_ui' => true,
        'query_var' => true,
        'show_admin_column' => true,
        'hierarchical' => false,
        'rewrite' => false,
        'show_tagcloud' => false,
        'publicly_queryable'=> false,
        'has_archive'       => false
    );

    protected $custom_columns = array(
        'remove' => array(
            'slug',
            'description',
        )
    );

    public function set_labels()
    {
        $this->config['labels'] = array(
            'name' => __('Durations', 'sg-blocks'),
            'singular_name' => __('Duration', 'sg-blocks'),
            'menu_name' => __('Durations', 'sg-blocks'),
            'all_items' => __('All durations', 'sg-blocks'),
            'edit_item' => __('Edit duration', 'sg-blocks'),
            'view_item' => __('View duration', 'sg-blocks'),
            'update_item' => __('Update duration', 'sg-blocks'),
            'add_new_item' => __('Add new duration', 'sg-blocks'),
            'new_item_name' => __('Name of the new duration', 'sg-blocks'),
            'search_items' => __('Search durations', 'sg-blocks'),
            'popular_items' => __('Popular durations', 'sg-blocks'),
            'separate_items_with_commas' => __('Separate durations with commas', 'sg-blocks'),
            'add_or_remove_items' => __('Add or remove durations', 'sg-blocks'),
            'choose_from_most_used' => __('Choose from the most used durations', 'sg-blocks'),
            'not_found' => __('No duration found', 'sg-blocks'),
            'no_terms' => __('No duration', 'sg-blocks'),
            'back_to_items' => __('Back to durations', 'sg-blocks'),
        );
    }
}
