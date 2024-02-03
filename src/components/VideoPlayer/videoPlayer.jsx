
const VideoPlayer = ({ videoId }) => {

	return (
		<video id="videoPlayer" width="650" controls muted="muted" autoplay>
			<source src="api/video" type="video/mp4" />
		</video>
	);
};

export default VideoPlayer;

