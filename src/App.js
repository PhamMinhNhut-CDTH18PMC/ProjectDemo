import React, { Component } from "react";
import AddForm from "./component/AddForm";
import "./App.css";
import Control from "./component/Control";
import TaskList from "./component/TaskList";
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state=
        {
          tasks:[],
          isDislayForm:false,
          TaskEditing:null,
          fitler:{
            name:'',
            status:-1,
          },
          keyword:'',
          sortBy:'name',
          sortValue:1
        }
  }
 componentWillMount()
 {
   if(localStorage&& localStorage.getItem('tasks'))
   {
     var tasks=JSON.parse(localStorage.getItem('tasks'));
     this.setState({
        tasks:tasks
     });
   }
  }
  onGenerateData=()=>
  {
    var tasks=[
      {
        id:this.GenerateID(),
        name:'Lập trình reactJs',
        status:true,
      },
      {
        id:this.GenerateID(),
        name:'Lập trình C++',
        status:true,
      }, {
        id:this.GenerateID(),
        name:'Lập trình Laravel',
        status:false,
      },
    ];
  this.setState(
    {
      tasks:tasks
    }
  );
  localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  randomId()
  {
      return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }

  GenerateID()
  {
    return this.randomId()+this.randomId()+'-'+this.randomId()+'-'+this.randomId()+'-'+this.randomId()+'-'+this.randomId();
  }
  onToggleForm=(event)=>{
    if(this.state.isDislayForm && this.state.TaskEditing!==null)
    {
      this.setState({
        isDislayForm:true,
        TaskEditing:null,
     });
    }
    else
    {
      this.setState({
        isDislayForm:!this.state.isDislayForm,
        TaskEditing:null,
     });
    }
      
  }
  onCloseForm=()=>{
   
    this.setState({
      isDislayForm:false,
   });
  }
  onSubmit=(data)=>{
    var {tasks}= this.state;
    if(data.id==='')
    {
      // thêm
      data.id=this.GenerateID();
      tasks.push(data);
    }
    else{
      //cập nhật
      var index=this.findIndex(data.id);
      tasks[index]=data;
    }

    this.setState({
      tasks:tasks,
      TaskEditing:null
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  findIndex = (id) =>{
    var{tasks} = this.state;
    var result=-1;
    tasks.forEach((tasks,index)=>{
      if(tasks.id===id)
      {
        result=index;
      }
    });
    return result;
  }
  onDelete=(id)=>{
    var {tasks}=this.state;
    var index=this.findIndex(id);
    console.log(index)
    if(index!==-1)
    {
      tasks.splice(index,1);
      this.setState({
          tasks:tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  onUpdate=(id)=>{
     var {tasks}=this.state;
      var index=this.findIndex(id);
      var TaskEditing=tasks[index];
      this.setState({
        TaskEditing : TaskEditing,
      });
      this.onShowForm();
    }
    onShowForm=()=>
    {
      this.setState({
          isDislayForm:true
      });
    }
    onFitler=(filterName,fitlerStatus)=>
    {
          fitlerStatus =parseInt(fitlerStatus,10);
          this.setState({
              fitler:{
                name:filterName.toLowerCase(),
                status:fitlerStatus,
              }
          });
        
    }
    onSearch=(keyword)=>{
     this.setState({
        keyword:keyword,
     });
    }
 onSort=(sortBy,sortValue)=>{
    this.setState({
        sortBy:sortBy,
        sortValue:sortValue
    }); 
    console.log(this.state)
}
  render() 
  {
    var {tasks,isDislayForm,TaskEditing,fitler,keyword,sortBy,sortValue}=this.state; //var tasks=this.state.tasks;
    if(fitler)
    {
      if(fitler.name)
      {
        tasks=tasks.filter((tasks)=>{

            return tasks.name.toLowerCase().indexOf(fitler.name)!==-1;  
        });
      }
      tasks=tasks.filter((tasks)=>{
          if(fitler.status==-1)
          {
            return tasks;
          }
          else 
          {
            return tasks.status===(fitler.status===1 ? true: false);
          }
      });
    }
    if(keyword)
    {
      tasks=tasks.filter((tasks)=>{
        return tasks.name.toLowerCase().indexOf(keyword)!==-1;  
      });
    }
    if(sortBy==='name')
    {
      tasks.sort((a,b)=>{
          if(a.name>b.name)
          return -sortValue;
          else if(a.name<b.name)
          return sortValue;
          else return 0;
      });
    }else{
      tasks.sort((a,b)=>{
        if(a.status>b.status)
        return -sortValue;
        else if(a.status<b.status)
        return sortValue;
        else return 0;
    });
    }
    var elementForm=isDislayForm===true ? <AddForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} tasks={TaskEditing}/> : '';
    return (
      <div className="container">
        <div className="text-center">
        <span class="text-primary">Quản Lý Công Việc</span>
          <hr />
        </div>
        <div className="row">
          <div className={isDislayForm ?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
              {elementForm}
          </div>
          <div className={isDislayForm ?"col-xs-8 col-sm-8 col-md-8 col-lg-8" :"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus btnThemCongViec" />Thêm Công Việc
            </button>
            
            <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
            <TaskList tasks={tasks} onDelete={this.onDelete} onUpdate={this.onUpdate} onFitler={this.onFitler}/>
          </div>
        </div>
      </div>
    );
  }

  //danh sách các product
}

export default App;
