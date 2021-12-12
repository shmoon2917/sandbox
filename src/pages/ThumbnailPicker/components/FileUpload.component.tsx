import React, { ChangeEventHandler, Dispatch, SetStateAction, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Styles } from '@src/services/constants';

interface Props {
  setPlaytime: Dispatch<SetStateAction<number>>;
  setVideoUrl: Dispatch<SetStateAction<string>>;
}

export const FileUpload: React.FC<Props> = ({ setPlaytime, setVideoUrl }) => {
  const fileInput = useRef<HTMLInputElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSourceRef = useRef<HTMLSourceElement>(null);

  const createThumbnails: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const {
        target: { files },
      } = event;
      if (!files?.length) return;

      videoSourceRef.current.src = URL.createObjectURL(files[0]);
      setVideoUrl(videoSourceRef.current.src);
      const videoElement = videoSourceRef.current.parentElement as HTMLVideoElement;

      videoElement.onloadeddata = () => {
        setPlaytime(videoElement.duration);
      };

      videoElement.load();
    },
    [videoSourceRef.current],
  );

  return (
    <Wrapper>
      <Title>영상을 올려주세요.</Title>
      <UploadInputWrapper>
        <UploadInputLabel htmlFor="portfolio-upload__file-input">영상 파일 업로드</UploadInputLabel>
        <HiddenInput
          id="portfolio-upload__file-input"
          ref={fileInput}
          name="file"
          type="file"
          accept="video/*"
          onChange={createThumbnails}
        />
        <UploadInputDescription>최대 용량 1GB</UploadInputDescription>
      </UploadInputWrapper>
      <HiddenVideoWrapper>
        <video ref={videoRef} controls>
          <source ref={videoSourceRef} src="." id="video_here" />
          Your browser does not support HTML5 video.
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

const UploadInputWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  padding: 44px 53px 28px;
  border: 1px solid ${Styles.COLOR.GREYSCALE_100};

  display: flex;
  flex-direction: column;
  text-align: center;
`;

const UploadInputLabel = styled.label`
  padding: 16px;
  ${Styles.FONT.BUTTON_1};
  color: ${Styles.COLOR.WHITE};
  background-color: ${Styles.COLOR.PRIMARY_400};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${Styles.COLOR.PRIMARY_500};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadInputDescription = styled.span`
  margin-top: 8px;
  ${Styles.FONT.BUTTON_3};
  color: ${Styles.COLOR.GREYSCALE_400};
`;

const HiddenVideoWrapper = styled.div`
  opacity: 0;
`;
