import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { updateFont } from '../actions/index';

class FontSelector extends Component {
    componentDidMount(){
        this.handleInitialize()
    }

    handleInitialize(){
        this.props.initializeForm(_.assign({}, this.props.colors))
    }

    render(){
        const {fields: { font }, handleSubmit} = this.props;
        return (
            <form>
                <div>
                    <div className="field">
                        <label className="label">FONT</label>
                        <p className="control">
                            <span className="select">
                                <select
                                    {...font}
                                        onChange={ event => {
                                        font.onChange(event);
                                        setTimeout(()=>{
                                            handleSubmit(this.props.onSubmit)
                                        })
                                    }
                                }>
                                    {getOptions()}
                                </select>
                            </span>
                        </p>
                    </div>
                </div>
            </form>
        );
    }
}

function getOptions() {
    const fonts = [
        'Helvetica',
        'Arial',
        'Times New Roman',
        'Courier New',
        'Courier',
        'Verdana',
        'Georgia',
        'Palatino',
        'Garamond',
        'Bookman',
        'Comic Sans MS',
        'Impact'
    ];
    return fonts.map((font)=>{
        return (
            <option key={font}
                    value={font}
                >{font}</option>
        )
    })
}

export default reduxForm({
    form: `FontSelectorForm`,
    fields: ['font']
}, state => ({
    colors: state.sequence.currentStyles.font
}), { onSubmit: updateFont})(FontSelector);