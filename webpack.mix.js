const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

/*mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);*/
mix.styles([
    'resources/minible/css/datatables.min.css',
    'resources/minible/css/sweetalert2.min.css',
    'resources/minible/css/bootstrap.min.css',
    'resources/minible/css/icons.min.css',
    'resources/minible/css/app.min.css',
    'resources/minible/css/main.css'
],'public/css/app.css')
    .scripts([
        'resources/minible/js/plugins/jquery.min.js',
        'resources/minible/js/plugins/bootstrap.min.js',
        'resources/minible/js/plugins/metismenu.min.js',
        'resources/minible/js/plugins/simplebar.min.js',
        'resources/minible/js/plugins/node-waves.min.js',
        'resources/minible/js/plugins/waypoints.min.js',
        'resources/minible/js/plugins/jquery-counterup.min.js',
        'resources/minible/js/plugins/datatables.min.js',
        'resources/minible/js/plugins/jszip.min.js',
        'resources/minible/js/plugins/pdfmake.min.js',
        'resources/minible/js/plugins/datatables.init.js',
        'resources/minible/js/plugins/sweetalert2.min.js',
        'resources/minible/js/plugins/sweet-alerts.init.js',
        'resources/minible/js/plugins/app.min.js',
        'resources/minible/js/functions_apprentice.js',
        'resources/minible/js/functions_instructor.js',
        'resources/minible/js/functions_trainingProgram.js',
        'resources/minible/js/functions_workingDaily.js',
        'resources/minible/js/functions_file.js'
    ],'public/js/app.js')
