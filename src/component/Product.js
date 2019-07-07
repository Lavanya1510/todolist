import React, { Component } from 'react';
import pubsub from 'pubsub-js';
export class Product extends Component { state = { 
    model: { 
        id: 0, 
        description: 0,
        price: 0, 
        quantity: 0 
    } 
};
setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
}

create = () => {
    this.setState({ model: { id: 0,  description: 0, price: 0, quantity: 0 } })
    this.props.productCreate(this.state.model);
}

componentWillMount() {
    pubsub.subscribe('edit-product', (topic, product) => {
 //   const { product } = this.props;
        this.setState({ model: product });
    });
}
    render() {
        return (
            <div>
                 <form>
                <formGroup>
                    <label for="description">Description:</label>
                    <input id="description" type="text" value={this.state.model.description} placeholder="Descriptions"
                    onChange={e => this.setValues(e, 'description') } />
                </formGroup>
                <formGroup>
                    <div className="form-row">
                        <div className="col-md-6">
                            <label for="price">Price:</label>
                            <input id="price" type="text"  value={this.state.model.price} placeholder="R$ " 
                            onChange={e => this.setValues(e, 'price') } />
                        </div>
                        <div className="col-md-6">
                            <label for="quantity">Quantity:</label>
                            <input id="quantity" type="text" value={this.state.model.quantity} placeholder="Qtd. de produtos disponíveis" 
                            onChange={e => this.setValues(e, 'quantity') } />
                        </div>
                    </div>
                </formGroup>
                <button color="primary" block onClick={this.create}> save </button>
            </form>
             </div>   
            
        )
    }
}
class ListProduct extends Component {
    state = {
        products: [],
     
    }
    delete = (id) => {
        this.props.deleteProduct(id);
    }

    onEdit = (product) => {
        pubsub.publish('edit-product', product);
      // this.props.edit-product(product);
    }
    render() {
        const { products } = this.props;

        return (
            
                 <table className="table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                        <th>quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products((product) => 
                            <tr key={product.id}>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button color="info" size="sm" onClick={e => this.onEdit(product)}>Editar</button>
                                    <button color="danger" size="sm" onClick={e => this.delete(product.id)}>Deletar</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
                
            
        )
    }
}


export default Product

