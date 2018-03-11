import React from "react"
import axios from 'axios'
import Dragula from 'react-dragula'
import Modal from '../components/modal'
import Form from '../components/form'
import MStoneBoard from '../components/mstoneboard'
import { FormattedDate, FormattedTime } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Milestones extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: {
                projectId: 0,
                task: '',
                instruction: '',
                completionGuidelines: '',
                estCompDate: '',
                projStatusId: 1,
                milestone: 1,
                displayOrder: 0,
            },
            isOpen: false,
            taskErr: false,
            disabled: true,
            isLoaded: false,
            instrErr: false,
            isEdtMode: false,
            estDateErr: false,
            compGuidErr: false,
            projStatDisable: false,
            items: {},
            crtItm: {},
            newItm: {},
            diffItm: {},
        };
        this.dragulaDecorator = this.dragulaDecorator.bind(this);
        this.updateDisOrder = this.updateDisOrder.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.createTask = this.createTask.bind(this);
        this.getMStones = this.getMStones.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.getDragItm = this.getDragItm.bind(this);
        this.chngBoard = this.chngBoard.bind(this);
        this.formValid = this.formValid.bind(this);
        this.setBoard = this.setBoard.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setInput = this.setInput.bind(this);
        this.edtTask = this.edtTask.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    getMStones(data){
        //grab project id from redux and load the board
        let id = data.projectId[0].projectId;
        const getStones = axios.get("/api/endpoint/" + id)
            .then(resp => resp.data.item.milestoneList);
        let promise1 = Promise.resolve(getStones);
        promise1.then(getStones => this.setBoard(getStones))
    }

    setBoard(arr){
        //check if any arrys are null and set them to an empty array
        const arr2 = arr.filter(x => {if (x.taskList !== null){return x}});
        const arr3 = arr.filter(x => {if (x.taskList === null){x.taskList = []; return x}});
        const arr4 = arr3.concat(arr2);
        const mStoneArr = arr4.sort((a, b) => {return a.displayOrder - b.displayOrder});

        //load tasks and set the lists to state
        const diffItm = mStoneArr.map(x => {return x.taskList});
        this.setState({ diffItm });

        //get current date
        const d = new Date();
        const getMnth = d.toISOString().slice(5, 7);
        const getDay = d.toISOString().slice(8, 10);
        const currDate = d.getFullYear()+'-'+getMnth+'-'+getDay;

        //check if any past due items in the array got their date updated
        const arr = [].concat(...diffItm);
        const result = arr.filter(x => {if (x.estCompDate >= currDate){return x}});
        const result2 = result.filter(x => {if (x.projStatusId === 4){return x;}});
        const result3 = result2.map(x => {x.projStatusId = 1; return x});

        //check if any taskes are past due
        const projStatCheck = arr.filter(x => {if (x.estCompDate < currDate){return x}});
        const projStatCheck2 = projStatCheck.filter(x => {if (x.projStatusId !== 4 && x.projStatusId !== 3){return x}});
        const projStatCheck3 = projStatCheck2.map(x => {x.projStatusId = 4; return x});

        //set the project id
        const input = this.state.input;
        input['projectId'] = id;
        this.setState({ input });

        //if there is any task past due then send it to the database to change the status
        const projStatChange = result3.concat(projStatCheck3);
        if (projStatChange.length > 0){return this.changeStatus(projStatChange, id);
        } else { 
            return this.setState({
                mStoneArr,
                isLoaded: true
            });
        }
    }

    changeStatus(data, id){
        axios.put("/api/endpoint/", data)
            .then(resp => this.refresh(id));
    }

    refresh(id){
        const refresh = axios.get("/api/endpoint/" + id)
            .then(resp => resp.data.item.milestoneList);
        let promise1 = Promise.resolve(refresh);
        promise1.then(refresh => this.chngBoard(refresh))
    }

    chngBoard(arr){
        const arr2 = arr.filter(x => {if (x.taskList !== null){return x}});
        const arr3 = arr.filter(x => {if (x.taskList === null){x.taskList = []; return x}});
        const arr4 = arr3.concat(arr2);
        const mStoneArr = arr4.sort((a, b) => {return a.displayOrder - b.displayOrder});
        this.setState({
            mStoneArr,
            isLoaded: true
        });
    }

    getDragItm(data){
        const input = this.state.input;
        input['crtItm'] = data;
        this.setState({ input });
    }

    createTask(data){
        const input = this.state.input;
        input['milestone'] = data;
        this.setState({
            input,
            isOpen: !this.state.isOpen,
        });
    }

    toggleModal(){
        this.setState({ isOpen: !this.state.isOpen });
    }

    onBack(){
        this.setState({
            isEdtMode: false,
            projStatDisable: false,
            isOpen: !this.state.isOpen,
        });
        this.setInput();
    }

    setInput(){
        const input = this.state.input;
        input['input'] = {
            projectId: this.props.user.projectId[0].projectId,
            task: '',
            instruction: '',
            completionGuidelines: '',
            estCompDate: '',
            projStatusId: 1,
            milestone: 1,
            displayOrder: 0,
        };
        this.setState({ input });
    }
    
    edtTask(data){
        const input = this.state.input;
        input['input'] = {
            id: data.id,
            projectId: data.projectId,
            task: data.task,
            instruction: data.instruction,
            completionGuidelines: data.completionGuidelines,
            estCompDate: data.estCompDate,
            projStatusId: data.projStatusId,
            milestone: data.milestone,
            displayOrder: data.displayOrder,
        };
        if (data.projStatusId === 4){this.setState({ projStatDisable: true })};
        this.setState({
            input,
            isEdtMode: true,
            isOpen: !this.state.isOpen
        });
    }

    submitHandle(){
        const input = this.state.input;
        input['projStatusId'] = Number(this.state.input.projStatusId);
        this.setState({ input });
        this.toggleModal();
        axios.post("/api/endpoint/", this.state.input)
            .then(resp => this.updateDisOrder(resp.data.item));
    }

    submitEdit(){
        const input = this.state.input;
        input['projStatusId'] = Number(this.state.input.projStatusId);
        this.setState({
            input,
            isEdtMode: false,
            projStatDisable: false,
        });
        this.toggleModal();
        axios.put("/api/endpoint/" + this.state.input.id, this.state.input)
            .then(resp =>{this.setInput();
                this.getMStones(this.props.user);
            });
    }

    submitDelete(){
        this.setState({
            isEdtMode: false,
            projStatDisable: false,
        });
        this.toggleModal();
        axios.delete("/api/endpoint/" + this.state.input.id)
            .then(resp =>{this.setInput();
                this.getMStones(this.props.user);
            });
    }

    updateDisOrder(id){
        //set id to new item
        const input = this.state.input;
        input['id'] = id;
        this.setState({ input });
        const sepArrays = this.state.diffItm;
        const mainArr = [].concat(...sepArrays);

        //seperate array and place new item where it needs to go
        const lessArr = sepArrays.filter((x, i) => {if (i < (input.milestone-1)) {return x}});
        const greaterArr = sepArrays.filter((x, i) => {if (i >= (input.milestone-1)) {return x}});
        const allArr = lessArr.concat(input, greaterArr);
        const newMArr = [].concat(...allArr);

        //change display orders and send to database
        const newDisNumbs = newMArr.map((x, i) => {x.displayOrder = i+1; return x;});
        axios.put("/api/endpoint/", newDisNumbs)
            .then(resp =>{this.setInput();
                this.getMStones(this.props.user); 
            });
    }

    setValue(f, e){
        const input = this.state.input;
        input[f]= e.target.value;
        this.setState({ input });
        this.formValid();
    }

    formValid(){
        if (this.state.input.task === ""){return this.setState({ disabled: true, taskErr: true });
        } else if (this.state.input.instruction === "" ){return this.setState({ disabled: true, instrErr: true });
        } else if (this.state.input.completionGuidelines === "" ){return this.setState({ disabled: true, compGuidErr: true });
        } else if (this.state.input.estCompDate === ""){return this.setState({ disabled: true, estDateErr: true });
        } else {return this.setState({ disabled: false, taskErr: false, instrErr: false, compGuidErr: false, estDateErr: false });}
    }

    render(){
        if (this.state.isLoaded === false && this.props.user !== null){this.getMStones(this.props.user)}
        if (this.state.isLoaded === false){return (<div>loading...</div>);}
        return(
            <div>
                <MStoneBoard
                    mStoneArr={this.state.mStoneArr}
                    drag={this.dragulaDecorator}
                    createTask={this.createTask}
                    getDragItm={this.getDragItm}
                    edtTask={this.edtTask} />
                <Modal>
                    <Form  
                        completionGuidelines={this.state.input.completionGuidelines}
                        projStatDisable={this.state.projStatDisable}
                        projStatusId={this.state.input.projStatusId}
                        estCompDate={this.state.input.estCompDate}
                        instruction={this.state.input.instruction}
                        commonValidate={this.commonValidate}
                        compGuidErr={this.state.compGuidErr}
                        estDateErr={this.state.estDateErr}
                        submitHandle={this.submitHandle}
                        isEdtMode={this.state.isEdtMode}
                        submitDelete={this.submitDelete}
                        disabled={this.state.disabled}
                        instrErr={this.state.instrErr}
                        task={this.state.input.task}
                        submitEdit={this.submitEdit}
                        taskErr={this.state.taskErr}
                        formValid={this.formValid}
                        setValue={this.setValue}
                        show={this.state.isOpen} 
                        onClose={this.onBack} />
                </Modal>
            </div>
        );
    }

    dragulaDecorator = (data) => {
        if (data) {
            window.drake = Dragula({
                revertOnSpill: true,
                isContainer: function (el) {
                    return el.classList.contains('dragula-container');
                },
            });
              
            drake.on('drop', (el, target, source, sibling) => {
                //set moved object and target list id's and set main array
                const movedId = Number(el.id);
                const targetId = Number(target.id);
                const mileStoneArr = this.state.mStoneArr;
                const coptItm = this.state.diffItm;
                const arr = [].concat(...coptItm);

                //set the moved object to the new list
                const crtItm = this.state.crtItm;
                crtItm['milestone'] = targetId;
                this.setState({ crtItm });

                //set the display order of the moved object
                if (sibling === null && targetId === (coptItm.length-1)){ crtItm['displayOrder'] = arr.length+1;
                    this.setState({ crtItm });
                } else if (sibling === null){
                    const arrEnd = coptItm.filter((x, i) => {if (i <= targetId){return x}});
                    const getDispNum = [].concat(...arrEnd);
                    crtItm['displayOrder'] = getDispNum.length+1;
                    this.setState({ crtItm });
                } else {crtItm['displayOrder'] = Number(sibling.value);
                    this.setState({ crtItm });
                }

                //take the moved object out of the main array
                const dropItmPos = arr.map(x => x.id).indexOf(movedId);
                arr.splice(dropItmPos, 1);

                //created a split in the main array to piece in the moved object where it should go
                const stateDO = this.state.crtItm.displayOrder;
                const gtrFilter = arr.filter(x => {if (x.displayOrder >= stateDO){return x;}});
                const lesFilter = arr.filter(x => {if (x.displayOrder < stateDO){return x;}});

                //increment up the display order to make room for the moved object
                const changeDO = gtrFilter.map(x => { ++x.displayOrder; return x;});

                //combine the two arrays and the moved object inbetween then change all the display orders to line up with the index + 1
                const itmToPush = this.state.crtItm;
                const concate = lesFilter.concat(itmToPush, gtrFilter);
                const correctDO = concate.map((x, i) => { 
                    x.displayOrder = i+1; 
                    return x;
                });

                //set state on the new main array
                const items = this.state.items;
                items['items'] = correctDO;
                this.setState({items});

                //get the number of arrays needed then sort all tasks in the correct order in to the correct arrays
                const statusIndex = mileStoneArr.map((x, i) => {return i})
                for (let i = 0; i < statusIndex.length; i++) {
                    sortArrays(statusIndex[i], correctDO, this);
                }
                
                function sortArrays(ind, correctDO, that){
                    const diffItm = that.state.diffItm
                    const newerItm = correctDO.filter(x => {return x.milestone === ind+1});
                    diffItm[ind] = newerItm
                    that.setState({ diffItm });
                }

                //call to change the status of the moved item
                axios.put("/api/endpoint/" + this.state.crtItm.id, this.state.crtItm)
                    .then(resp => resp);
                
                //call to change the display order of all the items in the main array
                axios.put("/api/endpoint/", correctDO)
                    .then(resp => resp);
            });
        }
    };
}
//map Component State to Redux State
function mapStateToProps(state){
    return { 
        user: state.user
    }
}
export default connect(mapStateToProps)(Milestones);