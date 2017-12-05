| Test case id |
|:------------:|
|    BRP0003   |

# Idea:

Usage of the _Search_ screen:
+ Display the map and nearby Traders, represented with custom icons.
+ Display the user's position in the map if Location Services is enabled.
+ Display a Trader list that shows Trader names and t2p names for each of the Traders in the map.
+ Allow the user to select 1 Trader, which:
  - Has a special marker on the map.
  - Is a the top of the Trader list, separated from the rest of the Traders in the list.
  - Is highlighted with a blue line in the Trader list.
+ Provide access to the _Trader information_ screen for each displayed Trader using the Trader list.

## Out of scope:

- _Nearby_ and _Filters_ buttons
- Search functionality. There is a placeholder white box for the Search input box, plus the 2 buttons.
- Suggested recent Friends/Traders
- Making a payment to a user for the first time
- Some refined visuals (fading the map as the Trader list expands, etc).

## Setup and additional info:

The current behavior is:

1. With Network connection and Location Services enabled:
  - When the App starts, the map is centered on the user's location, if the user is in Bristol.
  - When the App starts, the map is centered on a default location in Bristol, if the user is not in Bristol.
  - The user's location is displayed with a blue circle in the map.
  - The Trader closest to the user is selected by default.
2. With Network connection and Location Services disabled:
  - When the App starts for the first time, the App requests the user access to the location, and links to phone Settings if required (iOS only for now).
  - If Location Services are still disabled, the map is centered on a default location in Bristol.
  - No Trader is selected by default.
3. With no Network connection:
  - The behaviour related to Location Services is the same as above.
  - On Android, the map is not loaded, and instead appears blank.
  - On iOS, the map is loaded from cache.
  - A message alerts the user about lack of internet connection.
4. While the App is running:
  - The Traders in the list are ordered by proximity to the center of the Map.
  - The selected Trader is always on top of the list, even if the map is panned/zoomed.
    * It is visible even if no Traders are visible on the map.
  - The Trader list only contains the Traders visible on the map. Zooming and panning the map potentially changes the Trader list.
  - Selecting a Trader opens the _Trader information_ screen for that Trader.
    * If the user is logged in, the transactions for that trader are displayed.
  - The Trader list can be pulled up, hiding the map and showing more Traders.
  - At the bottom of the screen a bar appears with buttons that allow the user to access the _Search_, _Spending_, and _Account_ screens, or login.
    * When the user has logged in, the BP balance is displayed instead of the Login button.

For login information, please refer to [logins.md](https://gitlab.com/TownPound/cyclos/ScottLogic.mobile.react-native/BristolPound/blob/master/test_cases/helpers/logins.md)

## Steps / Expected results

| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Disable wifi/data and Location Services. Start the App for the first time. | No Traders are displayed on the map or on the Trader list  | Loss of internet access message should be visible |
| 2 | Stop the App, and enable wifi/data. Start the App again, and do not enable Location Services. | The Traders should be visible in the map and on the list. The map should be centered on a default location in Bristol. | On Android the App doesn't ask to allow access to Location Services. |
| 3 | Stop the App, and enable Location Services. Start the App again. | The map is centered on the user's location only if the user is in Bristol. User's location is visible in the map. The closest Trader to the user is selected. |  |
| 4 | Select some Traders in the map | The selected Trader gets updated on the Trader list. The selected Trader displays a special marker in the map. | On Android, selecting a Trader in the map centers the map on the Trader's position, but not on iOS. |
| 5 | Do pan/zoom operations in the map | The Trader list should be reordered depending on which Traders are visible on the map. |  |
| 6 | Expand the Trader list by pulling up/down. | When the list is expanded most of the map is covered and can't be used until it's back in the collapsed position | |
| 7 | Select a Trader in the Trader list | The _Trader Information_ screen appears, and displays all the details of the Trader, but no transactions | Close the _Trader Information_ screen to go back to the _Search_ screen. Selecting a Trader in the list also makes it the selected Trader. |
| 8 | Login | The _Login_ button gets replaced with the BP balance for the user. |  |
| 9 | Select a Trader in the list | The _Trader Information_ screen now shows fewer details, but shows all the transactions done by the user to that Trader | The amount of information of each Trader depends on the backend |
| 10 | Zoom and pan the map in order to display 4, 3, 2, 1 and 0 Traders | Confirm that the Trader list behaves as in the specs |  |
