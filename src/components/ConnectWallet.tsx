import { FC, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import {
  auth,
  firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  firestoreQuery,
  orderBy,
  setDoc,
  serverTimestamp,
} from "../../firebase";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const getUserInput = () => {
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // updateInfo(walletAddress, name, twitter, telegram);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
      />
      <input
        type="text"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

function writeUserData(walletAddress) {
  const usersRef = doc(firestore, "users", walletAddress);
  getDoc(usersRef).then((snapshot) => {
    if (snapshot.data() !== undefined) {
      console.log("user exists");
      //   cookies.set("setupState", true, { path: "/" });
    } else {
      setDoc(usersRef, {
        updatedAt: serverTimestamp(),
      });
      //   cookies.set("setupState", false, { path: "/" });
      console.log("user created");
    }
  });
}

type Visibility = "always" | "connected" | "not_connected";

// const database = getDatabase();ƒ

const ConnectWallet: FC<{ show?: Visibility }> = ({ show = "always" }) => {
  const { address, isConnected } = useAccount();
  console.log("Current address:", address);
  cookies.set("walletAddress", address, { path: "/" });
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // updateInfo(walletAddress, name, twitter, telegram);
  };

  if (typeof address !== "undefined") {
    writeUserData(address);
  }

  if (
    (show == "connected" && !isConnected) ||
    (show == "not_connected" && isConnected)
  )
    return null;
  return (
    <div>
      <ConnectKitButton />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConnectWallet;
