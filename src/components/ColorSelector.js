import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { updateColor, updateResidueSize } from '../actions/index';

class ColorSelector extends Component {
    componentDidMount(){
        this.handleInitialize()
    }

    handleInitialize(){
        this.props.initializeForm(_.assign({}, this.props.colors))
    }

    render(){
        const {fields: { aColor, tColor, gColor, cColor, nColor }, handleSubmit} = this.props;
        let fieldArray = [{field: aColor, label: 'A'}, {field: tColor, label: 'T'}, {field: gColor, label: 'G'}, { field: cColor, label: 'C'}, {field: nColor, label: 'N'}];
        return (
            <form>
                <div>
                    {this.getColorInputs(fieldArray, handleSubmit)}
                </div>
            </form>
        );
    }

    getColorInputs(fields, handleSubmit) {
        return fields.map(({field, label}, idx)=>{
            return (
                <div key={idx} className="field">
                    <div className="columns">
                        <div className="column has-text-centered">
                            <p className="control-info column-flex">
                                <label className="label">{label}</label>
                            </p>
                        </div>
                        <div className="column">
                            <p className="control">
                                <span className="select">
                                    <select
                                        {...field}
                                            onChange={ event => {
                                                field.onChange(event);
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
                </div>
            )
        })
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

function validate(values) {
    const errors = {};
    if (!values.residueSize) {
        errors.residueSize = 'Enter a number';
        return errors;
    }

    let number;
    try {
        number = parseInt(values.residueSize, 10)
    }
    catch(e){
        errors.residueSize = 'Enter a number';
        return errors;
    }

    if (number > 100 || number < 20) {
        errors.residueSize = 'Enter a number from 20 to 100'
    }
    return errors;
}



export default reduxForm({
    form: `ColorSelectorForm`,
    fields: ['aColor', 'tColor', 'gColor', 'cColor', 'nColor']
}, state => ({
    colors: state.sequence.currentStyles.colors,
    size: state.sequence.currentStyles.size
}), { onSubmit: updateColor, updateResidueSize })(ColorSelector);