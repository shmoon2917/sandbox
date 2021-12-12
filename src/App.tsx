import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyles.styles';
import { ThumbnailPickerPage } from '@src/pages/ThumbnailPicker/ThumbnailPicker.page';

const RemoteApp = React.lazy(() => import('app2/App'));

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ThumbnailPickerPage />} />
      </Routes>
      <Suspense fallback={'loading...'}>
        <RemoteApp />
      </Suspense>
    </>
  );
};

export default App;
