
# Introduction

# Router

| Description                      | Verb   | URI                                 | Old URI|
|----------------------------------|--------|-------------------------------------|--------|
| Authentication - basic           | Get    | /                                   |        |

## power

DEPRECATED


## votes

| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| Change the number of votes       | Post   | /votes/set/:devinUp/:tomUp          | /votes/votesChange/:devinUp/:tomUp:/:gameGoingOn |
| vote status and game status      | Get    | /votes/get                          | /votes/getCurrentWinning        |
| to be deprecated                 | Post   | /votes/gameGoingOn/:bool            |


## timer

| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| Change the Round Number          | Post   | /timer/setRoundNo/:roundNo          |         |
| Change the CountdownNo in seconds| Post   | /timer/setCount/:cd                 | /timer/timerCmd/setCountdown/:countdown |
| Change the game running status   | Post   | /timer/start                        | /votes/gameGoingOn/:bool            |
| Change the game running status   | Post   | /timer/stop                         | /votes/gameGoingOn/:bool            |
| Change the game running status   | Post   | /timer/reset                        | /votes/gameGoingOn/:bool            |

## sleep

| Description                      | Verb   | URI                                 |         |
|----------------------------------|--------|-------------------------------------|---------|
| set the sweep page to empty      | Post   | /sweep/setEmpty                     |         |
| open up the sweep page by PAGENUM| Post   | /sweep/setSweep/:pageNum            |         |





## punch 

| Description                      | Verb   | URI             |
|----------------------------------|--------|-----------------|
| Change the punch counts          | Post   | /punch          |
| Get the punch counts             | Get    | /punch          |



# Socket Interface

