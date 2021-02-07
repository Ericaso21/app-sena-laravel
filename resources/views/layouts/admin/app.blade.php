<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>SENA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
    <meta content="Themesbrand" name="author" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">        <!-- DataTables -->
    <link rel="stylesheet" href="{{ url('css/app.css') }}">
</head>

<body>
<!-- Begin page -->
<div id="layout-wrapper">
    @include('layouts.admin.components.navbar')
    @include('layouts.admin.components.sidebar')

    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">
                @yield('content')
            </div>
        @include('layouts.admin.components.footer')
    </div>

</div>

</div>
<div class="rightbar-overlay"></div>    <!-- /Right-bar -->
<script src="{{ url('js/app.js') }}"></script>

</body>
</html>
