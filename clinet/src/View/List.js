import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { Message, Button, Card, Container, Grid, Header, Icon, Segment} from 'semantic-ui-react'
import {getList, changeListStatus, deleteList, changeList, createList} from '../Model/API'
import ChangeList from'./ChangeList'
import CreateTodo from'./CreateTodo'
import 'semantic-ui-css/semantic.min.css'


function User(props){
    const username = props.user;
    if(username){
        return(                 
            <Header.Subheader>
                Hello {username} Welcome Back to Your TodoList {'>'}_{'<'}!
            </Header.Subheader>
        );
    }
    return
}


function TodoList(props){
    return(
    <Card  className={props.Lists.Status == "open"? "ui yellow card": "ui green card"}>
        <Card.Content textAlign="center">
            <Button icon floated='right'
            onClick={()=>props.deleteTodo(props.Lists.ID, props.Lists.UserName)}>
                <Icon name='delete' />
            </Button>
            <Card.Header style={{ "fontSize":"40px", "marginLeft":"39.5px"}}>{props.Lists.List}</Card.Header>
         </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic color='green' className={props.Lists.Status=="success"? "disabled" : ""}
                onClick = {()=>props.completeTodo(props.Lists.ID, props.Lists.UserName, props.Lists.List)}>
                    已完成
                </Button>
                <ChangeList Lists={props.Lists} changeTodo={props.changeTodo} />
            </div>
        </Card.Content>
  </Card>);
}
function AllLists(props){
    if(!props.allList.length) return null;
    
    return(
        <Card.Group centered itemsPerRow='3'>
          {
            props.allList.map ((_,index) =>{    
                return(<TodoList key={props.allList[index].ID} Lists={props.allList[index]} completeTodo={props.completeTodo} deleteTodo={props.deleteTodo} changeTodo={props.changeTodo}/>)
            })
          }
        </Card.Group>
    );
}

const List = () => {
    // const location = useLocation()

    const [username,setusername] = useState("");
    const [allList, setAllList] = useState([]);

    const completeTodo = (ID, UserName, Status)=>{
        changeListStatus(ID, UserName, Status)
        .then((res)=> console.log(res))
        .then(getList)
        .then((res)=>{
            setAllList([...res.AllList]);
        });
    }

    const deleteTodo = (ID, UserName) =>{
        deleteList(ID, UserName)
        .then(getList)
        .then((res)=>{
            setAllList([...res.AllList]);
        });
    }

    const changeTodo = (ID, UserName, List) =>{
        changeList(ID, UserName, List)
        .then(getList)
        .then((res)=>{
            setAllList([...res.AllList]);
        });

    }

    const createTodo = (UserName, List)=>{
        createList(UserName, List)
        .then(getList)
        .then((res)=>{
            setAllList([...res.AllList]);
        });
    }

    useEffect(()=>{
        getList()
        .then((res)=>{
            setusername(res.username);
            setAllList([...res.AllList]);
            
        });
        
    },[]);
    return(
        
        <Container>
    
            <Header as='h1' icon textAlign='center'>
                <Icon name='unordered list' circular />
                <Header.Content>List</Header.Content>
                <User user={username}/>
            </Header>
            <Container textAlign='right' style={{height: "50px"}}><CreateTodo userName={username} createTodo={createTodo}/></Container>
            
            
            <AllLists allList={allList} completeTodo={completeTodo} deleteTodo={deleteTodo} changeTodo={changeTodo}/>
            
        </Container>
    )
}
export default List
// {<Button> <Icon name='edit' />新增ToDo</Button>}