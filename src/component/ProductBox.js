import React, { Component } from 'react'
export class ProductBox extends Component {
    Url = 'http://localhost:9000/products';

    state = {
        products: [],
        message: {
            text: '',
            alert: ''
        }
    }
   
    componentDidMount() {
        fetch(this.Url)
            .then(response => response.json())
            .then(products => this.setState({ products }))
            .catch(e => console.log(e));
    }
    save = (product) => {
        let data = {
            id: parseInt(product.id),
            description: product.description,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity),
        };
        console.log(data);

        const requestInfo = {
            method: data.id !== 0? 'PUT': 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        if(data.id === 0) {
            // CREATE NEW PRODUCT
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newProduct => {
                let { products } = this.state;
                products.push(newProduct);
                this.setState({ products, message: { text: 'Novo produto adicionado com sucesso!', alert: 'success' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        } else {
            // EDIT PRODUCT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedProduct => {
                let { products } = this.state;
                let position = products.findIndex(product => product.id === data.id);
                products[position] = updatedProduct;
                this.setState({ products, message: { text: 'Produto atualizado com sucesso!', alert: 'info' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        }
    }

    delete = (id) => {
        fetch(`${this.Url}/${id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const products = this.state.products.filter(product => product.id !== id);
                this.setState({ products,  message: { text: 'Produto deletado com sucesso.', alert: 'danger' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: '', alert: ''} });
        }, duration);
    }
    render() {
        return (
            <div>
                 {
                    this.state.message.text !== ''? (
                        <alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </alert>
                    ) : ''
                }

                <div className="row">
    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Produtos </h2>
                        <formProduct productCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Lista de Produtos </h2>
                        <listProduct products={this.state.products}  deleteProduct={this.delete} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductBox
