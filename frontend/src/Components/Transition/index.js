import { Component } from "react"

import withRouter from "../Wraper"

import "./index.css"

import "bootstrap/dist/css/bootstrap.css"


const EachTransition = props =>{
    const {transitionData} = props
    const {type,amount,description,date,running_balance} = transitionData

    return (
        <tr>
            <td className="data-table">{date}</td>
            <td className="data-table">{description}</td>
            {type === "Credit"?<td className="data-table">{amount}</td>:<td className="data-table"></td>}
            {type === "Debit"?<td className="data-table">{amount}</td>:<td className="data-table"></td>}
            <td className="data-table">{running_balance}</td>
        </tr>
    )
}

class Transition extends Component{

    state = {
        list_a:[]
    }

    getTransactions = async()=>{
       const url = "/transitions"
       const options = {
        method: 'GET',
      }
        const response = await fetch(url,options)
        const data = await response.json()
        this.setState({list_a:data})
    }

    onClickTransitionBtn = ()=>{
        const {navigate} = this.props
        navigate("/addtransition")
        
    }

    componentDidMount(){

        this.getTransactions()
        
    }


    render(){
        const {list_a} = this.state
        return(
            <div className="container">
                <h2 className="heading">Transaction Assignment
                </h2>
                <table className="table">
              <tr>
                <th className="w-25 data-table">Office Transactions</th>
                <th className="w-30 data-table"></th>
                <th className="w-10 data-table">Credit</th>
                <th className="w-10 data-table">Debit</th>
                <button onClick={this.onClickTransitionBtn} className="add-transition-btn">+ Add Transaction</button>
              </tr>
                {list_a.map(each=>(
            
                    <EachTransition transitionData = {each} key={each.id} />
                ))}
              
            </table>
            
            </div>
            )
    }
}



export default withRouter(Transition)