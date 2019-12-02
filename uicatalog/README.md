## Testing UICatalog using wd

The following tests were created to run on iOS' [UICatalog app](https://github.com/appium/ios-uicatalog) from the `appium/ios-uicatalog` repo.

To build the app for testing:
```
git clone https://github.com/appium/ios-uicatalog.git
npm install
```

Then, the apps will be in `UIKitCatalog/build` directory.

Then run the appium tests using
```
npm install
npm run test
```