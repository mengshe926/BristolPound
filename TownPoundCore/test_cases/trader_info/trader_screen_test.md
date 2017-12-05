| Test case id |
|:------------:|
|    BRP0001   |

# Idea:

Usage of the _Trader information_ screen:
1. Display information about the trader (any of the following, in this order):
  - Access point
  - Special offer
  - Address
  - Opening times
  - Phone number
  - Email address
2. If the user is logged in, display transactions done to that Trader as well.
3. If the user is logged in, allow to make a payment to the selected Trader.

## Out of scope:

- _Send Money_ functionality (the button is displayed, and there is some basic functionality, but the feature is not complete).
- Animations in the _Trader information_ page.
- Background map centered on the Trader.
- Loading additional transactions that are not currently cached

## Setup and additional info:

The current behaviour is:

1. The user can open the _Trader information_ screen from the following locations in the app:
  - From the _Search_ screen, by selecting a Trader.
  - From the _Spending_ screen by selecting a transaction; this will show the information from the Trader used in that transaction.
2. Closing the _Trader information_ screen brings the user back to the previous screen.
3. When the user is logged out:
  - The _Trader information_ screen lists all the available information from the Trader in one go.
4. When the user is logged in:
  - The _Trader information_ screen lists a compact version of the available information from the Trader.
    + The first 2 available elements are visible always.
    + If there are more elements, they are replaced by the _View details_ button.
    + Tapping on the _View details_ button expands the rest of the details. Once this is done, the details can't be collapsed again until the App is restarted.
    - The _Trader information_ screen displays all the cached transactions done with that Trader, ordered by date starting on the newest transaction, and with date separators.
    - The _Trader information_ screen has a fixed _Send Money_ button at the bottom of the screen.
5. Each transaction consists of:
  - Date of the transaction (day and month)
  - Transaction id
  - Amount spent/received.
    + Spent money is colored black.
    + Received money is colored orange, and is preceded by a + sign.
6. If a new payment is done to the Trader, the transaction list updates and includes the new transaction.

For login information, please refer to [logins.md](https://gitlab.com/TownPound/cyclos/ScottLogic.mobile.react-native/BristolPound/blob/master/test_cases/helpers/logins.md)

__Note__:
Although the behaviour of the _Trader information_ screen is the same in Dev and Prod, most of the Traders in Prod only have the address populated.
For now it's better to do most of the tests on Dev until Prod is updated.

## Steps / Expected results

| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Start the App while logged out and select several Traders in the _Search_ screen | The _Trader information_ screen shows all the Trader's details and no transactions |  |
| 2 | Login to Dev and select several Traders in the Search_ screen | If the user has no transactions with the Trader, the _Trader information_ screen shows the same information as in 1, but if there are transactions the details should be collapsed (if there are more than 2) | _Eatcake Design_ can be used as an example of Trader with no transactions for user _testmember_ in Dev |
| 3 | Go to the _Spending_ screen and select several transactions from different dates. | The _Trader information_ screen should in this case show transactions always, and have the details collapsed if there are more than 2 |  |
| 4 | Display a Trader with many transactions for the user and scroll up and down the list | The list should be scrollable, and the _Send Money_ button should remain fixed at the bottom of the screen, hiding the bottom bar. The transactions should be displayed in cronological order, separated with date separators (per month)|  |
