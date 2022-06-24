import * as React from "react";
import useStore from "../hooks/useStore";
import Webview from "../components/WebView";

export default function Grid() {
  const { ship, shipUrl } = useStore();

  return <Webview ship={ship} shipUrl={shipUrl} url={`${shipUrl}/apps/grid/`} />;
}
