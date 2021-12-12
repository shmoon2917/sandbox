import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Styles } from 'services/constants';
import styled, { css, keyframes } from 'styled-components';
import { DEFAULT_THUMBNAIL_COUNT } from '../ThumbnailPicker.constants';

interface Props {
  playtime: number;
  videoUrl: string;
}

export const ThumbnailPicker: React.FC<Props> = ({ playtime, videoUrl }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);
  const hiddenVideoSourceRef = useRef<HTMLSourceElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSourceRef = useRef<HTMLSourceElement>(null);
  const canvasRefs = [...Array(DEFAULT_THUMBNAIL_COUNT)].map(() => useRef<HTMLCanvasElement>(null));

  const [onThumbnailReady, setOnThumbnailReady] = useState(false);
  const [currenttime, setCurrenttime] = useState(0);

  // 비디오 로드 완료 시 thumbnail 추출 콜백 등록
  useEffect(() => {
    const hiddenVideoElement = hiddenVideoSourceRef.current.parentElement as HTMLVideoElement;

    hiddenVideoElement.onloadeddata = async () => {
      const durationPerCut = hiddenVideoElement.duration / (DEFAULT_THUMBNAIL_COUNT - 1);

      async function asyncCapture(index: number) {
        hiddenVideoElement.currentTime = index * durationPerCut;

        await new Promise((resolve) =>
          setTimeout(() => {
            canvasRefs[index].current
              .getContext('2d')
              .drawImage(hiddenVideoElement, 0, 0, hiddenVideoElement.width, hiddenVideoElement.height);

            resolve(null);
          }, 300),
        );
      }

      for (const i of [...Array(DEFAULT_THUMBNAIL_COUNT).keys()]) {
        await asyncCapture(i);
      }

      setOnThumbnailReady(true);
    };
  }, []);

  // video와 canvas width 설정
  useLayoutEffect(() => {
    if (wrapperRef.current && canvasRefs.every((ref) => !!ref.current)) {
      const wrapperWidth = wrapperRef?.current?.getBoundingClientRect().width;
      const getHeightByRatio = (width: number) => width * (9 / 16);

      videoRef.current.setAttribute('width', `${wrapperWidth}px`);
      videoRef.current.setAttribute('height', `${getHeightByRatio(wrapperWidth)}px`);

      const thumbnailWidth = (wrapperWidth - 2 * (DEFAULT_THUMBNAIL_COUNT - 1)) / DEFAULT_THUMBNAIL_COUNT;
      hiddenVideoRef.current.setAttribute('width', `${thumbnailWidth}px`);
      hiddenVideoRef.current.setAttribute('height', `${getHeightByRatio(thumbnailWidth)}px`);

      canvasRefs.forEach((ref) => {
        ref.current.setAttribute('width', `${thumbnailWidth}px`);
        ref.current.setAttribute('height', `${getHeightByRatio(thumbnailWidth)}px`);

        const ctx = ref.current.getContext('2d');
        ctx.rect(0, 0, thumbnailWidth, getHeightByRatio(thumbnailWidth));
        ctx.fillStyle = Styles.COLOR.GREYSCALE_100;
        ctx.fill();
      });
    }
  }, []);

  // video url 설정
  useEffect(() => {
    if (videoUrl) {
      videoSourceRef.current.src = videoUrl;
      hiddenVideoSourceRef.current.src = videoUrl;
      const videoElement = videoSourceRef.current.parentElement as HTMLVideoElement;
      const hiddenVideoElement = hiddenVideoSourceRef.current.parentElement as HTMLVideoElement;

      videoElement.load();
      hiddenVideoElement.load();
    }
  }, [videoUrl]);

  return (
    <Wrapper ref={wrapperRef}>
      <Title>썸네일로 사용할 장면을 선택해주세요.</Title>
      <SliderWrapper>
        <ThumbnailWrapper>
          {canvasRefs.map((ref, idx) => (
            <Thumbnail key={`thumbnail-picker__thumbnail-${idx}`} ref={ref} />
          ))}
        </ThumbnailWrapper>
      </SliderWrapper>
      <Video ref={videoRef}>
        <source ref={videoSourceRef} src="." id="video_here" />
        지원되지 않는 브라우저입니다.
      </Video>
      <HiddenVideoWrapper>
        <video ref={hiddenVideoRef} controls>
          <source ref={hiddenVideoSourceRef} src="." />
        </video>
      </HiddenVideoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 44px;
`;

const Title = styled.h2`
  ${Styles.FONT.HEADELINE_5};
  color: ${Styles.COLOR.GREYSCALE_900};
  margin: 16px 0;
`;

const Thumbnail = styled.canvas`
  width: inherit;
`;

const SliderWrapper = styled.div`
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  margin: 32px 0 15px;
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
  display: flex;

  ${Thumbnail} ~ ${Thumbnail} {
    margin-left: 2px;
  }
`;

const Video = styled.video`
  width: 100%;
  height
`;

const HiddenVideoWrapper = styled.div`
  opacity: 0;
`;
