import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import {createUser} from '../Model/API'
import { Container, Form, Checkbox, Button, Label, Grid} from 'semantic-ui-react'
const List = () => {
    const navigate= useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checkpassword, setCheckpassword] = useState("");
    const [error, setErrorPassword] = useState("");
    const saveSubmit = (e) => {
        e.preventDefault();
        createUser(username,password)
        .then((res)=>{
            if(res.error){
                alert(res.error);
            }else{
                alert("user create success");
                navigate("/login");
            }
         });

    }
    const handleUsername = (e)=>{
        setUsername(e.target.value);
    };
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleCheckPassword = (e)=>{
        setCheckpassword(e.target.value);
    }
    useEffect(() => {
        if(password == checkpassword && password.length != 0){
            setErrorPassword("success");
        }else{
            checkpassword.length == 0 ? setErrorPassword(""):setErrorPassword("error");;
        }
    }, [password,checkpassword]);
    
    return(
        <Container style={{ height: "100vh"}}>
            <Grid container style={{height: "100vh"}}>
                <Grid.Row  centered verticalAlign="middle">
                    <Grid.Column  width={11} color='grey'>
                    <div >
                    <Form onSubmit={saveSubmit}>
                        <Form.Field required inline>
                        <label style={{width:"15%", textAlign:"right"}}>帳號:</label>
                        <input placeholder='Account' style={{width:"30%"}} value={username} onChange={handleUsername}/>
                        <Label pointing='left'>長度為6-12字元，由字母、數字及_符號組成，註冊成功後不能修改。</Label>
                        </Form.Field>
                        <Form.Field required inline>
                        <label style={{width:"15%", textAlign:"right"}}>密碼:</label>
                        <input placeholder='Pass Word' style={{width:"30%"}} value={password} onChange={handlePassword}/>
                        <Label pointing='left' >長度為6-20字元，字母請區分大小寫。。</Label>
                        </Form.Field>
                        <Form.Field required inline>
                        <label style={{width:"15%", textAlign:"right"}} >再次輸入密碼:</label>
                        <input placeholder='Enter the password again' type='password' style={{width:"30%"}} value={checkpassword} onChange={handleCheckPassword}/>
                        {error == "" ?<Label pointing='left' >請再次填寫密碼。</Label>:
                            error == "error"?<Label pointing='left' color='red' >兩次填寫的密碼不一致，請重新填寫！</Label>:
                            <Label pointing='left' color='green' >檢測通過</Label>
                        }
                        </Form.Field>
                        <div style={{textAlign:"center"}}>
                        <Button type='submit' color='orange'>Submit</Button>
                        </div>
                    </Form>
                    </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}
export default List