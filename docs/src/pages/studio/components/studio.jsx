import { useContext } from "react";
import { useZMKApp, ZMKAppContext } from "@cormoran/zmk-studio-react-hook";
import { connect as connect_serial } from "@zmkfirmware/zmk-studio-ts-client/transport/serial";

export function App() {
  const zmkApp = useZMKApp();

  return (
    <ZMKAppContext.Provider value={zmkApp}>
      <ConnectionButton />
      <DeviceInfo />
    </ZMKAppContext.Provider>
  );
}

function ConnectionButton() {
  const zmkApp = useContext(ZMKAppContext);
  if (!zmkApp) return null;

  const handleConnect = () => zmkApp.connect(connect_serial);

  return zmkApp.isConnected ? (
    <button onClick={zmkApp.disconnect}>Disconnect</button>
  ) : (
    <button onClick={handleConnect}>Connect</button>
  );
}

function DeviceInfo() {
  const zmkApp = useContext(ZMKAppContext);
  if (!zmkApp?.isConnected) return null;
  return <div>Device: {zmkApp.state.deviceInfo?.name}</div>;
}