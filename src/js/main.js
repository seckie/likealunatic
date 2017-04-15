'use strict';
/**
 * Scripts for likealunatic.jp
 *
 * @author     Naoki Sekiguchi (http://likealunatic.jp)
 * @copyright  Naoki Sekiguchi (http://likealunatic.jp)
 * @require    jQuery JavaScript Framework (http://jquery.com/)
 * @version    1.0
 * @since      2012-01-02
 */

import TwitterUserTimeline from './TwitterUserTimeline.js';

// add CSS rule to hide default contents
var mysheet = document.styleSheets[0];
var totalrules = mysheet.cssRules ? mysheet.cssRules.length : mysheet.rules.length;
if (mysheet.insertRule) {
  mysheet.insertRule('div.contents-index {visibility: hidden}', totalrules);
} else if (mysheet.addRule) { //for msie
  mysheet.addRule('div.contents-index', 'visibility: hidden');
}

/**
 * dom ready
 */
$(function () {
  // shuffle and sort
  var $container = $('div.area_bd').find('div.contents-index');

  // Twitter user timeline
  new TwitterUserTimeline({
    el: '.tweets-contents',
    jsonURL: '/api/get_user_tl.php',
    complete: function () {
      $container.sortContents('article, .tweet').remove();
      // masonry
      $('div.area_bd').find('div.contents-index').masonry({
        itemSelector: 'article, .tweet',
        columnWidth: 220,
        gutterWidth: 15,
        isResizable: true,
        animateOptions: {
          complete: function () { }
        }
      });
      // set contents visible
      $('div.area_bd').find('div.contents-index').showVisibility();
    }
  });


  /**
   * control bootstrap-modal
   */
  $('a[href$=".jpg"], a[href$=".gif"], a[href$=".png"]').each(function (i, trigger) {
    if (!trigger.href) { return this; }

    const $box = $('<div class="modal fade" role="dialog"/>');
    const $img = $(this).find('img');
    const title = this.title || $img.attr('title') || $img.attr('alt');
    const titleElement = title ? `<h4 class="modal-title">${title}</h4>` : '';
    const content = `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        ${titleElement}
      </div>
      <div class="modal-body"><img src="${this.href}" alt="" /></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    `;
    $box.html(content).appendTo(document.body).modal({
      backdrop: true,
      keyboard: true,
      show: false
    });

    // preload image
    preloadImg(this.href).then(($img) => {
      const baseWidth = $img.width();
      // set dialog width
      const $modalBody = $box.find('.modal-body');
      const hPadding = parseInt($modalBody.css('padding-left'), 10) + parseInt($modalBody.css('padding-right'), 10);
      $box.find('.modal-dialog').width( baseWidth + hPadding );
    });

    // bind event
    $(trigger).on('click', (e) => {
      e.preventDefault();
      $box.modal('toggle');
    });
  });

  function preloadImg(href) {
    return new Promise((resolve, reject) => {
      const $wrapper = $('<div class="preload-wrapper"/>').css({
        'width': 0,
        'height': 0,
        'overflow': 'hidden',
        'position': 'absolute'
      });
      const $img = $('<img src="' + href + '" alt="" />');
      $img.css('visibility', 'hidden').appendTo($wrapper);
      $wrapper.appendTo(document.body);
      $img.on('load', (e) => {
        resolve($img);
        setTimeout(() => $wrapper.remove(), 500);
      });
    });
  }
  /*
  function layoutModal($box, $img) {
    var imgWidth = $img.width();
    var imgHeight = $img.height();
    var winHeight = $(window).height();

    // when a large image overflow from window
    if (winHeight < imgHeight + 30) {
      $box.css({
        'position': 'absolute',
        'top': (document.documentElement.scrollTop || document.body.scrollTop) + (winHeight / 2)
      });
    }

    $box.css({
      'width': imgWidth + 30,
      'margin-top': -1 * Math.min(winHeight / 2, (imgHeight + 60) / 2),
      'margin-left': -1 * (imgWidth + 30) / 2
    });
  }
  */
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

