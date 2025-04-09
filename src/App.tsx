import { useState } from 'react';
import './App.css';
import PlayerData from './client/pages/PlayerData/PlayerData';
import SteamIdInput from './client/components/SteamIdInput';
import { DataProvider } from './client/context/DataContext';

const App = () => {
  const [steamid, setSteamId] = useState<string>('');

  return (
    <>
      {!steamid ? 
        <SteamIdInput onSubmit={setSteamId} />
       : 
        <DataProvider steamid={steamid}>
          <PlayerData />
        </DataProvider>
      }
    </>
  )
}

export default App;