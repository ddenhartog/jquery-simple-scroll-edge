(function($){

$.fn.simpleScrollEdge = function(options)
{
	var settings = $.extend({}, $.fn.simpleScrollEdge.defaults, options);

	return this.each(function()
	{
		var outer_container = document.createElement('div');

		function createEdge(edge_name)
		{
			var element = document.createElement('div');
			element.className = 'simple-scroll-edge-' + edge_name;
			outer_container.appendChild(element);
		}

		if(settings.top_edge)
		{
			createEdge('top');
		}
		if(settings.right_edge)
		{
			createEdge('right');
		}
		if(settings.bottom_edge)
		{
			createEdge('bottom');
		}
		if(settings.left_edge)
		{
			createEdge('left');
		}

		var $this = $(this),
			inner_container = document.createElement('div');
		inner_container.className = 'simple-scroll-edge-inner-container';
		inner_container.style.overflowX = 'scroll';

		outer_container.appendChild(inner_container);

		if($this[0].nodeName == 'TABLE')
		{
			$this.find('th, td').width(settings.th_td_width);
		}
		var $this_html = $this[0].outerHTML;

		var $outer = $(outer_container),
			$inner = $outer.find('.simple-scroll-edge-inner-container');

		if(settings.container_height)
		{
			$inner.height(settings.container_height);
		}

		$inner.html($this_html);
		$this.replaceWith($outer);

		var $child = $inner.children();

		if(settings.right_edge)
		{
			if($child.width() > $inner.width())
			{
				$inner.siblings('.simple-scroll-edge-right').show();
			}
		}
		if(settings.bottom_edge)
		{
			if($child.height() > $inner.height())
			{
				$inner.siblings('.simple-scroll-edge-bottom').show();
			}
		}

		$('.simple-scroll-edge-inner-container').on('scroll', function(){
			var $this = $(this);
			if(settings.top_edge)
			{
				var $top = $this.siblings('.simple-scroll-edge-top');
				if($this.scrollTop() > 0)
				{
					$top.show();
				}
				else
				{
					$top.hide();
				}
			}
			if(settings.right_edge)
			{
				var $right = $this.siblings('.simple-scroll-edge-right');
				if($this.scrollLeft() < ($this[0].scrollWidth - $this.width()))
				{
					$right.show();
				}
				else
				{
					$right.hide();
				}
			}
			if(settings.bottom_edge)
			{
				var $bottom = $this.siblings('.simple-scroll-edge-bottom');
				if($this.scrollTop() < ($this[0].scrollHeight - $this.height()))
				{
					$bottom.show();
				}
				else
				{
					$bottom.hide();
				}
			}
			if(settings.left_edge)
			{
				var $left = $this.siblings('.simple-scroll-edge-left');
				if($this.scrollLeft() > 0)
				{
					$left.show();
				}
				else
				{
					$left.hide();
				}
			}
		});
	});
};

$.fn.simpleScrollEdge.defaults = {
	top_edge: false,
	right_edge: false,
	bottom_edge: false,
	left_edge: false,
	th_td_width: null,  // Set to E.G. '100' (jQuery defaults to 'px') for use with a TABLE element
	container_height: null  // Required when using top/bottom. == Number (int) of desired 'px'
};

})(jQuery);