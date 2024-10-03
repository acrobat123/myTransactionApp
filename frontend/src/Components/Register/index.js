import { Component } from "react";
import withRouter from "../Wraper";
import "./index.css"

class Register extends Component{
    state = {
        userName:"",
        password:"",
        emptyName:false,
        emptypassword:false,
        code:200
    }

    onChangeUsername = e=>{
        this.setState({userName:e.target.value})
    }

    onChangePassword = e=>{
        this.setState({password:e.target.value})
    }
    onSubmitLoginForm = async e=>{
        e.preventDefault()
        const {userName,password,emptyName,emptypassword} = this.state
        if (userName==="" && password === ""){
            this.setState({emptyName:true,emptypassword:true})
        }else if(userName===""){
            this.setState({emptyName:true})
        }else if(password===""){
            this.setState({emptypassword:true})
        }else{
            const {userName,password} = this.state
            const data = {userName,password}
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data),
            }
            const response = await fetch("/register",options)
            const {navigate} = this.props
            navigate("/login")
            this.setState({userName:"",password:"",emptyName:false,emptypassword:false,code:response.status})
        }
    }
    render(){
        const {emptyName,emptypassword,userName,password,code} = this.state
        const valuea = userName
        const valueb = password
        console.log(emptyName,emptypassword)
        return <div className="box">
        <div className="login-div">
            <h3 className="heading-login">Register</h3>
            <form onSubmit={this.onSubmitLoginForm}>
                <label htmlFor="username">UserName</label>
                <input value={valuea} onChange={this.onChangeUsername} className="input" id="username" type="text"/>
                {emptyName && <p className="error">*enter username</p>}
                <label htmlFor="password">Password</label>
                <input value={valueb} onChange={this.onChangePassword} className="input" id="password" type="password"/>
                {emptypassword && <p className="error">*enter password</p>}
                <button className="login-button" type="submit">Sign Up</button>
                {code!==200 && <p className="error-2">*This User already exist</p>}
            </form>
        </div>
        </div>
    }
}

export default withRouter(Register)