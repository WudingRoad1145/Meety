import { FC, useEffect, useState } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import UpdateUserInfo from '@/components/updateUserInfo'
import { BookOpenIcon, CodeIcon, ShareIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
//import Mapper from '../components/mapper'
import MapComponent from '../components/maptest'

const Home: FC = () => {

	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<div className="absolute top-6 left-6">
				<h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
			</div>
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>
			{/* <div><UpdateUserInfo /></div> */}
			
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
				<div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
					<div id="map">
						<MapComponent></MapComponent>
					</div>
					<div className="shadow sm:rounded-md sm:overflow-hidden">
						<div className="bg-white py-6 px-4 space-y-6 sm:p-4">
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">NFT Groups</h3>
								<p className="mt-1 text-sm text-gray-500">
								Select NFTs group's you would like to share your proof of location.
								</p>
							</div>
						</div>
					</div>
					<form action="#" method="POST">
					<div className="grid grid-cols-4 md:grid-cols-4">
						<div> 
							<div className="mt-4 space-y-4">
								<div className="flex items-start">
									<div className="h-5 flex items-center">
									<input
										id="comments"
										name="comments"
										type="checkbox"
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
									/>
									</div>
									<div className="ml-3 text-sm">
									<label htmlFor="comments" className="font-medium text-white">
										NFT Group 1
									</label>
									<p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
									</div>
								</div>
							</div>
						</div>
						
						<div> 
							<div className="mt-4 space-y-4">
								<div className="flex items-start">
									<div className="h-5 flex items-center">
									<input
										id="comments"
										name="comments"
										type="checkbox"
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
									/>
									</div>
									<div className="ml-3 text-sm">
									<label htmlFor="comments" className="font-medium text-white">
										NFT Group 2
									</label>
									<p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
									</div>
								</div>
							</div>
						</div>

						<div> 
							<div className="mt-4 space-y-4">
								<div className="flex items-start">
									<div className="h-5 flex items-center">
									<input
										id="comments"
										name="comments"
										type="checkbox"
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
									/>
									</div>
									<div className="ml-3 text-sm">
									<label htmlFor="comments" className="font-medium text-white">
										NFT Group 3
									</label>
									<p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
									</div>
								</div>
							</div>
						</div>

						<div> 
							<div className="mt-4 space-y-4">
								<div className="flex items-start">
									<div className="h-5 flex items-center">
									<input
										id="comments"
										name="comments"
										type="checkbox"
										className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
									/>
									</div>
									<div className="ml-3 text-sm">
									<label htmlFor="comments" className="font-medium text-white">
										NFT Group 4
									</label>
									<p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
									</div>
								</div>
							</div>
						</div>

					</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Home
