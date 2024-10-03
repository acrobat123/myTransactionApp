import { Component } from "react"

import withRouter from "../Wraper"

import "./index.css"

import "bootstrap/dist/css/bootstrap.css"

class AddTransition extends Component{
  
state = {
  amount:"",
  description:"",
  type:"Credit",
}

onChangeType = event=>{
this.setState({type:event.target.value})
}

  onSubmitAddingTransition =async event=>{
    event.preventDefault()
    const {amount,type,description} = this.state
    const url = "/addtransition"
    const transitionDetails = {type,amount,description}
    const options = {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(transitionDetails),
    }
    
    const response = await fetch(url,options)
    const {navigate} = this.props
    navigate("/")
  }
  onChangeAmount =Event =>{
    this.setState({amount:Event.target.value})
  }

  onChangeDescription = Event=>{
    this.setState({description:Event.target.value })
  }
  render(){
  return(<div className = "transition-container">
<h2>New Transaction</h2>
<form onSubmit={this.onSubmitAddingTransition}>
  <label style={{color:"#403e3a"}} htmlFor = "typeTransition">Transaction type</label>
    <select onChange={this.onChangeType} id = "typeTransition">
      <option value="Credit">Credit</option>
      <option value="Debit">Debit</option>
    </select>
    <br/>
    <label style={{color:"#403e3a"}} htmlFor="amount">Amount</label>
    <input onChange={this.onChangeAmount} id = "amount"/>
    <br/>
    <label style={{color:"#403e3a"}} htmlFor="description">Description</label>
    <input onChange={this.onChangeDescription} className="des" id = "description" type= "text"/>
    <br/>
    <button className="btn btn-primary" type="submit">Save</button>
</form>
</div>)
}
}
export default withRouter(AddTransition)