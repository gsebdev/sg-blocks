<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
if (!class_exists('SG_Contact_Form_Handler')) {
    class SG_Contact_Form_Handler
    {
        public function __construct()
        {
            add_action('wp_ajax_sg_contact_form', [$this, 'contact_form_handler']);
            add_action('wp_ajax_nopriv_sg_contact_form', [$this, 'contact_form_handler']);
            add_action('wp_enqueue_scripts', [$this, 'localize_script'], 30);

            if (WP_DEBUG) {
                add_action('wp_mail_failed', [$this, 'send_debug_json_error']);
                add_action('wp_mail_succeeded', [$this, 'send_debug_json_success']);
            }
        }

        public function localize_script()
        {
            wp_localize_script(SG_BLOCKS_SCRIPTS_NAME, 'ajax_object', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('contact-form-nonce'),
            ));
        }

        public function contact_form_handler()
        {
            if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'contact-form-nonce')) {
                wp_send_json_error('Nonce verification failed!', 401);
                die();
            }

            if (isset($_POST['action']) && $_POST['action'] == 'sg_contact_form') {

                $name = isset($_POST['lastname']) ? sanitize_text_field($_POST['lastname']) : '';
                $robot_check = isset($_POST['firstname']) ? sanitize_text_field($_POST['firstname']) : '';
                $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
                $subject = isset($_POST['subject']) ? sanitize_text_field($_POST['subject']) : '';
                $message = isset($_POST['message']) ? esc_textarea($_POST['message']) : '';

                if (!empty($robot_check)) {
                    wp_send_json_success('ok');
                    die();
                }

                if (empty($name) || empty($email) || empty($message) || empty($subject)) {
                    wp_send_json_error(__('Please fill in all required fields.', 'sg-theme'), 400);
                    die();
                }

                if (!preg_match('/^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž\s]+$/', $name)) {
                    wp_send_json_error(__('Le nom devrait contenir uniquement des lettres.', 'sg-theme'), 400);
                    die();
                }

                if (!is_email($email)) {
                    wp_send_json_error(__('Veuillez saisir une adresse e-mail valide.', 'sg-theme'), 400);
                    die();
                }

                // Email headers
                $to = WP_DEBUG ? get_option('admin_email') : get_option('email');
                $subject = "Nouveau message de : " . $name;
                $headers[] = 'Content-Type: text/html; charset=UTF-8';
                $headers[] = 'From: ' . $name . ' <' . $email . '>';

                // Email body
                $message_body = "<p><u><strong>Nom:</strong></u> $name</p>";
                $message_body .= "<p><u><strong>Email:</strong></u> $email</p>";
                $message_body .= "<p><u><strong>Sujet:</strong></u> $subject</p>";
                $message_body .= "<p><u><strong>Message:</strong></u></p>";
                $message_body .= "<p>$message</p>";

                // Additional styling (optional)
                $message_body = "<div style='font-family: Arial, sans-serif; padding: 10px; border: 1px solid #ccc;'>$message_body</div>";

                // Send email
                $sent = wp_mail($to, $subject, $message_body, $headers);

                if ($sent) {
                    wp_send_json_success(__('Votre message a été envoyé avec succès !', 'sg-theme'));
                } else {
                    wp_send_json_error(__('Échec de l\'envoi du message.', 'sg-theme'), 500);
                }

                die();
            }
        }
        public function send_debug_json_error($error)
        {
            wp_send_json_error([$error], 500);
        }
        public function send_debug_json_success($data)
        {
            wp_send_json_success($data);
        }
    }
}
