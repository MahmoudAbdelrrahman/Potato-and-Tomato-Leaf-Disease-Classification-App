
import React from 'react';

import Stack from './routes/stack'
import { AppRegistry } from 'react-native';

 
export default  function App()
{
  return (
      <Stack/>
  );
 

}
AppRegistry.registerComponent('Cam', () => App);
