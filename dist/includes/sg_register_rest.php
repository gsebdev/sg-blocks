<?php

function sg_get_posts_endpoint()
{
    register_rest_route(
        'sg/v1',
        '/related_posts',
        array(
            'methods'             => 'GET',
            'callback'            => 'sg_get_posts_endpoint_callback',
            'args'                => array(
                'related_post_id' => array(
                    'required'    => false,
                    'validate_callback' => function ($param) {
                        return is_numeric($param);
                    }
                ),
                'query_taxonomy' => array(
                    'required'    => false,
                    'validate_callback' => function ($param) {
                        return is_string($param) || is_array($param);
                    }
                ),
                'query_post_type' => array(
                    'required'    => true,
                ),

                'number_of_posts' => array(
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
                'orderby' => array(
                    'required'    => false,
                    'validate_callback' => function ($param) {
                        return is_string($param) && in_array($param, ['date', 'title', 'rand', 'featured']);
                    }
                ),
                'order' => array(
                    'required'    => false,
                    'validate_callback' => function ($param) {
                        return is_string($param) && in_array($param, ['asc', 'desc']);
                    }
                ),
            ),
            'permission_callback' => function () {
                if (current_user_can('edit_posts')) {
                    return true;
                } else {
                    return new WP_Error('rest_forbidden', esc_html__('You do not have permission to access this endpoint.', 'sg-blocks'), array('status' => 403));
                }
            },
        )
    );
}

function sg_get_posts_endpoint_callback($request)
{
    $response = sg_get_posts(
        $request->get_param('query_post_type'),
        array(
            'number_of_posts' => $request->get_param('number_of_posts') ?? -1,
            'order_by' => $request->get_param('orderby') ?? 'date',
            'order' => $request->get_param('order') ?? 'desc',
            'excluded_ids' => $request->get_param('excluded_ids') ?? [],
            'query_taxonomy' => $request->get_param('query_taxonomy') ?? null,
            'related_post_id' => $request->get_param('related_post_id') ?? null,
            'related_query' => !!$request->get_param('related_post_id')
        )
    );

    $response = $response && is_array($response->posts) ? array_map(function ($post) { return [
        'id' => $post->ID,
        'type' => $post->post_type,
        'title' => $post->post_title
    ]; }, $response->posts) : null;
    
    return $response;
}

add_action('rest_api_init', 'sg_get_posts_endpoint');
