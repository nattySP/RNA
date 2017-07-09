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
                <div className={`form-group ${residueSize.touched && residueSize.invalid ? 'has-danger' : ''}`}>
                    <label>Residue Size</label>
                    <input type="number" min="20" max="100" className="form-control"
                        {...residueSize}
                           onChange={ event => {
                                residueSize.onChange(event);
                                setTimeout(()=>{
                                    handleSubmit(this.props.onSubmit)
                                })
                            }
                        }
                        />
                    <div className="text-help">
                        {residueSize.touched ? residueSize.error : ''}
                    </div>
                </div>
                <div className={`form-group ${edgeWidth.touched && edgeWidth.invalid ? 'has-danger' : ''}`}>
                    <label>Bond Width</label>
                    <input type="number" min="1" max="5" className="form-control"
                        {...edgeWidth}
                           onChange={ event => {
                                edgeWidth.onChange(event);
                                setTimeout(()=>{
                                    handleSubmit(this.props.onSubmit)
                                })
                            }
                        }
                        />
                    <div className="text-help">
                        {edgeWidth.touched ? edgeWidth.error : ''}
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