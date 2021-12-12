import { ThumbnailPickerPage } from '@src/pages/ThumbnailPicker/ThumbnailPicker.page';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyles.styles';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ThumbnailPickerPage />} />
      </Routes>
    </>
  );
};

export default App;
