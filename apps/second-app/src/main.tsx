import * as ReactDOM from 'react-dom/client';

import Home from './views/Home';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Home />
  </StrictMode>
);
