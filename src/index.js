import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import Main from './components/Main/Main';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
