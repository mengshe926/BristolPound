## Goal

- This document provides the instructions required to get the list of existing users that can be used for testing, as well as providing some examples.
- It also provides the instructions required to create new users / Traders (in Dev).

## Environments

There are currently 2 backend environments in the Bristol Pound project:
- Dev: https://bristol.cyclos.org/bristolpoundsandbox03/
- Prod (Staging): https://bristol-stage.community-currency.org/cyclos/

In order to login with a user, you can click on the _Sign in_ (Dev), or _Login to your account_ (Prod) links, located on the top right corner of each page.

## Getting the list of users in Dev

In order to get the full list of existing users in the Dev environment:

1. Login to Dev as user _Admin1/***REMOVED***_ and click on the _Users_ tab.
2. Select _Individual Members_ in the _Groups_ field.
3. Select _Active_ in the _Status_ field.
4. Click on the _Search_ button. The full list of users appears below.
5. Click on a user in order to get information about it.
  * The password for most test users is _***REMOVED***_.
  * The _User Id_ (name of the user in the app) can be found in the _Login name_ field.
  * There are many more details about the user, like activation date, connection status, email, phone, etc.

  __Notes:__
  - Emails and phones should not be real, if at all defined.
  - User _Admin1_ should not be used in the app.

__User examples from Dev__

The following list contains some of the users available in Dev. Please follow the steps above to get the most recent list.

| User | Password | Name | Comments |
|------|----------|------|----------|
| test1 | ***REMOVED*** | Test One | Many transactions every month since June 2016 |
| ftuser | ***REMOVED*** | First Time User | User with no transactions (used for testing new users) |
| pshek | ***REMOVED*** | Paulin Shek | Developer account; few transactions every month since Aug 2016 |
| ithake | ***REMOVED*** | Ian Thake | No transactions in Aug 2016 |
| test2-6 | ***REMOVED*** | Test _number_ | Similar to test1; some have months with no transactions |
| saberking | ***REMOVED*** | Saber King | Developer account; similar to pshek |
| csettle | ***REMOVED*** | Connor Settle | Developer account; similar to pshek |

## Getting the list of users in Prod:

At the moment there are no available admin users for Prod. The available users are:

| User | Password | Name | Comments |
|------|----------|------|----------|
| testmember | ***REMOVED*** | Test Member | Transactions since Sep 2016 |
| grahamwoodruff | ***REMOVED*** | Graham Woodruff | Has many transactions since July 2012 |

## Creating a new user in Dev:

In order to create a new test user in Dev:

1. Login to Dev as user _Admin1/***REMOVED***_ and click on the _Users_ tab.
2. Select _Individual Members_ in the dropdown from the _New_ button.
3. Fill the _Name_, _Login name_ and _E-mail_ fields.
4. Leave _Send activation email_ unchecked and click on the _Save and open profile_ button.
5. Click on _Passwords_, under the _User management_ section of the user profile.
6. Create a new password for the user (***REMOVED*** to make it simple).

## Adding new Traders in Dev:

In order to add a new Trader in Dev:

1. Login to Dev as user _Admin1/***REMOVED***_ and click on the _Users_ tab.
2. Select _Business Members_ in the dropdown from the _New_ button.
3. Fill the details, including the Address, and leave _Send activation email_ unchecked. The Description field will show information about the Trader in the app.
  * Note: use fake emails and phones, but real Addresses.
4. Click on the _Save and open profile_ button.
5. Edit the Trader profile, and click on the _Addresses_ tab. Edit the address, leaving _Private_ unchecked, and save the changes. Now the Trader will be visible in the app.
