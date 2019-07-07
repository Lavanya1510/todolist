import React, { Component } from 'react';
import pubsub from 'pubsub';

export class ListProduct extends Component {
    state = {
        products:[]
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

export default ListProduct;
