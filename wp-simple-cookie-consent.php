<?php
/*
Plugin Name: Simple Cookie Consent with Vendor Analytics
Description: Adds a cookie consent banner with Accept/Decline, optional Member Minder Pro disclaimer, and analytics vendor selection.
Version: 1.0
Author: Rob (Custom Build)
*/

defined('ABSPATH') || exit;

define('SCC_VERSION', '1.0');
define('SCC_PLUGIN_URL', plugin_dir_url(__FILE__));

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('scc-css', SCC_PLUGIN_URL . 'assets/cookie-consent.css', [], SCC_VERSION);
    wp_enqueue_script('scc-js', SCC_PLUGIN_URL . 'assets/cookie-consent.js', [], SCC_VERSION, true);

    // Pass settings to JS
    wp_add_inline_script('scc-js', 'const SCC = ' . json_encode([
        'mmp_enabled' => defined('ENABLE_MMP_PRIVACY_NOTICE') && ENABLE_MMP_PRIVACY_NOTICE,
        'analytics_vendor' => defined('ACTIVE_ANALYTICS_VENDOR') ? ACTIVE_ANALYTICS_VENDOR : '',
    ]) . ';', 'before');
});

add_action('wp_footer', function () {
    echo '<div id="cookie-consent-banner" class="cookie-consent-banner">
        <div class="cookie-consent-content">
            <p>We use cookies to enhance your experience. By clicking “Accept”, you agree to non-essential cookies. <a href="/cookie-policy">Learn more</a>.</p>
            <div class="cookie-buttons">
                <button id="accept-cookies" class="cookie-btn accept">Accept</button>
                <button id="decline-cookies" class="cookie-btn decline">Decline</button>
            </div>
        </div>
    </div>';
});
