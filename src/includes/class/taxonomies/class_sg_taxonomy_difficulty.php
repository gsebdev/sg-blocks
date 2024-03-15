<?php

namespace gsebdev\sg_blocks\taxonomies;

use gsebdev\CustomFields\SG_Color_Picker;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class SG_Difficulty_Taxonomy extends SG_Taxonomy
{
    public $id = 'difficulty';

    public $name = 'Difficulté';
    public $plural_name = 'Difficultés';

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
            'posts'
        ),
        'add' => array(
            [
                'key' => 'color',
                'name' => 'Couleur',
                'editable' => true,
                'type' => 'color'
            ]
        )
    );

    protected $custom_fields = array(
        [
            'id' => 'color',
            'title' => 'Code couleur',
            'description' => 'code couleur qui permettra d\'identifier la difficulté (exemple: #000000)',
            'input' => SG_Color_Picker::class
        ],
    );

    protected $auto_save = true;

    public function __construct($post_types)
    {
        $this->config['labels'] = array(
            'name' => __('Difficultés', 'sg-theme'),
            'singular_name' => __($this->name, 'sg-theme'),
            'menu_name' => __('Difficultés', 'sg-theme'),
            'all_items' => __('Toutes les difficultés', 'sg-theme'),
            'edit_item' => __('Modifier la difficulté', 'sg-theme'),
            'view_item' => __('Voir cette difficulté', 'sg-theme'),
            'update_item' => __('Mettre à jour la difficulté', 'sg-theme'),
            'add_new_item' => __('Ajouter une nouvelle difficulté', 'sg-theme'),
            'new_item_name' => __('intitulé de la nouvelle difficulté', 'sg-theme'),
            'search_items' => __('Rechercher par difficultés', 'sg-theme'),
            'popular_items' => __('difficultés populaires', 'sg-theme'),
            'separate_items_with_commas' => __('Séparez les difficultés par des virgules', 'sg-theme'),
            'add_or_remove_items' => __('Ajouter ou supprimer des difficultés', 'sg-theme'),
            'choose_from_most_used' => __('Choisir parmi les difficultés les plus utilisés', 'sg-theme'),
            'not_found' => __('Aucune difficulté trouvée', 'sg-theme'),
            'no_terms' => __('Aucune difficulté', 'sg-theme'),
            'back_to_items' => __('Retour aux difficultés', 'sg-theme'),
        );

        parent::__construct($post_types);
    }
}
