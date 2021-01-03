import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Base from './components/Base';

import { ErrorProvider } from './context/ErrorState';
import { VideoProvider } from './context/VideoState';
import { ApiProvider } from './context/ApiState';


function App() {
  return (
    <ErrorProvider>
      <VideoProvider>
        <ApiProvider>
          <Base />
        </ApiProvider>
      </VideoProvider>
    </ErrorProvider>
  );
}

export default App;
