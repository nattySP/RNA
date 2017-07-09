import React, { Component } from 'react';
import SequenceInput from './SequenceInput';
import SequenceDisplay from './SequenceDisplay';
import ColorSelector from './ColorSelector';
import SizeChanger from './SizeChanger';
import GetShareable from './GetShareable';
import SequenceLayout from './SequenceLayout';
import FontSelector from './FontSelector';

export default class App extends Component {
  render() {
    return (
        <div>
            <SequenceLayout />
            <SequenceDisplay />
            <SequenceInput />
            <ColorSelector />
            <SizeChanger />
            <FontSelector />
            <GetShareable />
        </div>
    );
  }
}
