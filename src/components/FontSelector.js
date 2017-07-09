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
                <div className={`form-group`}>
                    <div>
                        <label>Select Font</label>
                        <select className="form-control"
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
                    </div>
                </div>
            </form>
        );
    }
}

function getOptions() {
    const colors = [
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
    return colors.map((color)=>{
        return (
            <option key={color} value={color}>{color}</option>
        )
    })
}

export default reduxForm({
    form: `FontSelectorForm`,
    fields: ['font']
}, state => ({
    colors: state.sequence.currentStyles.font
}), { onSubmit: updateFont})(FontSelector);