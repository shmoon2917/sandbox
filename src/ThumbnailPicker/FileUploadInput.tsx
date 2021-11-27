import React, { ChangeEventHandler, useCallback, useRef } from 'react';

function FileUploadInput() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSourceRef = useRef<HTMLSourceElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateThumbnails: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const {
        target: { files },
      } = event;
      if (!files?.length) return;

      videoSourceRef.current.src = URL.createObjectURL(files[0]);
      const videoElement = videoSourceRef.current.parentElement as HTMLVideoElement;

      videoElement.onloadeddata = () => {
        canvasRef.current.width = videoElement.videoWidth;
        canvasRef.current.height = videoElement.videoHeight;
      };

      videoElement.load();
    },
    [videoSourceRef.current, canvasRef.current],
  );

  const captureThumbnail = useCallback(() => {
    if (!videoRef?.current || !canvasRef?.current) return;

    console.log(videoRef.current.videoWidth, videoRef.current.videoHeight);

    canvasRef.current
      .getContext('2d')
      .drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
  }, [videoRef.current, canvasRef.current]);

  return (
    <>
      <div>
        <label htmlFor="portfolio">Choose a video:</label>
        <input
          style={{ opacity: 0 }}
          type="file"
          id="portfolio-file-input"
          name="portfolio"
          accept="video/*"
          onChange={updateThumbnails}
        />
      </div>
      <div className="preview">
        <video ref={videoRef} controls>
          <source ref={videoSourceRef} src="." id="video_here" />
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div>
        <button onClick={captureThumbnail}>Capture</button>
      </div>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default FileUploadInput;
