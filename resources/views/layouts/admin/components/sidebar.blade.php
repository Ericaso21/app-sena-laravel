<div class="vertical-menu">

    <!-- LOGO -->
    <div class="navbar-brand-box">
        <a href="" class="logo logo-dark">
            <span class="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="assets/images/logo-dark.png" alt="" height="20">
            </span>
        </a>

        <a href="" class="logo logo-light">
            <span class="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="assets/images/logo-light.png" alt="" height="20">
            </span>
        </a>
    </div>

    <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
        <i class="fa fa-fw fa-bars"></i>
    </button>

    <div data-simplebar class="sidebar-menu-scroll">

        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled" id="side-menu">
                <li class="menu-title">Menu</li>

                <li>
                    <a href="{{ route('Apprentice.index') }}">
                        <i class="uil-home-alt"></i>
                        <span>Aprendiz</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('Instructor.index') }}">
                        <i class="uil-home-alt"></i>
                        <span>Instructor</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('File.index') }}">
                        <i class="uil-home-alt"></i>
                        <span>Ficha</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('TrainingProgram.index') }}">
                        <i class="uil-home-alt"></i>
                        <span>Programa de formacion</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('workingDaily.index') }}">
                        <i class="uil-home-alt"></i>
                        <span>Jornada</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
    </div>
</div>
