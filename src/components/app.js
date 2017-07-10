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
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title"> <strong>ExploRNA</strong></h1>
                    </div>
                </div>

            </section>
            <div className="box">
                <div className="columns">
                    <div className="column is-three-quarters">
                        <SequenceLayout />
                    </div>
                    <div className="column">
                        <p className="panel-heading">
                            LAYOUT CONTROL
                        </p>
                        <div className="panel">
                            <div className="panel-block">
                                <ColorSelector />
                            </div>
                            <div className="panel-block">
                                <SizeChanger />
                            </div>
                            <div className="panel-block">
                                <FontSelector />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-three-quarters">
                        <SequenceDisplay />
                    </div>
                </div>
            </div>
            <div className="box">
                <div className="columns">
                    <div className="column is-three-quarters">
                        <SequenceInput />
                    </div>
                    <div className="column">
                        <GetShareable />
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <p>
                            <strong>ExploRNA</strong> by <a href="http://codeisbae.com">Natalie Hall</a>.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
  }
}
