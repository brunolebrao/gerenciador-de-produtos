import React, {Component} from 'react'
import axios from 'axios'

class Categoria extends Component {
  constructor(props) {
    super(props)
    this.state = {
      produtos: [],
      categoria:{}
    }
  }
  loadData = (id) => {
    axios
    .get(`http://localhost:9000/produtos?categoria=${id}`)
    .then((res) => {
      this.setState({produtos: res.data})
    })
    axios
    .get(`http://localhost:9000/categorias/${id}`)
    .then((res) => {
      this.setState({categoria: res.data})
    })
  }

  componentDidMount = () => {
    const id = this.props.match.params.catId
    this.loadData(id)
  }

  componentWillReceiveProps = (nextProps) => {
    this.loadData(nextProps.match.params.catId)
  }
  
  render() {
    const {produtos, categoria} = this.state
    return (
      <div>
        <h1>{categoria.categoria}</h1>
          {produtos.map(item => {
            return <p key={item.id} className="well well-sm">{item.produto}</p>
          })}
      </div>
    )
  }
}

export default Categoria