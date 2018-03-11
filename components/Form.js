import React from 'react';

function Form(props) {
    if(!props.show) {
        return null;
    }  
    const disabled = (this.props.disabled ? 'disabled' : '');
    const projStatDisable = (this.props.projStatDisable ? 'disabled' : '');
    return (
        <div className="wrapper wrapper-content animated fadeIn" >
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-content">
                            <form className="form-horizontal"  onMouseOver={props.formValid}>
                                <div className="form-group"><label className="col-lg-3 control-label">Task Name</label>
                                    <div className="col-lg-9">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={props.task}
                                            onChange={props.setValue.bind(this, "task")}
                                            />
                                        {props.taskErr && <span className="error help-block m-b-none hidden animated fadeIn" >The title is required</span>}
                                    </div>
                                </div>
                                <div className="form-group"><label className="col-lg-3 control-label">Instruction</label>
                                    <div className="col-lg-9">
                                        <textarea cols="90" rows="3"
                                            className="form-control"
                                            type="text"
                                            value={props.instruction}
                                            onChange={props.setValue.bind(this, "instruction")}
                                            />
                                        {props.instrErr && <span className="error help-block m-b-none hidden animated fadeIn" >The instructions are required</span>}
                                    </div>
                                </div>
                                <div className="form-group"><label className="col-lg-3 control-label">Completion Guidelines</label>
                                    <div className="col-lg-9">
                                        <textarea cols="90" rows="3"
                                            className="form-control"
                                            type="text"
                                            value={props.completionGuidelines}
                                            onChange={props.setValue.bind(this, "completionGuidelines")}
                                            />
                                        {props.compGuidErr && <span className="error help-block m-b-none hidden animated fadeIn" >Completion Guidelines are required</span>}
                                    </div>
                                </div>
                                <div className="form-group"><label className="col-lg-3 control-label">Est Completion Date</label>
                                    <div className="col-lg-9">
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={props.estCompDate}
                                            onChange={props.setValue.bind(this, "estCompDate")}
                                            />
                                        {props.estDateErr && <span className="error help-block m-b-none hidden animated fadeIn" >A valid date is required</span>}
                                    </div>
                                </div>
                                <div className="form-group"><label className="col-lg-3 control-label">Task Status</label>
                                    <div className="col-lg-9 btn-group">
                                        <select className="col-lg-15 btn-group form-control"
                                            onChange={props.setValue.bind(this, "projStatusId")}
                                            value={props.projStatusId}
                                            disabled={projStatDisable} >
                                            <option value="1">To-Do</option>
                                            <option value="2">In Progress</option>
                                            <option value="3">Completed</option>
                                            <option value="4">Past-Deadline</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <div className="col-lg-offset-2 col-lg-10">
                                        {!props.isEdtMode && 
                                            <div>
                                                <button disabled={disabled} onMouseOver={props.formValid} className="btn btn-sm btn-white"  onClick={props.submitHandle} id='submit'>Submit</button>
                                                <button className="btn btn-sm btn-white" onClick={props.onClose} >Back</button>
                                            </div>}
                                        {props.isEdtMode && 
                                            <div> 
                                                <button disabled={disabled} onMouseOver={props.formValid} className="btn btn-sm btn-white"  onClick={props.submitEdit} id='edit'>Update</button>
                                                <button className="btn btn-sm btn-white"  onClick={props.submitDelete} id='delete'>Delete</button>
                                                <button className="btn btn-sm btn-white" onClick={props.onClose} >Back</button>
                                            </div>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Form;