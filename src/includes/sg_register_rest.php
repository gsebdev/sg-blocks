<?php

function sg_get_related_posts_endpoint()
{
    register_rest_route(
        'sg/v1',
        '/related_posts',
        array(
            'methods'             => 'GET',
            'callback'            => 'sg_related_posts_callback',
            'args'                => array(
                'post_id' => array(
                    'required'    => true,
                    'validate_callback' => function ($param) {
                        return is_numeric($param);
                    }
                ),
                'related_taxonomy' => array(
                    'required'    => true,
                    'validate_callback' => function ($param) {
                        return is_string($param);
                    }
                ),
                'related_post_type' => array(
                    'required'    => true,
                ),
                'post_number' => array(
                    'required'    => false,
                    'validate_callback' => function ($param) {
                        return is_numeric($param);
                    }
                ),
                'excluded_ids' => array(
                    'required'    => false,
                    'validate_callback' => function ($param) {
                        return is_array($param);
                    }
                ),
            ),
            'permission_callback' => function () {
                if (current_user_can('edit_posts')) {
                    return true;
                } else {
                    return new WP_Error('rest_forbidden', esc_html__('You do not have permission to access this endpoint.'), array('status' => 403));
                }
            },
        )
    );
}

function sg_related_posts_callback($request)
{
    $response = sg_get_most_relevant_posts_by_taxonomy(
        $request->get_param('post_id'),
        $request->get_param('related_post_type'),
        $request->get_param('related_taxonomy'),
        $request->get_param('post_number') ?? null,
        $request->get_param('excluded_ids') ?? []
    );

    $response = $response && is_array($response->posts) ? array_map(function ($post) { return [
        'id' => $post->ID,
        'type' => $post->post_type,
        'title' => $post->post_title
    ]; }, $response->posts) : null;
    
    return $response;
}

add_action('rest_api_init', 'sg_get_related_posts_endpoint');
