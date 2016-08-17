GED Controller for Kiswe Production
===================================

## Introduction

This set of program is designed for Kiswe Production, to enhance the user experience while streaming live events on Kiswe app.

Particularly this version of program is targeted for streaming the WSOF broadcast. 

It includes the main rest page('/') which will be the default view for one of the screens in the WSOF broadcast. 

The app also includes the overlay page that will be attached on top of the mobile streaming view, in order to enable user interaction.

## Components
This application contains:

### [The main rest page ('/')](http://ged.uwcj.kr/)

contains:

- current voting results
- current round number and time information
- fighter's names and images

### Sweep interactive overlay page
A video overlay that the user can tap on and have gamelike experience.

[http://ged.uwcj.kr:3000/interaction/sweep](http://ged.uwcj.kr:3000/interaction/sweep) 

redirects to empty page.

The interactive page is : [http://ged.uwcj.kr:3000/interaction/sweep/#/sweep_icon](http://ged.uwcj.kr:3000/interaction/sweep/#/sweep_icon)

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



### index
| Description                      | Verb   | URI                                 | Old URI|
|----------------------------------|--------|-------------------------------------|--------|
| get the rest page                | Get    | /                                   |        |
| get the sweep overlay page       | Get    | /overlay/sweep/                     |        |
| get the tap(punch) overlay page  | Get    | /overlay/tap/                       |        |
| get the vganchor overlay page    | Get    | /overlay/vganchor/                  |        |

### power

DEPRECATED


### votes

| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| Change the number of votes       | Post   | /votes/set/:devinUp/:tomUp          | |
| vote status and game status      | Get    | /votes/get                          | |
| to be deprecated                 | Post   | /votes/gameGoingOn/:bool            | |


### timer

| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| Change the Round Number          | Post   | /timer/setRoundNo/:roundNo          |         |
| Change the CountdownNo in seconds| Post   | /timer/setCount/:cd                 | /timer/timerCmd/setCountdown/:countdown |
| Change the game running status   | Post   | /timer/start                        | /votes/gameGoingOn/:bool            |
| Change the game running status   | Post   | /timer/stop                         | /votes/gameGoingOn/:bool            |
| Change the game running status   | Post   | /timer/reset                        | /votes/gameGoingOn/:bool            |

### sweep

| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| set the sweep page to empty      | Post   | /sweep/setEmpty                     |         |
| open up the sweep page by PAGENUM| Post   | /sweep/setSweep/:pageNum            |         |


### punch 

| Description                      | Verb   | URI                            |
|----------------------------------|--------|--------------------------------|
| Change the punch counts          | Post   | /punch/:fighter1/:fighter2     |
| Get the punch counts             | Get    | /punch                         |





## Implementation Details
Twitter Feed on the rest page appears in the following logic :
- Each feed appears for 5 seconds and disappears.
- If multiple feeds are received within 5 seconds, they are stacked in queue.
- If the 5-element queue is full when another feed arrives, the feed is ignored.
- Each feed that are pushed to the queue is guaranteed 5 seconds appearance.

