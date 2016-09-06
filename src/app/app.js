import React from 'react';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Editor from './editor';

injectTapEventPlugin();

render(
    <Editor />,
    document.getElementById('ide')
);
