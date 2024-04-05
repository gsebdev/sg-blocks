<?php
$post_id = get_the_ID();
$custom_classnames = $attributes['className'] ?? '';
$info_id = $attributes['info_id'] ?? '';
$level = $attributes['level'] ?? 3;
$content = get_post_meta($post_id, 'info', true);

if ($content) {
    $info_el = null;
    foreach ($content as $el) {
        if ($el['id'] === $info_id) {
            $info_el = $el;
            break;
        }
    }
    if (!$info_el || !isset($info_el['content']) || !isset($info_el['title'])) return;

    $content_html = '<ul class="sg-info__list">';
    foreach ($info_el['content'] as $li) {
        $content_html .= '<li class="sg-info__list-item icon-' . (isset($li['icon']) && $li['icon'] ? esc_attr($li['icon']) : 'ok') . '">' . esc_html($li['text'] ?? '') . '</li>';
    }
    $content_html .= '</ul>';

    echo '<div class="sg-info' . ($custom_classnames ? ' ' . esc_attr($custom_classnames) : '') . '">';
    echo '<h' . $level . '>' . esc_html($info_el['title']) . '</h' . $level . '>';
    echo $content_html;
    echo '</div>';
}
