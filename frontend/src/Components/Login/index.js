import { Component } from "react";
import Cookies from 'js-cookie';
import withRouter from "../Wraper"
import "./index.css"



class Login extends Component{
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

    onClickSignup = ()=>{
        const {navigate}= this.props
        navigate("/register")
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
            const user = {userName,password}
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user),
            }
            const response= await fetch("/login",options)
            const data = await response.json()
            if (response.ok) {
                Cookies.set('token', data.token, { expires: 7 })
                //localStorage.setItem('token', data.token); 
                alert('Login successful!');
            } else {
                alert('Login failed: ' + data.message);
            }
            const {navigate} = this.props
            navigate("/")
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
            <h3 className="heading-login">Login</h3>
            <form onSubmit={this.onSubmitLoginForm}>
                <label htmlFor="username">UserName</label>
                <input value={valuea} onChange={this.onChangeUsername} className="input" id="username" type="text"/>
                {emptyName && <p className="error">*enter username</p>}
                <label htmlFor="password">Password</label>
                <input value={valueb} onChange={this.onChangePassword} className="input" id="password" type="password"/>
                {emptypassword && <p className="error">*enter password</p>}
                <button className="login-button" type="submit">Login</button>
                {code!==200 && <p className="error-2">*Incorrect userDetails</p>}
            </form>
            <div style={{textAlign:"center"}}>
            <button onClick={this.onClickSignup} style={{borderStyle:"solid",borderWidth:"0.5px",borderRadius:"5px"}}>Sign Up</button>
            </div>
        </div>
        </div>
    }
}

export default withRouter(Login)