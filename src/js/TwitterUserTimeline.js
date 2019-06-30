'use strict';

const STYLESHEET_DIRECTORY = window.STYLESHEET_DIRECTORY || '';

/**
 * Twitter user timeline list
 */

class TwitterUserTimeline {
  constructor ({jsonURL = '', el = document.body, complete = function () {}}) {
    this.opt = { jsonURL, el, complete };
    this.$el = $(this.opt.el);
    this.initialize();
  }

  initialize () {
    $.ajax(this.opt.jsonURL, {
      success: (data) => {
        const dataset = typeof data === 'string' ? JSON.parse(data) : data;
        let html = dataset.reduce((str, current, i) => {
          return str + this.buildItem(current, i);
        }, '');
        this.$el.html(html);
        this.opt.complete();
      }
    });
  }

  buildItem (data, i) {
    let text = data.text;
    text = this.createURLLink(text);
    text = this.createReplyLink(text);
    text = this.createTagLink(text);
    const isInstagram = () => /Instagram/.test(data.source);
    const iconName = isInstagram() ? 'instagram' : 'twitter';
    const iconAlt = isInstagram() ? 'Instagram' : 'Twitter';
    const html = `
    <div class="tweet tweet${i}">
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
                [${data.created_at}]</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    return html;
  }

  createURLLink (text) {
    return text.replace(/(https?:\/\/[a-zA-Z0-9\-_./]+)/, '<a href="$1" target="_blank">$1</a>');
  }
  createReplyLink (text) {
    return text.replace(/@([\w_]+)/, '<a href="http://twitter.com/$1" target="_blank">@$1</a>');
  }
  createTagLink (text) {
    return text.replace(/#([\w_]+)/, '<a href="http://twitter.com/#search?q=%23$1" target="_blank">#$1</a>');
  }
}

export default TwitterUserTimeline;
