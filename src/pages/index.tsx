import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { BookOpenIcon, CodeIcon, ShareIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
//import Mapper from '../components/mapper'
import MapComponent from '../components/maptest'
import Map from '../components/map'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const onSubmit = (event) => {
	event.preventDefault(event);
	console.log(event.target.name.value);
	console.log(event.target.twitter.value);
	console.log(event.target.telegram.value);
	console.log(event.target.base.value);
  };

const Home: FC = () => {
	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<div className="absolute top-6 left-12">
				<h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
			</div>
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="absolute top-6 right-12">
				<ConnectWallet />
				<Popup trigger={<button> Click to open popup </button>} 
					position="bottom center">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<label htmlFor="name">Cool Ass Name</label>
							<input className="form-control" id="name" />
						</div>
						<div className="form-group">
							<label htmlFor="telegram">Telegram Handle</label>
							<input
							className="form-control"
							id="telegram"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="twitter">Twitter Handle</label>
							<input
							className="form-control"
							id="twitter"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Base City</label>
							<input
							className="form-control"
							id="base"
							/>
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
	)
}

export default Home
