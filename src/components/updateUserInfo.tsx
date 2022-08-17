import { useState } from "react";
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
  updateDoc,
  serverTimestamp,
} from "../../firebase";
import Cookies from "universal-cookie";

const cookies = new Cookies();

var state = false;

async function needUpdate(walletAddress) {
  const usersRef = await doc(firestore, "users", walletAddress);
  getDoc(usersRef).then((snapshot) => {
    let userData = snapshot.data();
    if (userData !== undefined) {
      console.log(userData);
      if (userData["name"] !== undefined) {
        state = true;
      } else {
        state = false;
      }
    } else {
      console.log("No data");
    }
  });
}

function updateInfo(walletAddress, name, twitter, telegram) {
  const usersRef = doc(firestore, "users", walletAddress);
  updateDoc(usersRef, {
    name: name,
    twitter: "https://twitter.com/" + twitter,
    telegram: "https://t.me/" + telegram,
    updatedAt: serverTimestamp(),
  });
}

const UpdateUserInfo = () => {
  const walletAddress = cookies.get("walletAddress");

  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInfo(walletAddress, name, twitter, telegram);
  };

  needUpdate(walletAddress);

  if (state === false) {
    // if (setupState == false) {
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
  }
};

// };
export default UpdateUserInfo;
