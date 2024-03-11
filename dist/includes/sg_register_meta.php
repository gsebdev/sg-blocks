<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (!function_exists('sg_blocks_register_post_metas')) {
    function sg_blocks_register_post_metas()
    {
        register_post_meta(
            '',
            'booking',
            array(
                'show_in_rest'    => true,
                'single'          => true,
                'type'            => 'string',
                'auth_callback'   => function () {
                    return current_user_can('edit_posts');
                }
            )
        );
        register_post_meta(
            '',
            'featured_image_position',
            array(
                'show_in_rest'    => [
                    'status' => true,
                    'schema' => [
                        'type' => 'object',
                        'properties' => [
                            'x' => [
                                'type' => 'number'
                            ],
                            'y' => [
                                'type' => 'number'
                            ]
                        ]
                    ]
                ],
                'single'          => true,
                'type'            => 'object',
                'auth_callback'   => function () {
                    return current_user_can('edit_posts');
                }
            )
        );
        register_post_meta(
            '',
            'info',
            array(
                'show_in_rest' => [
                    'status' => true,
                    'schema' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'properties' => [
                                'id' => [
                                    'type' => 'string'
                                ],
                                'title' => [
                                    'type' => 'string'
                                ],
                                'content' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'string'
                                    ]
                                ]
                            ]
                        ]
                    ]
                ],
                'single'          => true,
                'type'            => 'array',
                'auth_callback'   => function () {
                    return current_user_can('edit_posts');
                }
            )
        );
        register_post_meta(
            '',
            'downloads',
            array(
                'show_in_rest' => [
                    'status' => true,
                    'schema' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'properties' => [
                                'id' => [
                                    'type' => 'number'
                                ],
                                'title' => [
                                    'type' => 'string'
                                ]
                            ]
                        ]
                    ]
                ],
                'single'          => true,
                'type'            => 'array',
                'auth_callback'   => function () {
                    return current_user_can('edit_posts');
                }
            )
        );
        register_post_meta(
            '',
            'meeting_point',
            array(
                'show_in_rest'    => [
                    'status' => true,
                    'schema' => [
                        'type' => 'object',
                        'properties' => [
                            'address' => [
                                'type' => 'string'
                            ],
                            'lng' => [
                                'type' => 'number'
                            ],
                            'lat' => [
                                'type' => 'number'
                            ],
                            'zoom' => [
                                'type' => 'number'
                            ]
                        ]
                    ]
                ],
                'single'          => true,
                'type'            => 'object',
                'auth_callback'   => function () {
                    return current_user_can('edit_posts');
                }
            )
        );
        register_post_meta(
            '',
            'meeting-point',
            array(
                'show_in_rest'    => true,
                'single'          => true,
                'type'            => 'string',
                'auth_callback'   => function () {
                    return current_user_can('edit_posts');
                }
            )
        );
        register_post_meta(
            '',
            'price',
            array(
                'show_in_rest'    => [
                    'status' => true,
                    'schema' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'properties' => [
                                'name' => [
                                    'type' => 'string'
                                ],
                                'currency' => [
                                    'type' => 'string'
                                ],
                                'description' => [
                                    'type' => 'string'
                                ],
                                'amount' => [
                                    'type' => 'number'
                                ]
                            ]
                        ]
                    ]
                ],
                'single'          => true,
                'type'            => 'array',
                'auth_callback'   => function () {
                    return current_user_can('edit_posts');
                }
            )
        );
    }
}
