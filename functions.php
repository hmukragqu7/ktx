<?php

function mytheme_enqueue_assets()
{

    // Google Fonts
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Reset CSS
    wp_enqueue_style(
        'reset-css',
        get_template_directory_uri() . '/assets/css/reset.css',
        array(),
        null
    );

    // Index CSS
    wp_enqueue_style(
        'index-css',
        get_template_directory_uri() . '/assets/css/index.css',
        array(),
        null
    );

    // global CSS
    wp_enqueue_style(
        'global-css',
        get_template_directory_uri() . '/assets/css/global.css',
        array(),
        null
    );

    // Location CSS
    wp_enqueue_style(
        'location-css',
        get_template_directory_uri() . '/assets/css/location.css',
        array(),
        null
    );

    // Look Inside CSS
    wp_enqueue_style(
        'look-inside-css',
        get_template_directory_uri() . '/assets/css/look-inside.css',
        array(),
        null
    );

    /* -------------------------- SWIPER CSS -------------------------- */
    wp_enqueue_style(
        'swiper-css',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        array(),
        null
    );

    // Font Awesome CDN
    wp_enqueue_style(
        'fontawesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        null
    );


    /* -------------------------- SWIPER JS -------------------------- */
    wp_enqueue_script(
        'swiper-js',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        array(),
        null,
        true
    );

    /* -------------------------- GSAP CORE -------------------------- */
    wp_enqueue_script(
        'gsap-core',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
        array(),
        null,
        true
    );

    /* -------------------------- GSAP SCROLLTRIGGER -------------------------- */
    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
        array('gsap-core'),
        null,
        true
    );

    // Global JS
    wp_enqueue_script(
        'global-js',
        get_template_directory_uri() . '/assets/js/global.js',
        array('jquery'),
        null,
        true
    );

    // script JS
    wp_enqueue_script(
        'script-js',
        get_template_directory_uri() . '/assets/js/script.js',
        array('jquery'),
        null,
        true
    );

    // button JS
    wp_enqueue_script(
        'button-js',
        get_template_directory_uri() . '/assets/js/button.js',
        array('jquery'),
        null,
        true
    );

    // clients JS
    wp_enqueue_script(
        'clients-js',
        get_template_directory_uri() . '/assets/js/clients.js',
        array('jquery'),
        null,
        true
    );

    // hero-home JS
    // wp_enqueue_script(
    //     'hero-home-js',
    //     get_template_directory_uri() . '/assets/js/hero-home.js',
    //     array('jquery'),
    //     null,
    //     true
    // );

    wp_enqueue_script(
        'home-js',
        get_template_directory_uri() . '/assets/js/hero-home.js',
        array(),
        null,
        true
    );

    wp_localize_script(
        'home-js',
        'themeData',
        array(
            'themeUrl' => get_template_directory_uri()
        )
    );


    // location JS
    wp_enqueue_script(
        'location-js',
        get_template_directory_uri() . '/assets/js/location.js',
        array('jquery'),
        null,
        true
    );

    // look-inside JS
    wp_enqueue_script(
        'look-inside-js',
        get_template_directory_uri() . '/assets/js/look-inside.js',
        array('jquery'),
        null,
        true
    );

    /* -------------------------- LOTTIE WEB -------------------------- */
    wp_enqueue_script(
        'lottie-web',
        'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js',
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_assets');

// Allow .json in Media Library and ensure WP accepts it
add_filter('upload_mimes', function($mimes){
    $mimes['json'] = 'application/json';
    return $mimes;
});

// Fix WordPress filetype check for JSON
add_filter('wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {
    if ( ! empty($data['ext']) ) {
        return $data;
    }
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    if ( strtolower($ext) === 'json' ) {
        $type = 'application/json';
        return array(
            'ext'             => 'json',
            'type'            => $type,
            'proper_filename' => $data['proper_filename'] ?? $filename,
        );
    }
    return $data;
}, 10, 4);

/* Allow SVG Uploads Safely */
function allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_uploads');

/* Fix SVG display in Media Library */
function fix_svg_thumb() {
    echo '<style>
        .attachment-266x266, .thumbnail img {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}
add_action('admin_head', 'fix_svg_thumb');
