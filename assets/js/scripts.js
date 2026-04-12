(function () {
    // Constants.
    const desktopBreakpoint = 1000;
    const desktopMediaQuery = window.matchMedia('(min-width: ' + desktopBreakpoint + 'px)');
    const animationSpeed = 1250;

    // DOM queries.
    const MenuToggleButton = document.querySelector('#menu-toggle');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const mainMenu = document.querySelector('.main-menu');
    const menuItems = Array.from(document.querySelectorAll('.menu-item-has-children'));
    const menuSubs = Array.from(document.querySelectorAll('.sub-menu'));
    const menuHeadings = document.querySelectorAll('.menu-item-has-children > a');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.querySelector('.header .container');
    const pageContent = document.querySelector('#content');
    const pageFooter = document.querySelector('footer');
    const supportsInert = 'inert' in HTMLElement.prototype;

    // States.
    let closeMenuTimeout;
    let isMobile = !desktopMediaQuery.matches;
    let isAnimating = false;

    /**
     * 
     * Throttle
     * 
     * @param {*} func Function
     * @param {*} limit Milliseconds
     * @returns 
     */
    const throttle = (func, limit) => {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    /**
     * Slideup
     *
     * @param {*} target   Element
     * @param {*} duration Time in ms
     * @return {void}
     */
    const slideUp = (target, duration = 500) => {
        isAnimating = true;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(
            () => {
                target.style.display = 'none';
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                isAnimating = false;
            },
            duration
        );
    };
    /**
     * Slide Down
     *
     * @param {*} target   Element.
     * @param {*} duration Time in ms.
     * @return {void}
     */
    const slideDown = (target, duration = 500) => {
        isAnimating = true;
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none') {
            display = 'block';
        }
        target.style.display = display;
        const height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(
            () => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                isAnimating = false;
            },
            duration,
        );
    };
    /**
     * Toggle Slide
     *
     * @param {*} target   Element
     * @param {*} duration Time in ms
     * @return {Function} Slide toggle.
     */
    const slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration);
        }
        return slideUp(target, duration);
    };

    // Menu functions.
    const updateHeaderTop = () => {
        const headerRect = header.getBoundingClientRect();
        const isHeaderSticky = headerRect.top === 0 || window.pageYOffset > 0;
        const distanceFromTop = isHeaderSticky ? headerRect.height : headerRect.bottom + window.pageYOffset;
        if (isMobile) {
            mainMenu.style.top = `${distanceFromTop}px`;
        } else {
            mainMenu.style.removeProperty('top');
        }
    };

    const startCloseMenuTimeout = () => {
        closeMenuTimeout = setTimeout(closeMenu, 50);
    };

    const stopCloseMenuTimeout = () => {
        clearTimeout(closeMenuTimeout);
    };

    const openMenu = (el) => {
        menuItems.forEach(item => {
            item.classList.remove('is-open')
            item.blur();
        });
        document.activeElement?.blur();
        el.classList.add('is-open');
        el.focus();
    };

    const closeMenu = () => {
        document.activeElement?.blur();
        menuItems.forEach(item => {
            item.classList.remove('is-open');
            item.blur();
        });
    };

    // Dropdown functions.
    const handleDropdownMouseIn = function () {
        if (!isMobile) {
            this.classList.add('is-expanded');
        }
    };

    const handleDropdownMouseOut = function () {
        if (!isMobile) {
            this.classList.remove('is-expanded');
        }
    };

    // Reset function.
    const resetMenusAndDropdowns = () => {
        // Close any open menus.
        menuItems.forEach(item => {
            item.classList.remove('is-open');
        });

        // Close any expanded dropdowns.
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('is-expanded');
        });
    };

    const handleScroll = throttle(() => {
        updateHeaderTop();
    }, 200);

    const setElementInert = (element, inertValue) => {
        if (!element) {
            return;
        }

        if (supportsInert) {
            element.inert = inertValue;
            return;
        }

        if (inertValue) {
            element.classList.add('is-inert-fallback');
            element.setAttribute('aria-hidden', 'true');
        } else {
            element.classList.remove('is-inert-fallback');
            element.removeAttribute('aria-hidden');
        }
    };

    const setMobileInteractivityState = (menuIsOpen) => {
        if (isMobile) {
            setElementInert(mainMenu, !menuIsOpen);
        } else {
            setElementInert(mainMenu, false);
        }

        setElementInert(pageContent, menuIsOpen);
        setElementInert(pageFooter, menuIsOpen);
    };

    const openMobileMenu = () => {
        if (!isMobile) {
            return;
        }

        MenuToggleButton.classList.add('is-active');
        mainMenu.classList.add('is-active');
        document.body.classList.add('has-menu-active');

        const buttonText = MenuToggleButton.querySelector('span');
        if (buttonText) {
            buttonText.textContent = 'Close';
        }

        MenuToggleButton.setAttribute('aria-label', 'Close Menu');
        MenuToggleButton.setAttribute('aria-expanded', 'true');

        setMobileInteractivityState(true);
    };

    const closeMobileMenu = ({ returnFocus = false } = {}) => {
        MenuToggleButton.classList.remove('is-active');
        mainMenu.classList.remove('is-active');
        document.body.classList.remove('has-menu-active');

        const buttonText = MenuToggleButton.querySelector('span');
        if (buttonText) {
            buttonText.textContent = 'Menu';
        }

        MenuToggleButton.setAttribute('aria-label', 'Open Menu');
        MenuToggleButton.setAttribute('aria-expanded', 'false');

        setMobileInteractivityState(false);

        if (returnFocus) {
            MenuToggleButton.focus();
        }
    };

    // Event handlers,
    const handleResize = throttle(() => {
        const wasMobile = isMobile;
        isMobile = !desktopMediaQuery.matches;

        if (isMobile !== wasMobile) {
            closeMobileMenu();
        }

        if (!isMobile) {
            menuSubs.forEach(subMenu => subMenu.style.removeProperty('display'));
        }

        setMobileInteractivityState(false);
        applyHoverIntent();
        applyDropdownListeners();
        resetMenusAndDropdowns();
        updateHeaderTop();
    }, 200);

    const handleMenuToggleButtonClick = (e) => {
        e.preventDefault();
        if (!isMobile) {
            return;
        }

        if (MenuToggleButton.classList.contains('is-active')) {
            closeMobileMenu({ returnFocus: true });
        } else {
            openMobileMenu();
        }
    };

    const handleBackdropClick = () => {
        if (!isMobile || !document.body.classList.contains('has-menu-active')) {
            return;
        }

        closeMobileMenu({ returnFocus: true });
    };

    const handleHeadingClick = (e) => {
        if (isAnimating) {
            return;
        }
        if (isMobile) {
            e.preventDefault();
            const menuItem = e.target.parentNode;
            menuItem.classList.toggle('is-open');
            const subMenu = e.target.nextElementSibling;
            slideToggle(subMenu, animationSpeed);
        } else if (e.target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    };

    const handleDropdownClick = function () {
        this.classList.toggle('is-expanded');
    };

    const handleEscapeKey = (e) => {
        if (e.keyCode !== 27) {
            return;
        }

        if (isMobile && document.body.classList.contains('has-menu-active')) {
            closeMobileMenu({ returnFocus: true });
            return;
        }

        if (!isMobile) {
            startCloseMenuTimeout();
        }
    };

    // Apply hover intent.
    const applyHoverIntent = () => {
        menuItems.forEach(item => {
            hoverintent(item, () => {
                if (isMobile) return;
                stopCloseMenuTimeout();
                openMenu(item);
            }, () => {
                if (isMobile) return;
                stopCloseMenuTimeout();
                startCloseMenuTimeout();
            }).options({
                sensitivity: 8,
                interval: 50,
            });
        });

        if (!isMobile) {
            menuSubs.forEach(element => {
                element.addEventListener('mouseenter', stopCloseMenuTimeout, false);
                element.addEventListener('mouseleave', startCloseMenuTimeout, false);
            });
            dropdowns.forEach(dropdown => {
                hoverintent(dropdown, handleDropdownMouseIn, handleDropdownMouseOut).options({
                    sensitivity: 8,
                    interval: 50,
                });
            });
        } else {
            dropdowns.forEach(dropdown => dropdown.addEventListener('click', handleDropdownClick));
        }
    };

    // Apply dropdown listeners.
    const applyDropdownListeners = () => {
        dropdowns.forEach(dropdown => {
            // Remove existing event listeners.
            dropdown.removeEventListener('click', handleDropdownClick);
            dropdown.removeEventListener('mouseover', handleDropdownMouseIn);
            dropdown.removeEventListener('mouseout', handleDropdownMouseOut);

            if (isMobile) {
                dropdown.addEventListener('click', handleDropdownClick);
            } else {
                hoverintent(dropdown, handleDropdownMouseIn, handleDropdownMouseOut).options({
                    sensitivity: 8,
                    interval: 50,
                });
            }
        });
    };

    // Initialize.
    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll); 
        document.addEventListener('keydown', handleEscapeKey);
        MenuToggleButton?.addEventListener('click', handleMenuToggleButtonClick);
        menuBackdrop?.addEventListener('click', handleBackdropClick);
        menuHeadings.forEach(heading => heading.addEventListener('click', handleHeadingClick));
        applyHoverIntent();
        applyDropdownListeners();
        updateHeaderTop();

        // On mobile, prevent interaction with the menu until it is opened.
        setMobileInteractivityState(false);
    });

}());
