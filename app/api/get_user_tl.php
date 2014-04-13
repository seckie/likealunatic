<?php
// heder
//header('Content-Type:text/html;charset=utf-8');

// define
define("DEBUG", 0);
define('TWITTER_USER_NAME', 'seckie_');

mb_internal_encoding('UTF-8');
mb_regex_encoding(mb_internal_encoding());


/**
 * generate a list of tweets from twitter REST API
 */
class TweetsList
{
	public function __construct()
	{
		/*
		if (count($_GET) === 0) {
			return false;
		}
		$params = "";
		foreach ($_GET as $param=>$value) {
			$params .= $param . '=' . htmlentities($value) . '&';
		}
		$xmlpath = 'http://api.twitter.com/1/statuses/user_timeline.xml?' . $params;
		 */
		$xmlpath = 'http://api.twitter.com/1/statuses/user_timeline.xml?exclude_replies=true&' . 'id=' . TWITTER_USER_NAME;
		$xml = simplexml_load_file($xmlpath);

		$count = 0;
		foreach ($xml->status as $val){
			$text = $val->text;
			$text = $this->createURLLink($text);
			$text = $this->createReplyLink($text);
			$text = $this->createTagLink($text);

			$b = mb_ereg_search_init(strval($val->source), 'Instagram');
			$instagram = mb_ereg_search();

			$html = '<div class="tweet tweet';
			$html .= $count;
			$html .= '">';
			$html .= '<div class="img">';
			$html .= '<a href="http://twitter.com/';
			$html .= $val->user->screen_name;
			$html .= '" target="_blank">';
			if ($instagram) {
				$html .= '<img src="/libs/social-media-icons/32px/instagram.png';
			} else {
				$html .= '<img src="/libs/social-media-icons/32px/twitter.png';
			}
//            $html .= $val->user->profile_image_url;
			$html .= '">';
			$html .= '</a>';
			$html .= '</div>';
			$html .= '<div class="content">';
			$html .= '<div class="contentInner">';
			$html .= '<div class="contentInner2">';
			$html .= '<p class="text">';
			$html .= $text;
			$html .= '</p>';
			$html .= '<div class="footer">';
			$html .= '<p class="author">';
			$html .= '<a target="_blank" href="http://twitter.com/';
			$html .= $val->user->screen_name;
			$html .= '">';
			$html .= $val->user->screen_name;
			$html .= '</a>';
			$html .= '</p>';
			$html .= '<p class="date">';
			$html .= '<a href="http://twitter.com/';
			$html .= $val->user->screen_name;
			$html .= '/status/';
			$html .= $val->id;
			$html .= '" target="_blank">[';
			$html .= $this->convertTime($val->created_at);
			$html .= ']</a>';
			$html .= '</p>';
			$html .= '</div></div></div></div></div>';
			echo $html;
			$count ++;
		}
	}

	protected function convertTime($timestr)
	{
		$timestamp = strtotime($timestr);
		$timestamp += (9 * 60 * 60);
		return date('Y-m-d H:i:s', $timestamp);
	}

	protected function createURLLink($text) {
		$text = mb_ereg_replace('(https?://[a-zA-Z0-9\-_\.\/]+)', '<a href="\\1" target="_blank">\\1</a>', $text);
		return $text;
	}

	protected function createReplyLink($text) {
		$text = mb_ereg_replace('@([\w_]+)', '<a href="http://twitter.com/\\1" target="_blank">@\\1</a>', $text);
		return $text;
	}

	protected function createTagLink($text) {
		$text = mb_ereg_replace('#([\w_]+)', '<a href="http://twitter.com/#search?q=%23\\1" target="_blank">#\\1</a>', $text);
		return $text;
	}

}

/**
 * execution
 */

$list = new TweetsList();

?>
