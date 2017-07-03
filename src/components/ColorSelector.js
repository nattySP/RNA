import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { updateColor } from '../actions/index';

class ColorSelector extends Component {
    componentDidMount(){
        this.handleInitialize()
    }

    handleInitialize(){
        this.props.initializeForm(this.props.colors)
    }

    render(){
        const {fields: { aColor, tColor, gColor, cColor }, handleSubmit} = this.props;
        return (
            <form>
                <h3>Select A Color </h3>
                <div className={`form-group`}>
                    <label>A</label>
                    <select className="form-control"
                        {...aColor}
                            onChange={ event => {
                                    aColor.onChange(event);
                                    setTimeout(()=>{
                                        handleSubmit(this.props.onSubmit)
                                    })
                                }
                            }
                        >
                        {getOptions()}
                    </select>
                    <label>T</label>
                    <select className="form-control"
                        {...tColor}
                            onChange={ event => {
                                    tColor.onChange(event);
                                    setTimeout(()=>{
                                        handleSubmit(this.props.onSubmit)
                                    })
                                }
                            }>
                        {getOptions()}
                    </select>
                    <label>G</label>
                    <select className="form-control"
                        {...gColor}
                            onChange={ event => {
                                    gColor.onChange(event);
                                    setTimeout(()=>{
                                        handleSubmit(this.props.onSubmit)
                                    })
                                }
                            }>
                        {getOptions()}
                    </select>
                    <label>C</label>
                    <select className="form-control"
                        {...cColor}
                            onChange={ event => {
                                    cColor.onChange(event);
                                    setTimeout(()=>{
                                        handleSubmit(this.props.onSubmit)
                                    })
                                }
                            }>
                        {getOptions()}
                    </select>
                </div>
            </form>
        )
    }
}

function getOptions() {
    const colors = [ 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet' ];
    return colors.map((color)=>{
        return (
            <option key={color} value={color}>{color}</option>
        )
    })
}

export default reduxForm({
    form: `ColorSelectorForm`,
    fields: ['aColor', 'tColor', 'gColor', 'cColor']
}, state => ({
    colors: state.sequence.currentStyles.colors
}), { onSubmit: updateColor })(ColorSelector);