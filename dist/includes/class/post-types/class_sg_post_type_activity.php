<?php

namespace gsebdev\sg_blocks\post_types;
use gsebdev\CustomFields\SG_Switch_Box;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Post_Type_Activity extends SG_Post_Type
{
    public $post_type = 'activities';

    public $args = array(
        'public' => true,
        'has_archive' => true,
        'publicly_queryable' => true,
        'query_var' => true,
        'show_in_rest' => true,
        'rewrite' => true,
        'menu_icon' => 'dashicons-media-document',
        'supports' => array('title', 'thumbnail', 'excerpt', 'editor', 'custom-fields'),
    );

    public function __construct()
    {
        $labels = array(
            'name' => __('Activités', 'sg-theme'),
            'singular_name' => __('Activité', 'sg-theme'),
            'add_new_item' => __('Ajouter une Activité', 'sg-theme'),
            'edit_item' => __('Modifier l\'activité'),
            'new_item' => __('Nouvelle Activité', 'sg-theme'),
            'view_item' => __('Voir l\'activité'),
            'search_items' => __('Chercher des Activités', 'sg-theme'),
            'not_found' => __('Aucune activité trouvée', 'sg-theme'),
            'not_found_in_trash' => __('Aucune activité trouvée dans la corbeille', 'sg-theme'),
            'parent_item_colon' => __('Activité parente:', 'sg-theme'),
        );

        $this->args['labels'] = $labels;
        $this->metaboxes = array(
            array(
                'id' => 'first',
                'title' => __('Options d\'affichage', 'sg-theme'),
                'fields' => array(
                    new SG_Switch_Box('featured', __('Mis en Avant', 'sg-theme'), __('Permet d\'afficher l\'activité en priorité dans la liste', 'sg-theme')),
                )
            ),
        );

        parent::__construct();
    }
}
