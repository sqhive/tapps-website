import React from 'react';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import EditorCompiler from './compiler';
import EditorView from './view';

injectTapEventPlugin();

render(
    <EditorCompiler />,
    document.getElementById('compiler')
);

render(
    <EditorView />,
    document.getElementById('view')
);
