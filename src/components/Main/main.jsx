import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";

import React from 'react';
import VideoPlayer from '../VideoPlayer/videoPlayer';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const videoId = '65b58c038b81dd75d4e861ce';

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			// const url = "https://desolate-bayou-93955-64c6896ee0b5.herokuapp.com/api";
			const token = localStorage.getItem('token');

			try {
				const response = await fetch("/api", {
					headers: {
						Authorization: token,
					},
				});

				if (response.ok) {
					const data = await response.json();
					// console.log(data)
					setUserData(data.firstName);
					// console.log(data)
				} else {
					// Handle unauthorized or other errors
					console.error('Error fetching user data:', response.statusText);
				}
			} catch (error) {
				console.error('Try failed', error);
			}
		}
		fetchData();
	}, [])


	return (
		<div>
			<Navbar prop={{ userData, handleLogout }} />
			<nav>
				<button onClick={handleLogout}>
					Logout
				</button>
			</nav>

			<div>
				{userData ? (
					<div>
						<p>Name:{JSON.stringify(userData)}</p>
					</div>
				) : (
					<p>Loading user data...</p>
				)}
			</div>

			<div>
				<h1>Video Player</h1>
				<VideoPlayer videoId={videoId} />
			</div>
		</div>


	);
};

export default Main;