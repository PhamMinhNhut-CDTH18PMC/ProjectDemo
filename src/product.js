import { Component } from "react";
class Product extends Component {
  constructor(props)
  {
    super(props);
    this.onClick=this.onClick.bind(this);
  }
  onClick(text){
    alert("Bạn vừa chọn "+text);
  }

  /**
   * 
   */
  render() {
    return ( 
          <div className="container">
                        <div className="row">
                          <div className="row">
                           
                          </div>
                        </div>
                      </div>
    );
  }
}
export default Product;
