GED Controller for Kiswe Production
===================================

## Introduction
This application is designed for the production of Kiswe WSOF channel to enhance the user experience.

It includes the main rest page which will be the default view for one of the screens in WSOF broadcast. 

The app also includes the overlay page that will be attached on top of the mobile streaming view, in order to enable interaction.

## Components
This application contains:

### Main rest-page
[http://ged.uwcj.kr:3000/](http://ged.uwcj.kr:3000/)

contains:

- current voting results
- current round number and time information
- fighter's names and images

### Sweep interactive overlay page
A video overlay that the user can tap on and have gamelike experience.
[http://ged.uwcj.kr:3000/interaction/sweep](http://ged.uwcj.kr:3000/interaction/sweep) redirects to empty page.

The interactive page is : [http://ged.uwcj.kr:3000/interaction/sweep/#/sweep](http://ged.uwcj.kr:3000/interaction/sweep/#/sweep)

### Tapping interactive overlay page
[http://ged.uwcj.kr:3000/interaction/tap/tap.html](http://ged.uwcj.kr:3000/interaction/tap/tap.html)

Contains invisible multi-purpose tapping area.

This is the basic template for voting and graph-toggle pages.

### Voting interactive overlay page
[http://ged.uwcj.kr:3000/interaction/vote/vote.html](http://ged.uwcj.kr:3000/interaction/vote/vote.html)

A toggle-mode voting page where user can vote for the other play by a single tap.

Appropriate for 1:1 sports.

The results are aggregated in the database and represented on the main rest page.

### Graph toggle overlay page
[http://ged.uwcj.kr:3000/interaction/ganchor](http://ged.uwcj.kr:3000/interaction/ganchor)

An overlay page containing a button which toggles on / off when tapped the voting history graph,

designed to go over the main rest page.

Tried to model the score / stats page of many PC games (LoL, counterstrike, etc.). 


## Installation

### Installing dependencies
Install the dependencies with the following command:
``` js
npm install

bower install
```

Also the application has Mongodb dependency, so make sure you have a mongod instance running.

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

