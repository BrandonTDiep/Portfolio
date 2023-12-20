/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	/**
	* Easy selector helper function
	*/
   const select = (el, all = false) => {
	 el = el.trim()
	 if (all) {
	   return [...document.querySelectorAll(el)]
	 } else {
	   return document.querySelector(el)
	 }
   }
 
   /**
	* Easy event listener function
	*/
   const on = (type, el, listener, all = false) => {
	 let selectEl = select(el, all)
	 if (selectEl) {
	   if (all) {
		 selectEl.forEach(e => e.addEventListener(type, listener))
	   } else {
		 selectEl.addEventListener(type, listener)
	   }
	 }
   }
 
   /**
	* Easy on scroll event listener 
	*/
   const onscroll = (el, listener) => {
	 el.addEventListener('scroll', listener)
   }
 
   /**
	* Navbar links active state on scroll
	*/
   let navbarlinks = select('#menu .scrollto', true)
   const navbarlinksActive = () => {
	 let position = window.scrollY + 200
	 navbarlinks.forEach(navbarlink => {
	   if (!navbarlink.hash) return
	   let section = select(navbarlink.hash)
	   if (!section) return
	   if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
		 navbarlink.classList.add('active')
	   } else {
		 navbarlink.classList.remove('active')
	   }
	 })
   }
   window.addEventListener('load', navbarlinksActive)
   onscroll(document, navbarlinksActive)
 
   /**
	* Scrolls to an element with header offset
	*/
   const scrollto = (el) => {
	 let elementPos = select(el).offsetTop
	 window.scrollTo({
	   top: elementPos,
	   behavior: 'smooth'
	 })
   }
 
   /**
	* Back to top button
	*/
   let backtotop = select('.back-to-top')
   if (backtotop) {
	 const toggleBacktotop = () => {
	   if (window.scrollY > 100) {
		 backtotop.classList.add('active')
	   } else {
		 backtotop.classList.remove('active')
	   }
	 }
	 window.addEventListener('load', toggleBacktotop)
	 onscroll(document, toggleBacktotop)
   }
 
   /**
	* Mobile nav toggle
	*/
   on('click', '.mobile-nav-toggle', function(e) {
	 select('body').classList.toggle('mobile-nav-active')
	 this.classList.toggle('bi-list')
	 this.classList.toggle('bi-x')
   })
 
   /**
	* Scrool with ofset on links with a class name .scrollto
	*/
   on('click', '.scrollto', function(e) {
	 if (select(this.hash)) {
	   e.preventDefault()
 
	   let body = select('body')
	   if (body.classList.contains('mobile-nav-active')) {
		 body.classList.remove('mobile-nav-active')
		 let navbarToggle = select('.mobile-nav-toggle')
		 navbarToggle.classList.toggle('bi-list')
		 navbarToggle.classList.toggle('bi-x')
	   }
	   scrollto(this.hash)
	 }
   }, true)
 
   /**
	* Scroll with ofset on page load with hash links in the url
	*/
   window.addEventListener('load', () => {
	 if (window.location.hash) {
	   if (select(window.location.hash)) {
		 scrollto(window.location.hash)
	   }
	 }
   });
  
  
	/**
	 * Hero type effect
	 */
	const typed = select('.typed')
	if (typed) {
	  let typed_strings = typed.getAttribute('data-typed-items')
	  typed_strings = typed_strings.split(',')
	  new Typed('.typed', {
		strings: typed_strings,
		loop: true,
		typeSpeed: 100,
		backSpeed: 50,
		backDelay: 2000
	  });
	}
  

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});
			

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

			

})(jQuery);