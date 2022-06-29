# Urbit Mobile App Template

This project is meant to be used as a template for building a mobile app wrapper for urbit apps.

The template is based on [Expo](https://docs.expo.dev/).

## Get Started

1. Install Expo with `npm install -g expo-cli`.
2. Install dependencies with `expo install`.

## How to Use

### Modify Code

In order for this app to work correctly, you must update the following:

1. The constants `APP_ROUTE` and `APP_TITLE` in `/src/constants/App.ts` should match the name of your app route ("landscape") and app name ("Groups") respectively.
2. The regular expressions `TARGET_APP_URL_REGEX` and `DISTRO_SHIP` in `/src/constants/Webview.ts` should match the name of your app route and distro ship respectively.
3. Update the image files in `/assets`.
4. Update `package.json` and `app.json` with your app name, `package` (Android), and `bundleIdentifier` (iOS). You will specify the `package` and `bundleIdentifier` when setting up your app in the Google Play Store and the iOS App Store.

### Development

The easiet way to do development is to run `expo start`, install the Expo Go app on your phone, and then follow the instructions to download and run the dev version of your app. The app should have hot reloading by default.

### Prepare for Release

Follow the [Expo Distribution Guide](https://docs.expo.dev/distribution/introduction/).

### Key Sections

- The Login screen which authenticates with an urbit instance
- The Webview in which the urbit web app is rendered
- The Header which allows navigation to Grid
- The Ships screen which allows for logging in with multiple ships

### Additional Features

- Auto-prompt user to install the urbit app if it is not installed
- Push notification support

### Push Notifications

Sending and using push notifications requires some additional work on the urbit side.
See https://github.com/uqbar-dao/urbit/blob/escape/pkg/escape/app/push-notify.hoon for an example.

Specifically:
1. The push notification token must be stored on the urbit ship (using in `settings-store`). Your urbit app's web UI must expose an API object [attached to the window](https://github.com/uqbar-dao/urbit/blob/escape/pkg/interface/src/logic/api/index.ts#L6).
2. The push notification must be sent with a `data` payload with a way to navigate the user to the correct page in the web app. Usually this means a `redirect` and a `ship` value [as shown here](https://github.com/uqbar-dao/urbit/blob/escape/pkg/escape/app/push-notify.hoon#L204).
3. There must be a handler in the mobile app to handle the user tapping on the notification (already included in this template).
4. You must [follow the guide to set up push notifications](https://docs.expo.dev/push-notifications/push-notifications-setup/#credentials) with Google's Firebase Cloud Messaging (FCM) and Apple Push Notification Services (APNS).

### Notes on Publishing to the App Store

The author of this repo went through a little back-and-forth with App Store review when initially publishing. At first they said that it looked like an internal app so the App Store wasn't the right place. I had to put in a logo in order to get around that. I supplied a moon's URL and the +code to log in for testing purposes, but they said that it was weird that I was supplying a URL to log in and was I sure that the App Store is the right place for this? I then replied and said that all prospective users had their own servers, the potential user base was both large and sophisticated, and that all of this was a big part of the app experience which the target users would understand.

### Contact

Post any questions in the [Uqbar urbit group](web+urbitgraph://group/~hocwyn-tipwex/uqbar-event-horizon) in the [help channel](web+urbitgraph://group/~hocwyn-tipwex/uqbar-event-horizon/graph/~hocwyn-tipwex/help-5285).
