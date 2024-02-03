import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import VideoPlayer from '../VideoPlayer/videoPlayer';
import './videoPage.css';

const VideoPage = ({ videoId, title }) => {

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [userData, setUserData] = useState(null);

	const navigate = useNavigate();

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

				} else {
					// Handle unauthorized or other errors
					console.error('Error fetching user data:', response.statusText);
					navigate('/login')

				}
			} catch (error) {
				console.error('Try failed', error);
			}
		}
		fetchData();
	}, [])

	return (
		<>
			<Navbar prop={{ userData, handleLogout }} />
			<div className="sub_nav">
				<div onClick={() => navigate('/')} className="back">
					<i className='bx bx-arrow-back back_arrow'></i>
					<button className='card_button'>Back</button>
				</div>
				<div>
					<button>Create Room</button>
				</div>
			</div>

			<div>
				<VideoPlayer videoId={videoId} title={title} />
			</div>
		</>
	)
}

export default VideoPage