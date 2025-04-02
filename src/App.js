import React from 'react';
import Routing from './router/Routing';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster />
      <Routing />
    </div>
  )
};

export default App;