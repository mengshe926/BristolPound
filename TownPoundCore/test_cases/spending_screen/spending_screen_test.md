| Test case id | Priority |
|:------------:|:--------:|
|    BRP0004   |     3    |

# Idea:

Usage of the _Spending_ screen:
+ The _Transactions_ tab displays monthly transactions
+ The _Traders & Friends_ tab displays the total amount spent per Trader
+ Older transactions are accessed using the carousel

## Out of scope:

+ Transaction requests/notifications (including _Spending_ icon)
+ Formatting (fonts, colors, margins, etc)
+ Link to _Friend information_ screens
+ Icons related to categories (Trader icons will be displayed when available)
+ _Pending_ transaction state
+ Top up functionality
+ _Trader & friends_ categories
+ Computing received payments in the total for a Trader
+ _Trader & Friends_ tab should be called _Categories_
+ Displaying dates in the carousel up to the user creation date
+ Allowing to quickly navigate to different dates in the carousel without loading all the data in between
+ Message in months with no transactions done

## Setup and additional info:

The current behavior is:
1. When the _Spending_ button is used, the  _Login_ screen appears if the user is not logged already
2. Once logged in, the _Transactions_ tab is selected by default and displays the transactions done on the current month, ordered by date (most recent first)
  + The carousel allows to navigate to other months (by clicking or swiping), up to the first transaction done using the app
  + Below the month name, the balance for that month should appear (only payments are considered at this point)
  + Positive transactions have a different color than payments, and also display the + sign
  + Selecting a transaction for a Trader opens the _Trader information_ screen
  + Each trader displays an icon if there is one available
3. In the _Trader & Friends_ tab we see the list of Traders, along with the total amount spent on each Trader, ordered by amount spent that month
  + Selecting a Trader opens the _Trader Information_ screen

For login information, please refer to [logins.md](https://gitlab.com/TownPound/cyclos/ScottLogic.mobile.react-native/BristolPound/blob/master/test_cases/helpers/logins.md)

## Steps / Expected results
| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Start the app and go to the _Spending_ screen | The _Login_ screen appears | _Login_ screen is temporary |
| 2 | Login to Prod | The _Transactions_ screen displays the information for this month | Transactions from both Traders and Friends can be displayed |
| 3 | Scroll down to the bottom of the transaction list | The oldest transaction is still from this month | Need to find a way to verify the transaction list |
| 4 | Select a transaction | The _Trader information_ screen appears, and includes transactions for that Trader | Transactions done by System or Friends should not be used |
| 5 | Go back to the _Spending_ screen and repeat step 4 for different transactions | The appropriate Trader information is displayed | |
| 6 | Navigate to previous months clicking and swiping | Each month should display the information for that month correctly, or blank for months with no transactions | The limit is the month when the first transaction was done using the app |
| 7 | Repeat step 4 for different transactions on previous months | The appropriate Trader information is displayed | |
| 8 | Go to the _Trader & Friends_ screen | The list of Traders is displayed, ordered by the total amount spent per Trader on the selected month, or blank on months with no transactions | Received payments are not included in the total |
| 9 | Select one of the Traders | The _Trader information_ screen appears | |
| 10 | Repeat step 9 for different Traders | The appropriate Trader information is displayed | |
| 11 | Navigate to previous months clicking and swiping | The appropriate Trader list is displayed | |
| 12 | Select different Traders on previous months | The appropriate Trader information is displayed | |
