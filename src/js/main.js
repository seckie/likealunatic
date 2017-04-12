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


// add CSS rule to hide default contents
var mysheet = document.styleSheets[0];
var totalrules = mysheet.cssRules ? mysheet.cssRules.length : mysheet.rules.length;
if (mysheet.insertRule) {
  mysheet.insertRule("div.contents-index {visibility: hidden}", totalrules);
} else if (mysheet.addRule) { //for msie
  mysheet.addRule("div.contents-index", "visibility: hidden");
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
}
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
        console.log(data);
        for (var i=0,l=data.length; i<l ; i++) {
          html += self.buldItem(data[i]);
        }
        self.$el.html(html);
        self.opt.complete();
      }
    });
  },
  buldItem: function (data) {
    var text = data.text,
        instagram,
        html,
        count = this.count;
    text = this.createURLLink(text);
    text = this.createReplyLink(text);
    text = this.createTagLink(text);

    instagram = /Instagram/.test(data.source);

    html = '<div class="tweet tweet';
    html += count;
    html += '">';
    html += '<div class="img">';
    html += '<a href="http://twitter.com/';
    html += data.user.screen_name;
    html += '" target="_blank">';
    if (instagram) {
      html += '<img src="/libs/social-media-icons/32px/instagram.png';
    } else {
      html += '<img src="/libs/social-media-icons/32px/twitter.png';
    }
    html += '">';
    html += '</a>';
    html += '</div>';
    html += '<div class="content">';
    html += '<div class="contentInner">';
    html += '<div class="contentInner2">';
    html += '<p class="text">';
    html += text;
    html += '</p>';
    html += '<div class="footer">';
    html += '<p class="author">';
    html += '<a target="_blank" href="http://twitter.com/';
    html += data.user.screen_name;
    html += '">';
    html += data.user.screen_name;
    html += '</a>';
    html += '</p>';
    html += '<p class="date">';
    html += '<a href="http://twitter.com/';
    html += data.user.screen_name;
    html += '/status/';
    html += data.id;
    html += '" target="_blank">[';
    html += this.convertTime(data.created_at);
    html += ']</a>';
    html += '</p>';
    html += '</div></div></div></div></div>';

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

