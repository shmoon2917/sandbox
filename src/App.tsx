import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyles.styles';
import { ThumbnailPickerPage } from '@src/pages/ThumbnailPicker/ThumbnailPicker.page';

const RemoteApp = React.lazy(() => import('app2/App'));

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Suspense fallback={'loading...'}>
        <RemoteApp />
      </Suspense>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ThumbnailPickerPage />} />
      </Routes>
    </>
  );
};

export default App;
