import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FileUpload } from './components/FileUpload.component';
import { ThumbnailPicker } from './components/ThumbnailPicker.component';
import { Contents } from './ThumbnailPicker.types';

export const ThumbnailPickerPage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [playtime, setPlaytime] = useState(0);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!!playtime) setStep(Contents.pickThumbnail);
  }, [playtime]);

  const renderStep = (step: number) => {
    switch (step) {
      case Contents.upload:
        return <FileUpload setVideoUrl={setVideoUrl} setPlaytime={setPlaytime} />;
      case Contents.pickThumbnail:
        return <ThumbnailPicker videoUrl={videoUrl} playtime={playtime} />;
    }
  };

  return <Wrapper>{renderStep(step)}</Wrapper>;
};

const Wrapper = styled.div`
  width: 768px;
  height: inherit;

  margin: 0 auto;
  display: flex;
`;
