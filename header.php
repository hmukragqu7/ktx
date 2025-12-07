<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<!-- ================== NAVBAR STARTS ===================== -->
    <header>
      <!-- Navigation Bar -->
      <nav class="navbar">
        <div class="nav-container">
          <div class="navbar-header">
            <a class="navbar-brand" href="/wordpress/index.php/home/" tabindex="-1">
              <img
                src="<?php echo get_template_directory_uri(); ?>/assets/images/novel-office-logo.png"
                height="auto"
                alt="Novel Logo"
                style="max-width: 300px"
              />
            </a>
          </div>

          <!-- Desktop Menu -->
          <ul class="nav-menu font-poppins">
            <li class="nav-item"> 
              <a href="" class="nav-link">
                Solutions <i class="fas fa-chevron-down"></i>
              </a>
              <div class="dropdown">
                <a href="/wordpress/index.php/soln-office-space/" class="dropdown-item"
                  >Office Spaces</a
                >
                <a href="/wordpress/index.php/soln-coworking-space/" class="dropdown-item"
                  >Coworking Spacess</a
                >
                <a href="/wordpress/index.php/soln-business-center/" class="dropdown-item"
                  >Business Centers</a
                >
                <a href="/wordpress/index.php/soln-meeting-rooms/" class="dropdown-item"
                  >Meeting Rooms</a
                >
                <a href="/wordpress/index.php/soln-virtual-office/" class="dropdown-item"
                  >Virtual Office</a
                >
              </div>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                Locations <i class="fas fa-chevron-down"></i>
              </a>
              <div class="dropdown">
                <a href="/wordpress/index.php/loc-queens-road-os/" class="dropdown-item"
                  >Queens Road</a
                >

                <a href="/wordpress/index.php/loc-marathahalli-os/" class="dropdown-item"
                  >Marathahalli</a
                >

                <a href="/wordpress/index.php/loc-mg-road-os/" class="dropdown-item"
                  >MG Road</a
                >

                <a
                  href="/wordpress/index.php/loc-whitefield-now-os/"
                  class="dropdown-item"
                  >Whitefield (NOW)</a
                >

                <a
                  href="/wordpress/index.php/loc-whitefield-btp-os/"
                  class="dropdown-item"
                  >Whitefield (BTP)</a
                >

                <a href="/wordpress/index.php/loc-koramangala-os/" class="dropdown-item"
                  >Koramangala</a
                >

                <a href="/wordpress/index.php/loc-hsr-extension-os/" class="dropdown-item"
                  >HSR Extension</a
                >

                <a href="/wordpress/index.php/loc-all-locations-os/" class="dropdown-item"
                  >All Locations</a
                >
              </div>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                Tech Parks <i class="fas fa-chevron-down"></i>
              </a>
              <div class="dropdown">
                <a href="/wordpress/index.php/tp-whitefield-btp/" class="dropdown-item"
                  >Whitefield (BTP)</a
                >
              </div>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link"> Investments </a>
            </li>
            <li class="nav-item">
              <a href="" class="nav-link">
                More <i class="fas fa-chevron-down"></i>
              </a>
              <div class="dropdown">
                <a href="/wordpress/index.php/more-services/" class="dropdown-item">Services</a>
                <a href="/wordpress/index.php/more-about-us/" class="dropdown-item"
                  >About Us</a
                >
                <a href="" class="dropdown-item">Careers</a>
              </div>
            </li>

            <li class="nav-item">
              <button class="wave-btn white" id="waveButton">
                <a href="tel:+918310094266" class="wave-btn__label">
                  <svg class="phone-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none" overflow="visible">
                    <path d="M 16 32 C 7.177 32 0 24.823 0 16 C 0 7.177 7.177 0 16 0 C 24.823 0 32 7.177 32 16 C 32 24.823 24.823 32 16 32 Z M 16 1.333 C 7.913 1.333 1.333 7.913 1.333 16 C 1.333 24.087 7.913 30.667 16 30.667 C 24.087 30.667 30.667 24.087 30.667 16 C 30.667 7.913 24.087 1.333 16 1.333 Z M 20.539 25.333 C 14.575 25.333 6.667 17.424 6.667 11.46 C 6.667 10.175 7.153 8.981 8.036 8.099 L 8.936 7.313 C 9.744 6.499 11.305 6.469 12.18 7.344 L 13.681 9.289 C 14.063 9.661 14.304 10.243 14.304 10.863 C 14.304 11.483 14.063 12.064 13.624 12.501 L 12.692 13.679 C 13.861 16.375 15.705 18.224 18.313 19.312 L 19.527 18.345 C 20.437 17.469 21.881 17.482 22.776 18.373 L 24.591 19.76 C 25.56 20.721 25.56 22.192 24.656 23.095 L 23.932 23.928 C 23.037 24.834 21.814 25.34 20.54 25.331 Z M 10.54 8 C 10.279 8 10.029 8.103 9.845 8.288 L 8.945 9.073 C 8.348 9.672 8 10.531 8 11.46 C 8 16.995 15.775 24 20.539 24 C 21.467 24 22.327 23.652 22.956 23.021 L 23.68 22.188 C 24.096 21.772 24.095 21.147 23.711 20.763 L 21.896 19.376 C 21.447 18.935 20.821 18.935 20.439 19.319 L 18.54 20.835 L 18.184 20.699 C 14.955 19.465 12.64 17.152 11.304 13.823 L 11.16 13.463 L 12.629 11.615 C 12.867 11.372 12.969 11.125 12.969 10.863 C 12.969 10.6 12.867 10.353 12.68 10.168 L 11.179 8.223 C 10.999 8.075 10.773 7.996 10.54 8 Z" fill="currentColor"/>
                  </svg>
                  +91 8310094266
                </a>
                <div class="wave-btn__circles">
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                </div>
              </button>
            </li>
          </ul>

          <!-- Mobile Menu Toggle -->
          <button class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" id="mobileOverlay"></div>

      <!-- Mobile Menu -->
      <div class="mobile-menu font-poppins" id="mobileMenu">
        <ul class="mobile-nav-menu">
          <!-- Main Menu Panel -->
          <div class="menu-panel main-menu" id="mainMenu">
            <li class="mobile-nav-item">
              <a href="../" class="mobile-nav-link"> Home </a>
            </li>
            <li class="mobile-nav-item">
              <a href="" class="mobile-nav-link" data-submenu="solutions">
                Solutions <i class="fas fa-chevron-right"></i>
              </a>
            </li>
            <li class="mobile-nav-item">
              <a href="" class="mobile-nav-link" data-submenu="services">
                Locations <i class="fas fa-chevron-right"></i>
              </a>
            </li>
            <li class="mobile-nav-item">
              <a href="" class="mobile-nav-link" data-submenu="techparks">
                Tech Parks <i class="fas fa-chevron-right"></i>
              </a>
            </li>
            <li class="mobile-nav-item">
              <a href="" class="mobile-nav-link"> Investments </a>
            </li>
            <li class="mobile-nav-item">
              <a href="" class="mobile-nav-link" data-submenu="about">
                More <i class="fas fa-chevron-right"></i>
              </a>
            </li>
            <li class="mobile-nav-item">
              <button class="wave-btn" id="waveButton" >
                <a href="tel:+918310094266" class="wave-btn__label"
                  >+91 8310094266</a
                >
                <div class="wave-btn__circles">
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                  <div class="wave-btn__circle"></div>
                </div>
              </button>
            </li>
          </div>

          <!-- Services Submenu -->
          <div class="menu-panel submenu" id="servicesSubmenu">
            <a href="#" class="back-button" data-back="main">
              <i class="fas fa-arrow-left"></i> Back
            </a>

            <a
              href="/wordpress/index.php/loc-queens-road-os/"
              class="mobile-nav-link"
            >
              Queens Road
            </a>
            <a
              href="/wordpress/index.php/loc-marathahalli-os/"
              class="mobile-nav-link"
            >
              Marathahalli
            </a>
            <a
              href="/wordpress/index.php/loc-mg-road-os/"
              class="mobile-nav-link"
            >
              MG Road
            </a>
            <a
              href="/wordpress/index.php/loc-whitefield-now-os/"
              class="mobile-nav-link"
            >
              Whitefield (NOW)
            </a>
            <a
              href="/wordpress/index.php/loc-whitefield-btp-os/"
              class="mobile-nav-link"
            >
              Whitefield (BTP)
            </a>
            <a
              href="/wordpress/index.php/loc-koramangala-os/"
              class="mobile-nav-link"
            >
              Koramangala
            </a>
            <a
              href="/wordpress/index.php/loc-hsr-extension-os/"
              class="mobile-nav-link"
            >
              HSR Extension
            </a>
            <a
              href="/wordpress/index.php/loc-all-locations-os/"
              class="mobile-nav-link"
            >
              All Locations
            </a>
          </div>

          <!-- Solutions Submenu -->
          <div class="menu-panel submenu" id="solutionsSubmenu">
            <a href="#" class="back-button" data-back="main">
              <i class="fas fa-arrow-left"></i> Back
            </a>
            <!-- <div class="submenu-title">Solutions</div> -->
            <a href="/wordpress/index.php/soln-office-space/" class="mobile-dropdown-item"
              >Office Spaces</a
            >
            <a href="/wordpress/index.php/soln-coworking-space/" class="mobile-dropdown-item"
              >Coworking Spaces</a
            >
            <a href="/wordpress/index.php/soln-business-center/" class="mobile-dropdown-item"
              >Business Centers</a
            >
            <a href="/wordpress/index.php/soln-meeting-rooms/" class="mobile-dropdown-item"
              >Meeting Rooms</a
            >
            <a href="/wordpress/index.php/soln-virtual-office/" class="mobile-dropdown-item"
              >Virtual Offices</a
            >
          </div>

          <!-- Tech Parks Submenu -->
          <div class="menu-panel submenu" id="techparksSubmenu">
            <a href="#" class="back-button" data-back="main">
              <i class="fas fa-arrow-left"></i> Back
            </a>
            <!-- <div class="submenu-title">Tech Parks</div> -->
            <a href="/wordpress/index.php/tp-whitefield-btp" class="mobile-dropdown-item"
              >Whitefield BTP</a
            >
          </div>

          <!-- About Submenu -->
          <div class="menu-panel submenu" id="aboutSubmenu">
            <a href="#" class="back-button" data-back="main">
              <i class="fas fa-arrow-left"></i> Back
            </a>
            <!-- <div class="submenu-title">More</div> -->
            <a href="<?php echo site_url('/index.php/more-services/'); ?>" class="mobile-dropdown-item"
              >Services</a
            >
            <a href="wordpress/index.php/more-about-us/" class="mobile-dropdown-item"
              >About Us</a
            >
            <a href="#" class="mobile-dropdown-item">Careers</a>
          </div>
        </ul>
      </div>
    </header>
    <!-- ================== NAVBAR ENDS ===================== -->

    
    
    