function hideImage(img) {
    jQuery(img).animate({
        'opacity' : 0
    },150);
}

function showImage(img) {
    
    jQuery(img).animate({
        'opacity' : 1
    },150);
}

function productHover(){
    jQuery('.img-hided').hover(function(){
	    if (window.innerWidth > 979) {
		    jQuery(this).animate({
			    'opacity' : 1
		    },200);
	    }
    }, function(){
	    if (window.innerWidth > 979) {
		    jQuery(this).animate({
			    'opacity' : 0
		    },200);
	    }
    });
}

function qtyDown(id){
    var qty_el = document.getElementById('cart[' + id + '][qty]');
    var qty = qty_el.value; 
    if( qty == 2) {
        jQuery('.box_down' + id).css({
            'visibility' : 'hidden'
        });
    }
    if( !isNaN( qty ) && qty > 0 ){
        qty_el.value--;
    }         
    return false;
}

function qtyUp(id){
    var qty_el = document.getElementById('cart[' + id + '][qty]');
    var qty = qty_el.value; 
    if( !isNaN( qty )) {
        qty_el.value++;
    }
    jQuery('.box_down' + id).css({
        'visibility' : 'visible'
    });
    return false;
}
    
function setAjaxData(data){
    if (data.status == 'ERROR'){
        console.log(data.message);
    }else{
        if (jQuery('.block-cart')){
            jQuery('.block-cart').replaceWith(data.sidebar);
        }
        if (jQuery('.top-cart')){
            jQuery('.top-cart').replaceWith(data.topcart);
        } 
        jQuery.fancybox.close();
    }
}

    

jQuery(function($) {
    
    productHover();
    
        /* "Top" button
    -------------------------------------------------------------- */

    var scroll_timer;
    var displayed = false;
    var $message = jQuery('#back-to-top');
    var $window = jQuery(window);
    
    $window.scroll(function () {
        window.clearTimeout(scroll_timer);
        scroll_timer = window.setTimeout(function () { 
        if($window.scrollTop() <= 0) 
        {
            displayed = false;
            $message.fadeOut(500);
        }
        else if(displayed == false) 
        {
            displayed = true;
            $message.stop(true, true).fadeIn(500).click(function () { $message.fadeOut(500); });
        }
        }, 400);
    });
    
    jQuery('#top-link').click(function(e) {
            jQuery('html, body').animate({scrollTop:0}, 'slow');
            return false;
    });

    /* Fixed menu */
    
    jQuery(window).scroll(function(){
    	var fixedHeader = jQuery('.fixed-header-area');
    	var scrollTop = jQuery(this).scrollTop();
    	var headerHeight = jQuery('.header-top').height() + jQuery('.header-container').height();
    	
    	if(scrollTop > headerHeight){
    		if(!fixedHeader.hasClass('fixed-already')) {
		    	fixedHeader.stop().addClass('fixed-already');
    		}
    	}else{
    		if(fixedHeader.hasClass('fixed-already')) {
		    	fixedHeader.stop().removeClass('fixed-already');
    		}
    	}
    });
    
    // Nice Scroll  
    //jQuery("html").niceScroll();  
    
    /* Tabs
    -------------------------------------------------------------- */
    var tabs = jQuery('.tabs');
    jQuery('.tabs > p > a').unwrap('p');
    tabs.each(function(){
    	var currTab = jQuery(this);
	    currTab.find('.tab-title').click(function(e){
	        if(jQuery(this).hasClass('opened')){
	            jQuery(this).removeClass('opened').next().hide();
	            currTab.addClass('closed');
	        }else{
	            currTab.find('.tab-title').each(function(){
	                jQuery(this).removeClass('opened').next().hide();
	            });
	            jQuery(this).addClass('opened').next().show();
	        }
	    });
    });
    
    /* Mobile navigation
    -------------------------------------------------------------- */
    
    var navList = jQuery('div.menu > ul').clone();
    jQuery('div.menu > ul').removeClass(' menu-type-side menu-type-default');
    var etOpener = '<span class="open-child">(open)</span>';
    navList.removeClass('menu').addClass('et-mobile-menu');
    
    headerLinks = jQuery('#header-links ul.links li').clone();
    lastLink = navList.children('li:last-child');
    lastLink.after(headerLinks);
    
	navList.find('li:has(ul)',this).each(function() {
		jQuery(this).prepend(etOpener);
	})
    
    navList.find('.open-child').toggle(function(){
        jQuery(this).parent().addClass('over').find('>ul').slideDown(200);
    },function(){
        jQuery(this).parent().removeClass('over').find('>ul').slideUp(200);
    });
    
    jQuery('.header-container').after(navList[0]);
    jQuery('.mobile-menutype-side .et-mobile-menu').wrap('<div class="side-menu-wrap" />');
    jQuery('.et-mobile-menu').before('<div id="close-side-nav"></div>');
    jQuery('div.menu').after('<span class="et-menu-title"><i class="icon-reorder"></i></span>');
    
    jQuery('.et-menu-title').click(function(){
	    toggleMobileMenu();
    });
    jQuery('#close-side-nav').click(function(){
	    toggleMobileMenu();
    });

    jQuery('.mobile-menutype-default .et-menu-title').toggle(function(){
        jQuery('.et-mobile-menu').slideDown(200);
    },function(){
        jQuery('.et-mobile-menu').slideUp(200);
    });
    
    function toggleMobileMenu(){
	    if(jQuery('body').hasClass('mobile-menu-shown')) {
	        jQuery('body').removeClass('mobile-menu-shown');
	    }else {
	        jQuery('body').addClass('mobile-menu-shown');
	    }
    }
    
    // Review Tab

    jQuery('.rating-links a, .no-rating a').attr('href', '#product_review_tab')
        .click(function(){                
	    jQuery('.tabs .opened').removeClass('opened');
	    jQuery('.tab-content').hide();
	    jQuery('#product_review_tab').addClass('opened');
	    jQuery('#product_review_tab_contents').show();
    });
    
}); // end ready