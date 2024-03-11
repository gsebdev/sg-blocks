<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function sg_blocks_activation()
{
    sg_update_meeting_point(); // convert old sg meeting points
    sg_update_downloads(); // convert old sg downloads
    sg_update_featured_media(); // convert old sg featured media
}

if (!function_exists('sg_update_meeting_point')) {
    /**
     * Updates meeting points for activities and adventures.
     */
    function sg_update_meeting_point()
    {
        $args = array(
            'post_type' => ['activities', 'adventures'],
            'posts_per_page' => -1,
        );

        $activities = get_posts($args);

        foreach ($activities as $activity) {
            $post_id = $activity->ID;

            // Get 'meeting-point' meta
            $meeting_point = get_post_meta($post_id, 'meeting-point', true);

            if ($meeting_point) {
                $address = '';
                $lat = null;
                $lng = null;

                // Check if the meeting point is in the format 'lat, lng'
                $coordinates = explode(', ', $meeting_point);

                if (count($coordinates) === 2 && is_numeric($coordinates[0]) && is_numeric($coordinates[1])) {
                    // If it's coordinates, update 'meeting_point' meta with lat and lng
                    $lat = floatval($coordinates[0]);
                    $lng = floatval($coordinates[1]);

                    $api_url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=$lat&lon=$lng";
                    $response = wp_remote_get($api_url);

                    if (!is_wp_error($response)) {
                        $body = wp_remote_retrieve_body($response);
                        $data = json_decode($body);

                        if (isset($data->display_name)) {
                            $address = $data->display_name;
                        }
                    }
                } else {
                    // If it's not coordinates, treat it as a text address
                    $address = $meeting_point;
                    $encoded_address = urlencode($meeting_point);

                    // Make a request to OpenStreetMap Nominatim API
                    $api_url = "https://nominatim.openstreetmap.org/search?format=json&q=$encoded_address";
                    $response = wp_remote_get($api_url);

                    if (!is_wp_error($response)) {
                        $body = wp_remote_retrieve_body($response);
                        $data = json_decode($body);

                        if (isset($data[0]->lat) && isset($data[0]->lon)) {
                            $lat = $data[0]->lat;
                            $lng = $data[0]->lon;
                        }
                    }
                }

                update_post_meta($post_id, 'meeting_point', array('address' => $address, 'lat' => $lat, 'lng' => $lng));
                delete_post_meta($post_id, 'meeting-point');

                // log to php console
                error_log('meeting-point converted : from ' . $meeting_point . ' to ' . $address . ' (' . $lat . ', ' . $lng . ')');
            }
        }
    }
}

if (!function_exists('sg_update_downloads')) {
    function sg_update_downloads()
    {
        $args = array(
            'post_type' => ['activities', 'adventures'],
            'posts_per_page' => -1,
        );

        $activities = get_posts($args);

        foreach ($activities as $activity) {
            $post_id = $activity->ID;
            $newDownloads = [];
            error_log('activity id : ' . $post_id);

            $downloads = get_post_meta($post_id, 'downloads', true);

            if ($downloads && is_string($downloads)) {
                $downloads = json_decode($downloads, true);
                if (!is_array($downloads)) {
                    $downloads = [];
                }

                foreach ($downloads as $download) {
                    if (!is_numeric($download)) {
                        continue;
                    }
                    $id = intval($download);
                    $attachment_title = get_the_title($id);
                    $newDownloads[] = array(
                        'id' => $id,
                        'title' => $attachment_title,
                    );
                }
                update_post_meta($post_id, 'downloads', $newDownloads);
                error_log('updated download : from ' . print_r($downloads, true) . ' to : ' . print_r($newDownloads, true));
            } else {
                continue;
            }
        }
    }
}

if (!function_exists('sg_update_featured_media')) {
    function sg_update_featured_media()
    {
        $args = array(
            'post_type' => ['activities', 'adventures', 'guides'],
            'posts_per_page' => -1,
        );

        $posts = get_posts($args);

        foreach ($posts as $post) {
            $post_id = $post->ID;

            $media = get_post_meta($post_id, 'cover', true);

            if ($media && is_numeric($media)) {
                // set post featured media to the attachment
                set_post_thumbnail($post_id, $media);
                error_log('updated media : id: ' . print_r($media, true));
            } else {
                continue;
            }
        }
    }
}
