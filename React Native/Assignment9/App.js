import React from 'react';
import Main from './src/Main';
import ViewModel from './src/Model/ViewModel';

const App = () => {
  return (
    <ViewModel>
      <Main />
    </ViewModel>
  );
};

export default App;
