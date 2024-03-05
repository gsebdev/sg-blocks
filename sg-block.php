<?php
/*
 * Plugin Name:       SG Blocks
 * Plugin URI:        
 * Description:       
 * Version: 		  0.0.1
 * Author:            gsebdev
 * Author URI:        
 * Text Domain:       
 * Requires at least: 6.1
 * Tested up to: 	  6.4
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define ('SG_BLOCKS_VERSION', '0.0.1');
define ('SG_BLOCKS_DIR', plugin_dir_path(__FILE__));
define ('SG_BLOCKS_SCRIPTS_NAME', 'sg-blocks-scripts');

include_once(SG_BLOCKS_DIR . 'dist/includes/sg_activation.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/sg_register_meta.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/sg_helpers.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/sg_register_rest.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/class_sg_contact_form_handler.php');
include_once(SG_BLOCKS_DIR . 'dist/includes/class/post-types/class_sg_post_type_activity.php');

// activation actions
register_activation_hook(__FILE__, 'sg_blocks_activation');

/**
 * Registers the blocks and enqueues necessary scripts and styles for the plugin.
 */
if (!function_exists('register_sg_blocks')) {
    function register_sg_blocks()
    {
        if (is_admin()) {
            $asset_file = include(SG_BLOCKS_DIR . 'dist/assets/js/editor.asset.php');
            wp_enqueue_script(
                SG_BLOCKS_SCRIPTS_NAME .'-editor',
                plugins_url('dist/assets/js/editor.js', __FILE__),
                $asset_file['dependencies'],
                $asset_file['version'],
                true
            );
        } else {
            $asset_file = include(SG_BLOCKS_DIR . 'dist/assets/js/sg-scripts.asset.php');
            wp_enqueue_script(
                SG_BLOCKS_SCRIPTS_NAME,
                plugins_url('dist/assets/js/sg-scripts.js', __FILE__),
                $asset_file['dependencies'],
                $asset_file['version'],
                true
            );
        }
        
        //enqueue style common styles
        wp_enqueue_style('sg-blocks-common', plugins_url('dist/assets/styles/sg-blocks.css', __FILE__));

        register_block_type(__DIR__ . '/dist/blocks/term-list');
        register_block_type(__DIR__ . '/dist/blocks/container');
        register_block_type(__DIR__ . '/dist/blocks/reservation');
        register_block_type(__DIR__ . '/dist/blocks/gallery');
        register_block_type(__DIR__ . '/dist/blocks/price');
        register_block_type(__DIR__ . '/dist/blocks/map');
        register_block_type(__DIR__ . '/dist/blocks/info');
        register_block_type(__DIR__ . '/dist/blocks/downloads');
        register_block_type(__DIR__ . '/dist/blocks/query-related', array(
            "skip_inner_blocks" => true
        ));
        register_block_type(__DIR__ . '/dist/blocks/featured-image');
        register_block_type(__DIR__ . '/dist/blocks/image');
        register_block_type(__DIR__ . '/dist/blocks/contact-form');

    }
}


/**
 * Register block data with global variables to the frontend.
 */
if (!function_exists('register_sg_meeting_point_meta_to_front')) {
    function register_sg_meeting_point_meta_to_front()
    {
        // map and meeting point for
        if (is_singular(['activities', 'adventures'])) {
            $meeting_data =  get_post_meta(get_the_ID(), 'meeting_point', true);
            if ($meeting_data) {
                wp_add_inline_script(SG_BLOCKS_SCRIPTS_NAME, "window.sgMaps = Object.assign({}, window.sgMaps, {meeting_point:" . json_encode($meeting_data, true) . "});", 'before');
            }
        }
    }
}

// Instanciate classes for plugin features

new SG_Contact_Form_Handler();
new SG_Post_Type_Activity();

// action hooks
add_action('init', 'register_sg_blocks');
add_action('init', 'sg_blocks_register_post_metas');
add_action('wp_enqueue_scripts', 'register_sg_meeting_point_meta_to_front');

//add image sizes
add_image_size('lazy-placeholder', 75);
add_image_size('sg-thumbnail', 150, 150);
add_image_size('medium_medium', 520, 390);

add_filter('image_size_names_choose', function($sizes) {
    unset($sizes['thumbnail']);
    
    return array_merge($sizes, [
        'lazy-placeholder' => __('SG Lazy Placeholder', 'sg-blocks'),
        'sg-thumbnail' => __('SG Thumbnail', 'sg-blocks'),
        'medium_medium' => __('SG Medium', 'sg-blocks'),
    ]);
});
