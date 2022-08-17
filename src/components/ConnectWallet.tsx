import { FC } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
//import { Container } from './Container';
import Cookies from "universal-cookie";

type Visibility = "always" | "connected" | "not_connected";

const cookies = new Cookies();
/**
const triggerText = "Open form";
const onSubmit = (event) => {
  event.preventDefault(event);
  console.log(event.target.name.value);
  console.log(event.target.email.value);
}; */

const ConnectWallet: FC<{ show?: Visibility }> = ({ show = "always" }) => {
  const { address, isConnected } = useAccount();
  console.log(address);
  cookies.set("walletAddress", address, { path: "/" });
  if (
    (show == "connected" && !isConnected) ||
    (show == "not_connected" && isConnected)
  )
    return null;
  return (
    <>
      <ConnectKitButton />
    </>
  );
};

export default ConnectWallet;
