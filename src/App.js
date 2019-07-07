import React, { Component } from 'react';
import Product from './component/Product';
// import ListProduct from './component/ListProduct';
import ProductBox from './component/ProductBox';

export class App extends Component {
  render() {
    return (
      <div>
        <Product />
        {/* <ListProduct /> */}
        <ProductBox />
      </div>
    )
  }
}

export default App
