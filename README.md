GED Controller for Kiswe Production
===================================

## Introduction
This application is designed for the production of Kiswe WSOF channel to enhance the user experience.

It includes the main rest page which will be the default view for one of the screens in WSOF broadcast. 

The app also includes the overlay page that will be attached on top of the mobile streaming view, in order to enable interaction.


## Installation

### Installing dependencies
Install the dependencies with the following command:
``` js
npm install

bower install
```

### Twitter app
Use [apps.twitter.com](https://apps.twitter.com) to register and retrieve the app keys.

Create a file `keys.js` and insert the app keys as follows:

```js

module.exports = {
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  ''
};

```

For more information, refer to [Twit](https://github.com/ttezel/twit), which is the module used in this application..


## API


## Implementation Details
Twitter Feed appears in the following logic :
- Each feed appears for 5 seconds and disappears.
- If multiple feeds are received within 5 seconds, they are stacked in queue.
- If the 5-element queue is full when another feed arrives, the feed is ignored.
- Each feed that are pushed to the queue is guaranteed 5 seconds appearance.
