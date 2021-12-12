import { ThumbnailPickerPage } from 'pages/ThumbnailPicker/ThumbnailPicker.page';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<ThumbnailPickerPage />} />
    </Routes>
  );
};

export default App;
