(function() {

	/* Change Header on Scroll */
	
	var header = document.querySelector('.header');
	
	var changePos = 1;
	
	function scrolled(event) {
		var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		
		(scrollTop > changePos) ? header.classList.add('scrolled') : header.classList.remove('scrolled');
	}
	
	window.addEventListener('scroll', scrolled);
	
	/* Toggle Menu/Cart */
	
	var overlay = document.querySelector('.overlay');
	var close__cart = document.querySelector('.close__cart');
	
	var menu = {
		toggle: document.querySelector('.header__icon--menu'),
		module: document.querySelector('.menu'),
		
		toggle__module: function(e) {
			e.preventDefault();
			close__module(cart);
			var is__open = this.module.getAttribute('data-toggle') === 'true';
			(is__open) ? open__module(this) : close__module(this);
		}
	};
	
	var cart = {
		toggle: document.querySelector('.header__icon--cart'),
		module: document.querySelector('.cart'),
		
		toggle__module: function(e) {
			e.preventDefault();
			close__module(menu);
			var is__open = this.module.getAttribute('data-toggle') === 'true';
			(is__open) ? open__module(this) : close__module(this);
		}
	};
	
	function close__module(element) {
		element.toggle.classList.remove('open');
		element.module.classList.add('hidden');
		element.module.setAttribute('data-toggle', 'true');
		overlay.classList.add('hidden');
	}
	
	function open__module(element) {
		element.toggle.classList.add('open');
		element.module.classList.remove('hidden');
		element.module.setAttribute('data-toggle', 'false');
		overlay.classList.remove('hidden');
	}
	
	overlay.addEventListener('click', function(e) {
		close__module(menu);
		close__module(cart);
	});
	close__cart.addEventListener('click', function(e) {
		e.preventDefault();
		close__module(cart); 
	});
	menu.toggle.addEventListener('click', function(e) { menu.toggle__module(e); });
	cart.toggle.addEventListener('click', function(e) { cart.toggle__module(e); });
	
	/* Show Products */
	
	var tabs = document.querySelectorAll('.tab');
	var sections = document.querySelectorAll('.product__collapse');
	
	function collapse__section(element) {
		var section__height = element.scrollHeight;
		var element__transition = element.style.transition;
		element.style.transition = '';
		
		requestAnimationFrame(function() {
			element.style.height = section__height + 'px';
			element.style.transition = element__transition;
			
			requestAnimationFrame(function() {
				element.style.height = 0 + 'px';
			});
		});
		
		element.setAttribute('data-collapsed', 'true');
		element.classList.remove('open');
	}
	
	function expand__section(element) {
		var section__height = element.scrollHeight;
		element.style.height = section__height + 'px';
		element.addEventListener('transitioned', function(event) {
			element.removeEventListener('transitioned', arguments.callee);
			element.style.height = null;
		});
		
		element.setAttribute('data-collapsed', 'false');
		element.classList.add('open');
	}
	
	
	function show__products(e) {
		e.preventDefault();
		
		var target = this.getAttribute('data-target');
		var section = document.querySelector('#' + target);
		var is__collapsed = section.getAttribute('data-collapsed') === 'true';
		
		for (var i = 0; i < sections.length; i++) {
			if (sections[i] !== section) {
				collapse__section(sections[i]);
				tabs[i].classList.remove('open');
			} 
		}
		
		if (is__collapsed) {
			this.classList.add('open');
			expand__section(section);
			section.setAttribute('data-collapsed', 'false');
		} else {
			this.classList.remove('open');
			collapse__section(section);
		}
	}
	
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', show__products);
	}
	
	if (window.matchMedia('(min-width: 1300px)').matches) {
		document.querySelector('.tab--yellow').classList.add('open');
		expand__section(document.querySelector('#yellow'));
		document.querySelector('#yellow').setAttribute('data-collapsed', 'false');
	}
	
	/* TEMP */
	
	var buttons = document.querySelectorAll('.btn--add');
	
	function add__item(e) {
		e.preventDefault();
		
		this.parentNode.parentNode.classList.add('product--added');
		this.classList.add('btn--added');
		this.innerHTML = 'Odstrániť z košíka';
		
		open__module(cart);
		
		document.querySelector('.cartproduct').classList.add('cartproduct--added');
	}
	
	function remove__item(e) {
		e.preventDefault();
		
		var cart = this.parentNode.parentNode;
		cart.removeChild(this.parentNode);
	}
	
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', add__item);
	}
	
	document.querySelector('.cartproduct__remove').addEventListener('click', remove__item);
	
})();