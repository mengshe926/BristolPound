| Test case id | Priority |
|:------------:|:--------:|
|    BRP0002   |     4    |

| Created (date)  |  Name  |    Reason   |
|:---------------:|:------:|:-----------:|
|   15/09/2016    | Carlos | First draft |
| Modified (date) |  Name  |    Reason   |
|                 |        |             |
|                 |        |             |

# Idea:

On the _Transactions_ screen, the app should log the user out once the user session expires

## Out of scope:

## Setup and additional info:

This test refers to bug id 1. Bug_tracking.xlsx can be found at:

https://drive.google.com/drive/folders/0B7a3r2dcO6bWU3NObVJJNFRsYVU

As a summary:
 + Accesing the  _Transactions_ page requires a user login
 + The session expires after the app is inactive for some time (~ 7 min)
 + If the user then tries to refresh by pulling down, the _Loading_ icon appears and never disappears
 + When the app is run in the emulator, a warning message can also be seen (see Warning_while_scrolling_up_in_the_transactions_page.jpg in the previous link)

If the user is logged out once the session expires, this problem can be avoided.

Some sample test users are:
* __pshek/***REMOVED***__
* __test1/***REMOVED***__

## Steps / Expected results
| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Open the app | The _Search_ page appears | User is not logged in yet |
| 2 | Go to the _Transactions_ page | The _Login_ page should appear | Login is required only once |
| 3 | Login (only once) | The _Transactions_ page displays transactions for that user | |
| 4 | Wait for 7 minutes or more | The app should log the user out | The 7 minute figure is an approximation |
