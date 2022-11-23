import React, { useContext, useState } from 'react'
import { json, useNavigate, useLocation } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import { Message, Button, Form, Container, Grid, Header, Icon} from 'semantic-ui-react'
import { setAuthToken } from '../Model/utils'
import {getMe, login} from '../Model/API'
import { AuthContext } from '../contexts';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("warning");
    const [errorMessage, setErrorMessage] = useState();
    const {user, setUser} = useContext(AuthContext)
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password).then((data)=>{
           if (data.ok === 0){
            return setErrorMessage(data.message);
           } 
           setAuthToken(data.token);
           getMe()
           .then((res)=>{
            if(data.ok !== 1){
                setAuthToken(null)
                setErrorMessage(res.toString());
            }
            errorLogin();
            return res;
          }).then((res)=>{
              console.log("login success: "+res.success);
              if(res.success === true){
                setUser(true);
                // localStorage.setItem('userIsLogin', 'true');
                history("/list");
              }
           });
        });
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const errorLogin = (e)=>{
        setError("error");
    }

    return (
      <Container>
          <Header as='h1' icon textAlign='center'>
              <Icon name='user' circular/>
              <Header.Content>Login todo-List</Header.Content>
          </Header>
          <Grid>
            <Grid.Row centered>
                <Grid.Column textAlign ="center"  width={8}>
                  <Form className={error} onSubmit = {handleSubmit}>
                    <Form.Input
                      inline
                      icon='user'
                      iconPosition='left'
                      label='Username'
                      placeholder='Username'
                      value={username}
                      onChange={handleUsername}
                    />
                    <Form.Input
                      inline
                      icon='lock'
                      iconPosition='left'
                      label='Password'
                      type='password'
                      value={password}
                      onChange={handlePassword}
                    />
                    <Message attached='bottom' warning>
                      <Icon name='help' />
                      已經註冊了嗎?&nbsp;<a href='/createUser'>請在此</a>&nbsp;申請帳號.
                    </Message>
                    <Message attached='bottom' error>
                      <Message.Header>
                        <Icon name='times circle outline' />
                        帳號或密碼錯誤,請確認帳號密碼！
                      </Message.Header>
                      已經註冊了嗎?&nbsp;<a href='/createUser'>請在此</a>&nbsp;申請帳號.
                    </Message>
                    <Button content='Login' primary />
                  </Form> 
                </Grid.Column>
              </Grid.Row>
            </Grid>
      </Container>
    )
}

export default Login