# Bristol Pound

Hello and welcome to BristolPound!

This project is the official React Native mobile application for the [Bristol Pound](http://bristolpound.org/) local currency. The app is available via the [iOS App Store](https://itunes.apple.com/gb/app/bristol-pound/id1230035185?mt=8), and [Google Play](https://play.google.com/store/apps/details?id=org.bristolpound.mobile.rn.android). This project contains the full application sourcecode.

## Getting Started

To build and run this application you will need a JavaScript development environment (e.g. git, Node, Atom or VSCode) and a Mac or Windows PC.

The first step is to clone this repo. The core functionality of this application is provided by the `TownPoundCore` project, which is included as a sub-mobule. This allows us to build multipel local currency apps from a shared code-base (e.g. Exeter Pound, Bristol Pound). 

You must initialise the git submodule to obtain the shared code.

* `git submodule init`
* `git submodule update`

Following this, to launch and run the app via [Expo](https://expo.io/), execute the following:

```
npm install
npm start
```

This application uses [create-react-native-app](https://github.com/react-community/create-react-native-app), so supports the following:

* `npm start` - launch the app via Expo (on Android or iOS).
* `npm run ios` - launch the app via the iOS emulator.
* `npm run android` - launch the app via an Android device or emulator.

## Contributing

To ensure you have the latest changes within the shared submodule, you can do either of the following: 

`git submodule update --remote` (from the outer repo)

__or__

`git pull origin master` (from within the submodule repo)

__Note:__ leave off the `--remote` to remain checked out at the same commit (listed in the superproject) whilst fetching all the new data.


At first, the submodule will be in a "detached HEAD" state. In order to contribute, check out a branch within the submodule so there will be a working branch tracking the changes. You can then incorporate changes from upstream into the working branch with:

`git submodule update --remote --merge` (from the outer repo)

Changes to the submodule repo can be pushed from within that directory as normal. However, it is important not to push any changes to the superproject (outer repo) without also pushing the submodule, else the commit it references will not be available to other users. This can be avoided by pushing from the outer repo as follows: 

`git push --recurse-submodules=check`

## OS Versions supported

This project supports iOS and Android with the following constraints:

 * Android >=4.4, giving a reach of ~85% of android devices (as of 2017)
 * Support for iOS >=10, this is necessary in order to exclude iPhone 4 which was considered too small

See [#32]([https://gitlab.com/TownPound/Cyclos/ScottLogic.mobile.react-native/TownPoundCore/issues/32) for further details and commentary.


