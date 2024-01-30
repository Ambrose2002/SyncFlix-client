import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";

import React from 'react';
// import VideoPlayer from '../VideoPlayer/videoPlayer';
import VideoCard from '../VideoCard/videoCard';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [userData, setUserData] = useState(null);

	const [uploadedVideos, setUploadedVideos] = useState([]);

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
					setUserData(data.firstName);
					setUploadedVideos(data.videos)

				} else {
					// Handle unauthorized or other errors
					console.error('Error fetching user data:', response.statusText);
				}
			} catch (error) {
				console.error('Try failed', error);
			}
		}
		fetchData();
	}, [uploadedVideos])


	return (
		<div>
			<Navbar prop={{ userData, handleLogout }} />
			{/* <div>
				<h1>Video Player</h1>
				<VideoPlayer videoId={videoId} />
			</div> */}

			<div className="cards_container">
				{uploadedVideos.length !== 0 ? uploadedVideos.map((video) => (
					<VideoCard key={video.filename} title={video.title} filename={video.filename} />
				)): <h1>No videos uploaded</h1>}
			</div>


		</div>


	);
};

export default Main;