/**
 * Scripts for likealunatic.jp
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @require    jQuery JavaScript Framework (http://jquery.com/)
 * @version    1.0
 * @since      2012-01-02
 */

;(function($, window, document, undefined) {

// add CSS rule to hide default contents
var mysheet = document.styleSheets[0];
var totalrules = mysheet.cssRules ? mysheet.cssRules.length : mysheet.rules.length;
if (mysheet.insertRule) {
	mysheet.insertRule("div.contents-index {visibility: hidden}", totalrules);
} else if (mysheet.addRule) { //for msie
	mysheet.addRule("div.contents-index", "visibility: hidden");
}

/**
 * dom ready
 */
$(function () {
	// shuffle and sort
	$('div.area_bd').find('div.contents-index')
		.sortContents('article, .tweet').remove();

	// masonry
	$('div.area_bd').find('div.contents-index').masonry({
		itemSelector: 'article, .tweet',
		columnWidth: 220,
		gutterWidth: 15,
		isResizable: true,
		animateOptions: {
			complete: function () {
				$('div.area_bd').find('div.contents-index').showVisibility();
			}
		}
	});

	/**
	 * control bootstrap-modal
	 */
	$('a[href$=".jpg"], a[href$=".gif"], a[href$=".png"]').each(function (i, trigger) {
		if (!trigger.href) { return this; }

		var box = $('<div class="modal fade"/>');
		var content = '<div class="modal-header"><a href="#" class="close">&times;</a>';
		var title = this.title || $(this).find('img').attr('title');
		if (title) {
			content += '<h3>' + title + '</h3>';
		}
        content += '</div>';
		content += '<div class="modal-body">';
		content += '<img src="' + this.href + '" alt="" />';
        content += '</div>';
		box.append(content);
		box.appendTo(document.body);
		// activate
		box.modal({
			backdrop: true,
			keyboard: true
		});
		// preload img
		var img = preloadImg(this.href);

		// bind event
		$(trigger).on('click', function (e) {
			box.modal('toggle')
			layoutModal(box, img);
			e.preventDefault();
		});
	});

	function preloadImg(href) {
		var wrapper = $('<div class="preload-wrapper"/>').css({
			'width': 0,
			'height': 0,
			'overflow': 'hidden',
			'position': 'absolute'
		});
		var img = $('<img src="' + href + '" alt="" />');
		img.hideVisibility().appendTo(wrapper);
		wrapper.appendTo(document.body);
		return img;
	}
	function layoutModal(box, img) {
		var imgWidth = img.width();
		var imgHeight = img.height();
		var winHeight = $(window).height();

		// when a large image overflow from window
		if (winHeight < imgHeight + 30) {
			box.css({
				'position': 'absolute',
				'top': (document.documentElement.scrollTop || document.body.scrollTop) + (winHeight / 2)
			});
		}

		box.css({
			'width': imgWidth + 30,
			'margin-top': -1 * Math.min(winHeight / 2, (imgHeight + 60) / 2),
			'margin-left': -1 * (imgWidth + 30) / 2
		});
	}
	
	
});

/**
 * extend jQuery function
 */

$.fn.hideVisibility = function () {
	this.css({ 'visibility': 'hidden' });
	return this;
};
$.fn.showVisibility = function () {
	this.css({ 'visibility': 'visible' });
	return this;
};

/**
 * sort contents
 */
$.fn.sortContents = function (itemSelector) {
	return this.each(function () {
		var items = $(this).find(itemSelector);
		var newContainer = $(this).clone().empty();
		var dates = [];
		items.each(function (i, item) {
			var text = $(item).find('.date').text();
			$(item).data('date', text);
			dates.push(text);
		});
		dates.sort();
		dates.reverse();

		$.each(dates, function (i, date) {
			items.each(function (j, item) {
				if ($(item).data('date') === date) {
					newContainer.append(item);
				}
			});
		});
		newContainer.insertBefore(this);
	});
};


})(jQuery, this, this.document);
