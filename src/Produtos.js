import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import axios from 'axios'
import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

class Produtos extends Component {
    constructor(props){
        super(props)
        this.state = {
            categorias:[],
            cat: ''
        }
    }

    loadCategorias = () => {
        axios
        .get('http://localhost:9000/categorias')
        .then((res) => {
            this.setState({
                categorias:res.data
            })
        })
    }

    componentDidMount(){
        this.loadCategorias()
    }
    handleNewCategoria = (key) => {
        const cat = key.target.value
        this.setState({cat:cat})
        if (key.keyCode === 13) {
            axios
            .post('http://localhost:9000/categorias', 
            {
                categoria: cat
            })
            .then((res) => {
                this.setState({cat: ""})
                this.loadCategorias()
            })
        }
       }
    render() {
        const {match} = this.props
        const {cat, categorias} = this.state
        return (
            <div className="row">
                <div className="col-md-2">
                    <h3>Categorias</h3>
                    <ul>
                        {categorias.map(item => {
                            return <li key={item.id}><Link to={`/produtos/categoria/${item.id}`}>{item.categoria}</Link></li>
                        })}
                    </ul>
                    <div className="well well-sm">
                    <input
                    onKeyUp={this.handleNewCategoria}
                    onChange={this.handleNewCategoria}
                    value={cat}
                    type="text" 
                    placeholder="Nova categoria"
                    className="form-control"/>
                    </div>
                </div>
                <div className="col-md-10">
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome}/>
                    <Route exact path={`${match.url}/categoria/:catId`}  component={Categoria}/>
                </div>
            </div>
        )

    }
}

export default Produtos