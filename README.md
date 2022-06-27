# Urbit Mobile App Template

This project is meant to be used as a template for building a mobile app wrapper for urbit apps.

The template is based on [Expo](https://docs.expo.dev/).

## How to Use

### Modify Code

In order for this app to work correctly, you must update the following:

1. The constant `APP_ROUTE` and `APP_TITLE` in `/src/util/constants.ts` should match the name of your app route (i.e. `landscape`)
2. Update the image files in `/assets`
3. Update `package.json` and `app.json` with your app name, `package` (Android), and `bundleIdentifier` (iOS)

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
2. The push notification must be sent with a `data` payload with a way to navigate the user to the correct page in the web app. Usually this means a `redirect` and a `ship` value [as shown here](https://github.com/uqbar-dao/urbit/blob/escape/pkg/escape/app/push-notify.hoon#L204)
3. There must be a handler in the mobile app to handle the user tapping on the notification (already included in this template).
4. You must [follow the guide to set up push notifications](https://docs.expo.dev/push-notifications/push-notifications-setup/#credentials) with Google's Firebase Cloud Messaging (FCM) and Apple Push Notification Services (APNS)
