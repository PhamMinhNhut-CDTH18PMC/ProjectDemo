import React,{ Component } from "react";
import "./App.css";
import Input from "./Input";
import Product from "./product";
class App extends Component {
  
render()
  {
    var product = [
      {
        id: 1,
        name: "Apple Iphone 8Plus 64GB",
        image:"https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/1115679429.jpeg",
        price: 8500000,
        status: true,
      },
      {
        id: 2,
        name: "Samsung Galaxy J8 2018 ",
        image:"https://bizweb.dktcdn.net/100/193/082/products/samsung-galaxy-j8-400x460.png?v=1538643059473",
        price: 5500000,
        status: true,
      },
      {
        id: 3,
        name: "Google Pixel 2",
        image:"https://www.viettablet.com/images/thumbnails/480/516/detailed/26/google-pixel-2-xl-viettablet.png",
        price: 4500000,
        status: true,
      },
    ];
  
    let elements = product.map((product, index) => {
      let result="";
     if(product.status)
     {
       result=<Product 
       key={product.id}
       name={product.name}
       image={product.image}
       price={product.price}
        /> 
     }
      return result;
    });

    return (
      <div>
      <Input/>
      <div className="product">
        {elements}
      </div>
      </div>
    );
  }

   
  //danh sách các product

}

export default App;
