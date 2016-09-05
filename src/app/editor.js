import React from 'react';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import EditorCompiler from './compiler';

render(
    <EditorCompiler />,
    document.getElementById('editor')
);
