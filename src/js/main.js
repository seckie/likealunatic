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

const STYLESHEET_DIRECTORY = window.STYLESHEET_DIRECTORY || '';

// add CSS rule to hide default contents
var mysheet = document.styleSheets[0];
var totalrules = mysheet.cssRules ? mysheet.cssRules.length : mysheet.rules.length;
if (mysheet.insertRule) {
  mysheet.insertRule('div.contents-index {visibility: hidden}', totalrules);
} else if (mysheet.addRule) { //for msie
  mysheet.addRule('div.contents-index', 'visibility: hidden');
}

/**
 * Twitter user timeline list
 */

var TwitterUserTimeline = function (options) {
  // extend default options
  this.opt = {
    jsonURL: '',
    el: document.body,
    complete: function () {}
  };
  $.extend(this.opt, options);
  this.$el = $(this.opt.el);
  // initialize
  this.initialize();
};
TwitterUserTimeline.prototype = {
  initialize: function () {
    var self = this;
    this.count = 0;

    $.ajax(this.opt.jsonURL, {
      success: function (data) {
        var html = '';
        if (typeof data === 'string') {
          data = $.parseJSON(data);
        }
        //console.log(data);
        for (var i=0,l=data.length; i<l ; i++) {
          html += self.buldItem(data[i]);
        }
        self.$el.html(html);
        self.opt.complete();
      }
    });
  },
  buldItem: function (data) {
    let text = data.text;
    text = this.createURLLink(text);
    text = this.createReplyLink(text);
    text = this.createTagLink(text);
    const isInstagram = () => /Instagram/.test(data.source);
    const iconName = isInstagram() ? 'instagram' : 'twitter';
    const iconAlt = isInstagram() ? 'Instagram' : 'Twitter';
    const html = `
    <div class="tweet tweet${this.count}">
      <div class="img">
        <a href="http://twitter.com/${data.user.screen_name}" target="_blank">
          <img src="${STYLESHEET_DIRECTORY}/libs/social-media-icons/32px/${iconName}.png" alt="${iconAlt}" width="32" height="32" />
        </a>
      </div>
      <div class="content">
        <div class="contentInner">
          <div class="contentInner2">
            <p class="text">${text}</p>
            <div class="footer">
              <p class="author">
                <a target="_blank" href="http://twitter.com/${data.user.screen_name}">
                  ${data.user.screen_name}</a>
              </p>
              <p class="date">
                <a href="http://twitter.com/${data.user.screen_name}/status/${data.id}" target="_blank">
                [${this.convertTime(data.created_at)}]</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    this.count ++;
    return html;
  },
  convertTime: function (timestr) {
    //        var d = new Date(timestr);
    //        d.setHours(d.getHours() + 9);
    //        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return timestr;
  },
  createURLLink: function (text) {
    text = text.replace(/(https?:\/\/[a-zA-Z0-9\-_\.\/]+)/, '<a href="$1" target="_blank">$1</a>');
    return text;
  },
  createReplyLink: function (text) {
    text = text.replace(/@([\w_]+)/, '<a href="http://twitter.com/$1" target="_blank">@$1</a>');
    return text;
  },
  createTagLink: function (text) {
    text = text.replace(/#([\w_]+)/, '<a href="http://twitter.com/#search?q=%23$1" target="_blank">#$1</a>');
    return text;
  }
};



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
    const title = this.title || $(this).find('img').attr('title');
    const titleElement = title ? `<h3>${title}</h3>` : '';
    const content = `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        ${titleElement}
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body"><img src="${this.href}" alt="" /></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    `;
    $box.html(content);
    $box.appendTo(document.body);
    // activate
    $box.modal({
      backdrop: true,
      keyboard: true,
      show: false
    });
    // preload img
    preloadImg(this.href);

    // bind event
    $(trigger).on('click', function (e) {
      $box.modal('toggle');
      //layoutModal($box, $img);
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

