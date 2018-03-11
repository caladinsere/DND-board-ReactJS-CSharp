import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl'

function MStoneBoard(props) {
    return (
        <div className="wrapper wrapper-content  animated fadeIn" >
            <div className="row" ref={props.drag}>
                {props.mStoneArr.map((status, i) =>(
                <div className="col-lg-3" key={status.id}>
                    <div className="ibox">
                        <div className="ibox-content">
                            <h3>{status.displayName}</h3>
                            <p className="small"><i className="fa fa-hand-o-up"></i> Drag task between list</p>
                            <div  className='input-group'>
                                <span className="input-group-btn">
                                        <button onClick={props.createTask.bind(this, status.id)}  type="button" className="btn btn-sm btn-white"> <i className="fa fa-plus"></i> Add task</button>
                                </span>
                            </div>
                            <ul className="sortable-list connectList agile-list dragula-container" id={status.id}>
                                {status.taskList.map((task, i) =>(
                                <li key={task.id} className={status.taskList[i].status.displayName} value={task.displayOrder} id={task.id} onClick={props.edtTask.bind(this, task)} onMouseDown={props.getDragItm.bind(this, task)}>
                                    {task.task}
                                    <div className="agile-detail">
                                        <i className="pull-right btn btn-xs btn-white">Edit</i>
                                        <i className="fa fa-clock-o"></i> <FormattedDate
                                                                            value={task.modifiedDate}
                                                                            day="numeric"
                                                                            month="numeric"
                                                                            year="numeric" />
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default MStoneBoard;