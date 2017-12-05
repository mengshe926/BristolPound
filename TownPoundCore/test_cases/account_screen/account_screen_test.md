| Test case id |
|:------------:|
|    BRP0005   |

# Idea:

Usage of the _Account_ screen:
- Display account information  
  + User's photo or placeholder image
  + Full user name
  + Username
  + Email (if provided)
  + Phone (if provided)
- Logout functionality
- Hidden access to Dev Options screen -- for dev/testing purposes

## Out of scope:

- Modify the photo, email or phone
- Friends
- Background image selection
- Change password functionality

## Setup and additional info:

The current behavior of the _Account screen_ is:
1. The first time the App is started after installation, the user is not logged in yet.
  - The _Account screen_ shows a grey background with an icon and the message _Login to view your account details_.
2. The user can login by using the _login_ button in the bottom bar from the following screens:
  - _Search_ screen
  - _Spending_ screen
  - _Account_ screen
3. When the user is logged in:
  - Instead of the _Login_ button, the current BP balance is displayed in the bottom bar.
  - The email and phone are displayed under a _Profile settings_ header, if available; if not, _Not set_ is displayed instead.
  - The _Log out_ button is the only means that the user has to log out and potentially switch to another user.

The Dev Options are hidden and can be unlocked by long pressing the _Account_ screen icon in the bottom bar.
1. The first section is _App State_. It shows:
  - Number of Traders loaded.
  - The timestamp of the Trader list.
  - The number of transactions loaded (only if the user is logged in).
  - The URL of the backend that is is use (either Dev or Prod).
2. The second section is _Developer Actions_. It allows the user to:
  - Clear the cached Trader list.
  - Load the Trader list again.
  - Clear the cached transactions (if the user is logged in).
  - Load the transactions again (if the user is logged in).
  - Switch to the other Server (Stage/Dev).
3. When the Dev Options are closed the app returns to the previous screen.
4. The Dev Options can be opened from the _Search_, _Spending_ and _Account_ screens, as they all have the bottom bar.

For login information, please refer to [logins.md](https://gitlab.com/TownPound/cyclos/ScottLogic.mobile.react-native/BristolPound/blob/master/test_cases/helpers/logins.md)

## Steps / Expected results

| # | Step | Expected result | Comments |
|:-:|:----:|-----------------|----------|
| 1 | Start the app while logged out, and go to the _Account_ screen | The offline screen should appear. |  |
| 2 | Login as any user in Prod. | The photo and information from the user should be displayed. | Check visual specs for details |
| 3 | Logout | The offline screen should appear again, and the balance should be replaced with the _Login_ button in the bottom bar |  |
| 4 | Open the Dev Options screen | Businesses should show a number greater than 0, but Transactions should be 0 | User is logged out |
| 5 | Clear the Business data and load it again | The same number of Businesses should be loaded |  |
| 6 | Switch to Dev, clear all the business data and reload it | A different number of Traders should be loaded (and this can be checked in the _Search_ screen) |  |
| 7 | Close the Dev Options and login to Dev with any user | The information related to the new user is displayed |  |
| 8 | Practice switching from Dev to Prod and back and logging in with different users | The information related to the new user is displayed | Check the amount of Traders and transactions loaded in each case |
