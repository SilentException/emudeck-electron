import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from 'context/globalContext';

import Welcome from 'components/organisms/Wrappers/Welcome.js';

const WelcomePage = () => {
  const { state, setState } = useContext(GlobalContext);
  const [statePage, setStatePage] = useState({
    disabledNext: true,
    disabledBack: true,
    downloadComplete: true,
    data: '',
  });
  const { disabledNext, disabledBack, downloadComplete, data } = statePage;

  const selectMode = (value) => {
    setState({ ...state, mode: value });
  };

  const { device, system, mode } = state;

  const ipcChannel = window.electron.ipcRenderer;

  useEffect(() => {
    //Sending data
    ipcChannel.sendMessage('bash', ['pwd']);
    ipcChannel.sendMessage('system-info');

    //Receiving data
    ipcChannel.once('bash-out', (stdout) => {
      setStatePage({ ...statePage, data: stdout });
    });
    ipcChannel.once('console', (stdout) => {
      console.log({ stdout });
    });
    ipcChannel.once('system-info-out', (platform) => {
      setState({ ...state, system: platform });
    });
  }, []); // <-- here put the parameter to listen

  useEffect(() => {
    if (mode != '') {
      setStatePage({ ...statePage, disabledNext: false });
    }
  }, [mode]); // <-- here put the parameter to listen

  return (
    <Welcome
      data={data}
      disabledNext={disabledNext}
      disabledBack={disabledBack}
      downloadComplete={downloadComplete}
      onClick={selectMode}
      back={false}
      next="rom-storage"
    />
  );
};

export default WelcomePage;