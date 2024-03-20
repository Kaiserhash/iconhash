<?php
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title'    => 'Theme General Settings',
        'menu_title'    => 'Theme Settings',
        'menu_slug'     => 'theme-general-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Theme Header Settings',
        'menu_title'    => 'Header',
        'parent_slug'   => 'theme-general-settings',
    ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Theme Footer Settings',
        'menu_title'    => 'Footer',
        'parent_slug'   => 'theme-general-settings',
    ));

}

function my_acf_cpt_save_folder( $path ) {
    return get_stylesheet_directory().'/acf-json/post-types';
}
add_filter('acf/json/save_paths/type=acf-post-type', 'my_acf_cpt_save_folder');

add_filter('rest_interviews_query', 'filter_interviews_by_acf_fields', 10, 2);
add_filter('rest_paginated_interviews_query', 'filter_interviews_by_acf_fields', 10, 2);

function filter_interviews_by_acf_fields($args, $request) {
    $params = $request->get_params();

    if (!empty($params['acf_fields'])) {
        $acf_fields = $params['acf_fields'];

        $meta_query = array('relation' => 'AND');

        foreach ($acf_fields as $field) {
            $value = (strpos($field['value'], ',') !== false) || (isset($field['compare']) && $field['compare'] === "IN") ? explode(',', $field['value']) : $field['value'];
            $meta_query[] = array(
                'key' => $field['key'],
                'value' => $value,
                'type'    => isset($field['type']) ? $field['type'] : 'CHAR',
                'compare' => isset($field['compare']) ? $field['compare'] : '='
            );
        }

        if (empty($args['meta_query'])) {
            $args['meta_query'] = $meta_query;
        } else {
            $args['meta_query'][] = $meta_query;
        }
    }

    return $args;
}

add_action('rest_api_init', 'register_interviews_custom_field_endpoint');

function register_interviews_custom_field_endpoint() {
    register_rest_route('wp/v2', '/interviews-filters/', array(
        'methods' => 'GET',
        'callback' => 'get_interviews_custom_fields',
    ));
}


function get_interviews_custom_fields($request) {
    $args = array(
        'post_type' => 'interviews',
        'posts_per_page' => -1,
    );

    $interviews_query = new WP_Query($args);

    $unique_values = array();

    if ($interviews_query->have_posts()) {
        while ($interviews_query->have_posts()) {
            $interviews_query->the_post();
            $author_info_fields = get_field('authorInfo');
            if( have_rows('authorInfo') ):
                while ( have_rows('authorInfo') ) : the_row();
                    $info_block_fields = get_sub_field('infoBlock');
                    $personal_char_fields = get_sub_field('personalChar');

                    if (!empty($info_block_fields)) {
                        foreach ($info_block_fields as $key => $value) {
                            if (!empty($value)) {
                                if (!isset($unique_values[$key])) {
                                    $unique_values[$key] = array();
                                }
                                if (!in_array($value, $unique_values[$key])) {
                                    $unique_values[$key][] = $value;
                                }
                            }
                        }
                    }

                    if (!empty($personal_char_fields)) {
                        foreach ($personal_char_fields as $key => $value) {
                            if (!empty($value)) {
                                if (!isset($unique_values[$key])) {
                                    $unique_values[$key] = array();
                                }
                                if (!in_array($value, $unique_values[$key])) {
                                    $unique_values[$key][] = $value;
                                }
                            }
                        }
                    }
                endwhile;
            endif;
        }
        wp_reset_postdata();
    }

    return $unique_values;
}

add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/paginated-interviews', array(
        'methods' => 'GET',
        'callback' => 'get_paginated_interviews',
    ));
});

function get_paginated_interviews($request) {
    $args = array(
        'post_type' => 'interviews',
        'posts_per_page' => $request->get_param('per_page') ?: 3,
        'paged' => $request->get_param('page') ?: 1,
    );

    $query_params = $request->get_query_params();
    $args = filter_interviews_by_acf_fields($args, $request);
    $args = array_merge($args, $query_params);
    $query = new WP_Query($args);
    $totalArgs = array(
        'post_type' => 'interviews',
    );
    unset($query_params['per_page']);
    unset($query_params['page']);
    $totalArgs = filter_interviews_by_acf_fields($totalArgs, $request);
    $totalArgs = array_merge($totalArgs, $query_params);
    $queryTotal = new WP_Query($totalArgs);
    $total_posts = $queryTotal->found_posts;
    $totalPages = ceil($total_posts / $args['posts_per_page']);
    $dataList = array();
    foreach ($query->posts as $post) {
        $post_id = $post->ID;
        $acf_fields = get_fields($post_id);
        $post_id = $post->ID;
        $post_title = $post->post_title;
        $post_link = get_permalink($post);
        $post_date = $post->post_date;
        $post_date_gmt = $post->post_date_gmt;
        $post_modified = $post->post_modified;
        $post_modified_gmt = $post->post_modified_gmt;

        $formatted_post = array(
            'acf' => $acf_fields,
            'id' => $post_id,
            'title' => $post_title,
            'link' => $post_link,
            'date' => $post_date,
            'date_gmt' => $post_date_gmt,
            'modified' => $post_modified,
            'modified_gmt' => $post_modified_gmt,
        );

        $dataList[] = $formatted_post;
    }
    wp_reset_postdata();

    return rest_ensure_response(array(
        'dataList' => $dataList,
        'totalPages' => $totalPages,
        'totalItems' => $total_posts
    ));
}