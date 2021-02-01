import React, { Component } from "react";
import "../App.css";
import TaskItem from "./TaskItem";
class TaskList extends Component {
  constructor(props)
  {
    super(props);
    this.state={
        fitlerName:'',
        fitlerStatus: -1, // tất cả là -1, hoạt động là 1 , không hoạt động là 0
    }
  }
  onChange=(event)=>
  {
    var target=event.target;
    var value=target.value;
    var name=target.name;
    this.props.onFitler (name==='fitlerName' ?  value : this.state.fitlerName,
                        name==='fitlerStatus'? value : this.state.fitlerStatus,)
    this.setState({
        [name]:value
    });
  }
  render()
   {
     var {fitlerStatus,fitlerName}=this.state;
    var {tasks}=this.props;
    var elementItem=tasks.map((tasks, index)=>{
        return <TaskItem key={tasks.id} index={index} tasks={tasks} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}/>
    });
    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input type="text" className="form-control"  name="fitlerName" value={fitlerName} onChange={this.onChange}/>
                </td>
                <td>
                  <select className="form-control" name="fitlerStatus" value={fitlerStatus} onChange={this.onChange}>
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {/** List item */}
              {elementItem}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  //danh sách các product
}

export default TaskList;
