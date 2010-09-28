// ==UserScript==
// @name        Twitter Unread Notifier
// @namespace   http://fluidapp.com
// @description Display unread count for Twitter in dock with a Growl notification every few minutes
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @include     http://*.twitter.com/*
// @include     https://*.twitter.com/*
// @include     http://twitter.com*
// @include     http://twitter.com/home
// @author      Mike Robinson
// @homepage    http://twitter.com/akamike
// ==/UserScript==

(function () {
  if(window.fluid) {
    var unread = lastGrowl = 0;

    /*
     * Dock badge, runs every 1 second
     */
    var dockInterval = window.setInterval(function(){
      var unreadChange = document.title.match(/\d+/);

      if (unreadChange) {
        if (unreadChange[0] > unread) {
          unread = unreadChange[0];
          window.fluid.dockBadge = unread;
        }
      } else if (unread != 0) {
        window.fluid.dockBadge = '';
        unread = lastGrowl = 0;
      }
    }, 1000);

    /*
     * Growl notification, runs every 10 minutes
     */
    var growlInterval = window.setInterval(function(){
      if (lastGrowl != unread) {
        lastGrowl = unread;

        window.fluid.showGrowlNotification({
          title:       'Twitter',
          description: unread + ' unread tweets',
          priority:    1,
          sticky:      false,
          identifier:  'twitter_unread'
        });
      }
    }, 600000);
  }
})();