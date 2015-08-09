<?php
// heder
//header('Content-Type:text/html;charset=utf-8');

require_once('twitteroauth/twitterOAuth.php');
require_once('config.php');

define("DEBUG", 0);

mb_internal_encoding('UTF-8');
mb_regex_encoding(mb_internal_encoding());


/**
 * generate a list of tweets from twitter REST API
 */
class TweetsList
{
	protected $data;

	public function __construct()
	{
		if (CONSUMER_KEY == '' ||
			CONSUMER_SECRET == '' ||
			ACCESS_TOKEN == '' ||
			ACCESS_TOKEN_SECRET == '') {
			error_log("Couldn't read configs.");
			exit();
		}
		$options = array(
			'exclude_replies' => 'true',
			'count' => 10,
			'user_id=' => USER_ID,
		);
		$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);

		$this->data = $connection->oAuthRequest('https://api.twitter.com/1.1/statuses/user_timeline.json', $options, 'GET');
	}

	public function get_data()
	{
		return $this->data;
	}

//    protected function convertTime($timestr)
//    {
//        $timestamp = strtotime($timestr);
//        $timestamp += (9 * 60 * 60);
//        return date('Y-m-d H:i:s', $timestamp);
//    }

//    protected function createURLLink($text) {
//        $text = mb_ereg_replace('(https?://[a-zA-Z0-9\-_\.\/]+)', '<a href="\\1" target="_blank">\\1</a>', $text);
//        return $text;
//    }

//    protected function createReplyLink($text) {
//        $text = mb_ereg_replace('@([\w_]+)', '<a href="http://twitter.com/\\1" target="_blank">@\\1</a>', $text);
//        return $text;
//    }

//    protected function createTagLink($text) {
//        $text = mb_ereg_replace('#([\w_]+)', '<a href="http://twitter.com/#search?q=%23\\1" target="_blank">#\\1</a>', $text);
//        return $text;
//    }

}

/**
 * execution
 */

$list = new TweetsList();
echo $list->get_data();

?>
