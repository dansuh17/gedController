GED Controller for Kiswe Production
===================================

## Introduction

This set of program is designed for Kiswe Production, to enhance the user experience while streaming live events on Kiswe app.

Particularly this version of program is targeted for streaming the WSOF broadcast. 

It includes the main rest page('/') which will be the default view for one of the screens in the WSOF broadcast, as well as the overlay page that will be attached on top of the mobile streaming view, in order to enable user interaction.

## Components
This application contains:

### [The main rest page ('/')](http://ged.uwcj.kr/)

contains:

- current voting results
- current round number and time information
- fighter's names and images

### Interactive Overlay page

#### [Sweep ('overlay/sweep/')](http://ged.uwcj.kr/overlay/sweep/)

The sweep overlay enables the user to sweep over to move objects.

This version is particularly designed for the advertisement of Alienware.

The default is to show the empty page, and a socket call brings up the view.

The interactive page can be viewed [here](http://ged.uwcj.kr/overlay/sweep/#/sweep_icon)


#### [Punch Tapping ('overlay/tap/')](http://ged.uwcj.kr/overlay/tap/)

The punch overlay contains multi-purpose tapping area.

Every tap increases the punch count that is shown in the graph overlay.


#### [Vote and Graph toggle](http://ged.uwcj.kr/overlay/vganchor/)

This overlay is targeted for the last pip that will show the rest page via OBS.

We benchmarked the score/stats page shown in many PC games such as LoL and Counterstrike.

The Vote and Graph overlay contains buttons for graph, vote, and betting.

The aggregate of the votes will be shown as power bar in the rest page.


## Installation

### Installing dependencies
Install the dependencies with the following command:
``` sh
npm install

bower install
```

Also the application has Mongodb dependency, so make sure you have a mongod instance running.

The mongod can run in background by the command 
`mongod --fork --logpath [logpath]`

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


### overlay 
For turning the overlay on/off

| Description                      | Verb   | URI                                 |  Data   |
|----------------------------------|--------|-------------------------------------|---------|
| get the sweep overlay page       | Get    | /overlay/sweep/                     |         |
| get the tap(punch) overlay page  | Get    | /overlay/tap/                       |         |
| get the vote/graph anchor page   | Get    | /overlay/vganchor/                  |         |
| change the sweep page            | Post   | /overlay/sweep/                     | { page : [ 1, 2, 3, empty] } |
| change the tap/punch page        | Post   | /overlay/tap/                       | { page : [ on, empty ] }     |
| change the vote/graph anchor page| Post   | /overlay/vganchor/                  | { page : [ on, empty] }      |
| TO BE DEPRECATED                 | Post   | /overlay/setPunchEmpty              |         |
| TO BE DEPRECATED                 | Post   | /overlay/setGanchorEmpty            |         |
| TO BE DEPRECATED                 | Post   | /overlay/setEmpty                   |         |


### votes
| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| Change the number of votes       | Post   | /votes/                             |         |
| vote status and game status      | Get    | /votes/                             |         |


### punch 
| Description                        | Verb   | URI       |
|------------------------------------|--------|-----------|
| Post punch counts for fighter1, 2  | Post   | /punch/   |
| Get punch counts for fighter1, 2   | Get    | /punch/   |




### timer
| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| Change the Round Number          | Post   | /timer/setRoundNo/:roundNo          |         |
| Change the CountdownNo in seconds| Post   | /timer/setCount/:cd                 |         |
| Change the game running status   | Post   | /timer/start                        |         |
| Change the game running status   | Post   | /timer/stop                         |         |
| Change the game running status   | Post   | /timer/reset                        |         |



### power

DEPRECATED

## Implementation Details
Twitter Feed on the rest page appears in the following logic :
- Each feed appears for 5 seconds and disappears.
- If multiple feeds are received within 5 seconds, they are stacked in queue.
- If the 5-element queue is full when another feed arrives, the feed is ignored.
- Each feed that are pushed to the queue is guaranteed 5 seconds appearance.

