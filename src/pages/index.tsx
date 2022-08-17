import { FC } from "react";
import { APP_NAME } from "@/lib/consts";
import ConnectWallet from "@/components/ConnectWallet";
import { BookOpenIcon, CodeIcon, ShareIcon } from "@heroicons/react/outline";
import ThemeSwitcher from "@/components/ThemeSwitcher";
//import Mapper from '../components/mapper'
import MapComponent from "../components/maptest";
import Map from "../components/map";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  auth,
  arrayUnion,
  firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  firestoreQuery,
  orderBy,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "../../firebase";
import Cookies from "universal-cookie";
import Router from "next/router";

const cookies = new Cookies();
/**
const onSubmit = (event) => {
  event.preventDefault(event);
  console.log(event.target.name.value);
  console.log(event.target.twitter.value);
  console.log(event.target.telegram.value);
  console.log(event.target.base.value);
};*/

const Home: FC = () => {
  let NFTList = [];
  let NFTNameList = new Set();
  const ImageFetcher = async (address) => {
    const reservoirResponse = await fetch(
      "https://api.reservoir.tools/users/" +
        address +
        "/tokens/v3?sortBy=acquiredAt&sortDirection=desc&offset=0&limit=20&includeTopBid=false",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "x-api-key": "demo-api-key",
        },
      }
    );
    const reservoirJson = await reservoirResponse.json();
    reservoirJson.tokens.map(async (tokenJson) => {
      const openSeaResponse = await fetch(
        "https://api.opensea.io/api/v1/asset/" +
          tokenJson.token.contract +
          "/" +
          tokenJson.token.tokenId +
          "/?include_orders=false",
        {
          method: "GET",
        }
      );

      const openSeaJson = await openSeaResponse.json();
      if (openSeaJson.asset_contract !== undefined) {
        NFTList.push({
          NFTName: openSeaJson.asset_contract.name,
          NFTURL: openSeaJson.image_url,
        });
        NFTNameList.add(openSeaJson.asset_contract.name);
      }
      // console.log(openSeaJson.image_url);
    });
  };
  const triggerText = "Open form";
  const walletAddress = cookies.get("walletAddress");
  function sendProps() {
    Router.push({
      pathname: "../components/map",
      query: {
        walletAddress,
      },
    });
  }
  ImageFetcher(walletAddress);
  const onSubmit = (event) => {
    console.log(walletAddress);
    event.preventDefault(event);
    sendProps;
    console.log(NFTList);
    console.log(NFTNameList);

    const usersRef = doc(firestore, "users", walletAddress);
    getDoc(usersRef).then((snapshot) => {
      //   console.log(snapshot.exists());
      if (!snapshot.exists()) {
        setDoc(usersRef, {
          updatedAt: serverTimestamp(),
        });
      }
      NFTList.forEach((imageURL) => {
        // console.log(imageURL);
        if (imageURL !== undefined) {
          updateDoc(usersRef, {
            NFTList: arrayUnion(imageURL),
            updatedAt: serverTimestamp(),
          });
        }
      });
      updateDoc(usersRef, {
        name: event.target.name.value,
        twitter: event.target.twitter.value,
        telegram: event.target.telegram.value,
        base: event.target.base.value,
        updatedAt: serverTimestamp(),
      });

      console.log("user info updated");
    });

    // console.log(nftsRef);
    NFTNameList.forEach((name) => {
      let nftsRef = doc(firestore, "nfts", name);
      //   var nftsRef = doc(nftsRef, name);
      getDoc(nftsRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          updateDoc(nftsRef, {
            NFTList: arrayUnion(walletAddress),
            updatedAt: serverTimestamp(),
          });
        } else {
          setDoc(nftsRef, {
            NFTList: arrayUnion(walletAddress),
            updatedAt: serverTimestamp(),
          });
        }
      });
    });
  };
  return (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
      <div className="absolute top-6 left-12">
        <h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
      </div>
      <ThemeSwitcher className="absolute bottom-6 right-6" />
      <div className="absolute top-6 right-12">
        <ConnectWallet />
        <Popup
          trigger={<button> Click to open popup </button>}
          position="bottom center"
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Cool Ass Name</label>
              <input className="form-control" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="telegram">Telegram Handle</label>
              <input className="form-control" id="telegram" />
            </div>
            <div className="form-group">
              <label htmlFor="twitter">Twitter Handle</label>
              <input className="form-control" id="twitter" />
            </div>
            <div className="form-group">
              <label htmlFor="base">Base City</label>
              <input className="form-control" id="base" />
            </div>
            <div className="form-group">
              <button className="form-control btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Popup>
      </div>

      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-28 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
          <h3 className="text-lg leading-6 font-medium text-black">
            1. Connect Wallet
          </h3>
          <h3 className="text-lg leading-6 font-medium text-black">
            2. Verify Your Location
          </h3>
          <h3 className="text-lg leading-6 font-medium text-black">
            See where all your Web3 frenz are at IRL!!!
          </h3>
          <div id="map">
            <Map></Map>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
