<?php

namespace gsebdev\sg_blocks\taxonomies;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class SG_Duration_Taxonomy extends SG_Taxonomy
{
    public $id = 'duration';

    public $name = 'Durée';
    public $plural_name = 'Durées';

    public $config = array(
        'public' => true,
        'show_in_rest' => true,
        'show_in_nav_menus' => true,
        'show_ui' => true,
        'query_var' => true,
        'show_admin_column' => true,
        'hierarchical' => false,
        'has_archive' => false,
        'rewrite' => false,
        'show_tagcloud' => false,
    );

    protected $custom_columns = array(
        'remove' => array(
            'slug',
            'description',
        )
    );

    public function __construct($post_types)
    {
        $this->config['labels'] = array(
            'name' => __('Durées', 'sg-theme'),
            'singular_name' => __($this->name, 'sg-theme'),
            'menu_name' => __('Durées', 'sg-theme'),
            'all_items' => __('Toutes les durées', 'sg-theme'),
            'edit_item' => __('Modifier la durée', 'sg-theme'),
            'view_item' => __('Voir cette durée', 'sg-theme'),
            'update_item' => __('Mettre à jour la durée', 'sg-theme'),
            'add_new_item' => __('Ajouter une nouvelle durée', 'sg-theme'),
            'new_item_name' => __('intitulé de la nouvelle durée', 'sg-theme'),
            'search_items' => __('Rechercher par durées', 'sg-theme'),
            'popular_items' => __('durées populaires', 'sg-theme'),
            'separate_items_with_commas' => __('Séparez les durées par des virgules', 'sg-theme'),
            'add_or_remove_items' => __('Ajouter ou supprimer des durées', 'sg-theme'),
            'choose_from_most_used' => __('Choisir parmi les durées les plus utilisés', 'sg-theme'),
            'not_found' => __('Aucune durée trouvée', 'sg-theme'),
            'no_terms' => __('Aucune durée', 'sg-theme'),
            'back_to_items' => __('Retour aux durées', 'sg-theme'),
        );

        parent::__construct($post_types);
    }
}
