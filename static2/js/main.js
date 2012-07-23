"use import";

from util.browser import $;

var el = $.id('content');

var el2 = $({
	text:'hello',
	parent: el,
});

logger.log('main loaded');