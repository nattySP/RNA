import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import { updateResidueSize } from '../actions/index';

class SizeChanger extends Component {
    componentDidMount(){
        this.handleInitialize()
    }

    handleInitialize(){
        this.props.initializeForm(_.assign({}, this.props.size ))
    }

    render(){
        const {fields: { residueSize, edgeWidth }, handleSubmit} = this.props;
        return (
            <form>
                <div>
                    <div>
                        <div className="field">
                            <label className="label">RESIDUE SIZE</label>
                            <div className="columns">
                                <div className="column is-three-quarters">
                                    <p className="control column-flex">
                                        <input type="range" min="20" max="100" className={`${residueSize.touched && residueSize.invalid ? 'is-danger' : ''}`}
                                            {...residueSize}
                                               onChange={ event => {
                                            residueSize.onChange(event);
                                            setTimeout(()=>{
                                                handleSubmit(this.props.onSubmit)
                                            })
                                        }
                                    }
                                            />
                                    </p>
                                    <p className="help is-danger">
                                        {residueSize.touched ? residueSize.error : ''}
                                    </p>
                                </div>
                                <div className="column has-text-centered">
                                    <p className="column-flex control-info">{residueSize.value}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="field">
                            <label className="label">BOND WIDTH</label>
                            <div className="columns">
                                <div className="column is-three-quarters">
                                    <p className="control column-flex">
                                        <input type="range" min="1" max="5" className={`${edgeWidth.touched && edgeWidth.invalid ? 'has-danger' : ''}`}
                                            {...edgeWidth}
                                               onChange={ event => {
                                            edgeWidth.onChange(event);
                                            setTimeout(()=>{
                                                handleSubmit(this.props.onSubmit)
                                            })
                                        }
                                    }
                                            />
                                    </p>
                                    <p className="help is-danger">
                                        {edgeWidth.touched ? edgeWidth.error : ''}
                                    </p>
                                </div>
                                <div className="column has-text-centered">
                                    <p className="column-flex control-info">{edgeWidth.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
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
    form: `SizeChangerForm`,
    fields: ['residueSize', 'edgeWidth'],
    validate
}, state => ({
    size: state.sequence.currentStyles.size
}), { onSubmit: updateResidueSize })(SizeChanger);