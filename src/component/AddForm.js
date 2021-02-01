import React, { Component } from "react";
import "../App.css";
class AddForm extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      id : '',
      name:'',
      status: false,
    }
  }

  onChange=(event)=>{
      var target=event.target;
      var name=target.name;
      var value=target.value;
      if(name==='status')
      {
        value=target.value==='true'?true:false;
      }
      this.setState({
        [name]:value
      });
  }
  onCloseForm=()=>{
    this.props.onCloseForm();
  }
  onSubmit=()=>
  {
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }
  onClear=()=>{
    this.setState({
        id:'',
        name:'',
        status:false,
    });
  }

  componentWillMount()
  {
    if(this.props.tasks){
      this.setState({
        id:this.props.tasks.id,
        name:this.props.tasks.name,
        status:this.props.tasks.status,
      });
      console.log(this.state);
    }
  }
  componentWillReceiveProps(nextProps)
  {
    if(nextProps&&nextProps.tasks)
    {
      this.setState({
        id:nextProps.tasks.id,
        name:nextProps.tasks.name,
        status:nextProps.tasks.status,
      });
    }
    else if(!nextProps.tasks)
    {
      this.setState({
        id:'',
        name:'',
        status:false,
      });
    }
  }
  render() {
    var{id}=this.state;
    return (
        <div className="card">
        <div className="card-header">
          <h3 className="panel-title">{id!== ''?'Cập nhật công việc' : 'Thêm công việc'}
          <span className="fa fa-times-circle text-right" onClick={this.onCloseForm} /></h3>
          
        </div>
        <div className="card-body">
            <div className="form-group">
              <label>Tên :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />{/**Lấy giá trị form phải có name */}
            </div>
            <label>Trạng Thái :</label>
            <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning" onClick={this.onSubmit}>
              <span className="fa fa-plus IconThem" />{id!== ''?'Cập nhật' : 'Thêm'}
              </button>
              &nbsp;
              <button type="submit" className="btn btn-danger" onClick={this.onClear}>
                <span className="fa fa-times-circle IconHuy"/>Hủy Bỏ
              </button>
            </div>
        </div>
      </div>
    );
  }

}

export default AddForm;
