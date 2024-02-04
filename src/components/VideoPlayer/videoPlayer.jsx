// import { useParams } from "react-router-dom";

// const VideoPlayer = ( ) => {
// 	var videoId = useParams()
// 	videoId = videoId.videoId
// 	return (
// 		<video id="videoPlayer" controls muted>
// 			<source src= {`https://desolate-bayou-93955-64c6896ee0b5.herokuapp.com/api/video/${videoId}`} type="video/mp4" />
// 			Video not Supported
// 		</video>
// 	);
// };

// export default VideoPlayer;

import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'

const VideoPlayer = ( ) => {
	var videoId = useParams()
	videoId = videoId.videoId
	return (
		// <video id="videoPlayer" controls>
		// 	<source src= {`/api/video/${videoId}`} type="video/mp4" />
		// </video>
		<ReactPlayer
				// ref={playerRef}
				url={`/api/video/${videoId}`}
				// playing={isPlaying}
				controls={true}
				// width="100%"
				// height="auto"
				// muted
				// style={{ display: 'none' }}
			/>
	);
};

export default VideoPlayer;

