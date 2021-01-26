import React, { Component } from "react";

class Input extends Component {
    constructor(props)
  {
    super(props);
    this.inputRef=React.createRef();
  }
//   componentDidMount()
//   {
//     this.inputRef.current.focus();
//     console.log(this.inputRef)
//   }
  clickHandler=()=>{
    console.log(this.inputRef.current.value);

  }
  render() {
    return (
      <div className="col-12">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Thêm sản phẩm</label>
            <input
              type="Text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Nhập tên sản phẩm"
             ref={this.inputRef}
            />
            {/**key này là người dừng tự quy định sau này gọi lại */}
          </div>
          {/**chổ này để nút button nha!! */}
          <button
            type="submit"
            className="btn btn-primary" onClick={this.clickHandler}>
            Lưu sản phẩm
          </button>
      </div>
    );
  }
}

export default Input;
