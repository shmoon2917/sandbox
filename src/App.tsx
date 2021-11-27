import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThumbnailPicker from './ThumbnailPicker/ThumbnailPicker';

const App: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<ThumbnailPicker />} />
    </Routes>
  );
};

export default App;
