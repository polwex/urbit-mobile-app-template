import React, { useState, useEffect } from "react";
import { WebViewMessageEvent } from "react-native-webview";
import * as Notifications from 'expo-notifications';

import useStore, { ShipConnection } from "../hooks/useStore";
import Webview from "../components/WebView";
import { StyleSheet, View } from "react-native";
import { getNotificationData, getPushNotificationToken } from "../util/notification";
import { deSig, samePath } from "../util/string";
import { APP_ROUTE } from "../constants/App";

interface WrappedAppWindowProps {
  shipConnection: ShipConnection;
  pushNotificationsToken: string;
  androidHardwareAccelerationDisabled?: boolean;
}

function WrappedAppWindow({
  shipConnection,
  pushNotificationsToken,
  androidHardwareAccelerationDisabled = false
}: WrappedAppWindowProps) {
  const { ship: selectedShip, removeShip, setCurrentPath } = useStore();
  const { ship, shipUrl, path, currentPath } = shipConnection;

  // Note: this is for handling events sent from the web app specifically for the moble app
  // Example here: https://github.com/uqbar-dao/urbit/blob/escape/pkg/interface/src/logic/lib/reactNative.ts
  const onMessage = (event: WebViewMessageEvent) => {
    const { type, pathname } = JSON.parse(event.nativeEvent.data);

    if (type === 'navigation-change') {
      setCurrentPath(ship, `/apps/${APP_ROUTE}${pathname}`);
    } else if (type === 'logout') {
      removeShip(ship);
    }
  };

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        const { redirect, targetShip } = getNotificationData(notification);

        if (deSig(targetShip) === deSig(selectedShip) && samePath(`/apps/${APP_ROUTE}${redirect}`, currentPath)) {
          return { shouldShowAlert: false, shouldPlaySound: false, shouldSetBadge: false };
        }

        return { shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true };
      },
    });
  }, [currentPath, selectedShip]);

  const url = `${shipUrl}${path || `/apps/${APP_ROUTE}/`}`.toLowerCase();
  
  return <Webview {...{ url, shipUrl, onMessage, androidHardwareAccelerationDisabled, pushNotificationsToken, ship }} />;
}

export default function WrappedApp() {
  const { ship, ships } = useStore();
  const [token, setToken] = useState('');

  useEffect(() => {
    getPushNotificationToken()
      .then((token) => {
        if (token) {
          setToken(token);
        }
      })
      .catch(console.error);
  }, []);

  return <>
    {ships.map((s) => <View key={s.ship} style={s.ship === ship ? styles.primary : {}}>
      <WrappedAppWindow shipConnection={s} pushNotificationsToken={token} androidHardwareAccelerationDisabled={s.ship !== ship} />
    </View>)}
  </>;
}

const styles = StyleSheet.create({
  primary: {
    width: '100%',
    height: '100%',
  },
});
