import React, { Component } from 'react';
import SequenceInput from './SequenceInput';
import SequenceDisplay from './SequenceDisplay';
import ColorSelector from './ColorSelector';
import GetShareable from './GetShareable';
import SequenceLayout from './SequenceLayout';

export default class App extends Component {
  render() {
    return (
        <div>
            <SequenceLayout />
            <SequenceDisplay />
            <SequenceInput />
            <ColorSelector />
            <GetShareable />
        </div>
    );
  }
}
