import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const url = "https://desolate-bayou-93955-64c6896ee0b5.herokuapp.com/";
			const token = localStorage.getItem('token');

			try {
				const response = await fetch(url, {
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
			<Navbar prop={{userData, handleLogout}}/>
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
		</div>


	);
};

export default Main;