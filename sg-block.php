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
include_once(plugin_dir_path(__FILE__) . 'dist/includes/sg_activation.php');
include_once(plugin_dir_path(__FILE__) . 'dist/includes/sg_register_meta.php');
include_once(plugin_dir_path(__FILE__) . 'dist/includes/sg_helpers.php');

// activation actions
register_activation_hook(__FILE__, 'sg_blocks_activation');

/**
 * Registers the blocks and enqueues necessary scripts and styles for the plugin.
 */
if (!function_exists('register_sg_blocks')) {
    function register_sg_blocks()
    {
        if (is_admin()) {
            $asset_file = include(plugin_dir_path(__FILE__) . 'dist/blocks/editor/editor.asset.php');
            wp_enqueue_script(
                'sg-blocks',
                plugins_url('dist/blocks/editor/editor.js', __FILE__),
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
                wp_add_inline_script('sg-map-view-script', "window.sgMaps = Object.assign({}, window.sgMaps, {meeting_point:" . json_encode($meeting_data, true) . "});", 'before');
            }
        }
    }
}

// action hooks
add_action('init', 'register_sg_blocks');
add_action('init', 'sg_blocks_register_post_metas');
add_action('wp_enqueue_scripts', 'register_sg_meeting_point_meta_to_front');



//add image sizes
add_image_size('lazy-placeholder', 75);
add_image_size('sg-thumbnail', 150, 150);
add_image_size('medium_medium', 520, 390);
