import { json } from "react-router-dom";
import { Loader } from "semantic-ui-react";

export const login = (Account, Password) => {
    return fetch(`http://localhost:8080/login`,{
        method : "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify({
            Account,
            Password,
        }),
    })
    .then((res)=>res.json());
};

export const getMe = () => {
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/user`,{
        method:"GET",
        headers:{
            Authorization: `${token}`,
        },
    })
    .then((res)=>res.json());
}

export const createUser = (UserName, PassWord)=>{
    return fetch(`http://localhost:8080/createuser`,{
        method : "POST",
        headers:{
            "content-type":"application/json",
        },
        body: JSON.stringify({
            UserName,
            PassWord,
        }),
    })
    .then((res)=>res.json());
}

export const getList = ()=>{
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/list/allList`,{
        method : "GET",
        headers:{
            "content-type":"application/json",
            Authorization: `${token}`,
        },
    })
    .then((res)=>res.json());
}

export  const changeListStatus = (ID, userName, List)=>{
    const token = localStorage.getItem("token");
    return fetch(`http://localhost:8080/list/changeStatus`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json",
            Authorization:`${token}`,
        },
        body:JSON.stringify({
            ID,
            userName,
            List
        }),
    })
    .then((res)=>res.json());
}

export const deleteList = (ID, userName) =>{
    const token = localStorage.getItem("token");

    return fetch(`http://localhost:8080/list/deleteList`,{
        method:"DELETE",
        headers:{
            "content-type":"application/json",
            Authorization:`${token}`,
        },
        body:JSON.stringify({
            ID,
            userName,
        }),
    })
    .then((res)=>res.json());
}

export const changeList = (ID, userName, list) =>{
    const token = localStorage.getItem("token");

    return fetch(`http://localhost:8080/list/changeList`,{
        method:"PATCH",
        headers:{
           "content-type" :"application/json",
           Authorization:`${token}`,
        },
        body:JSON.stringify({
            ID,
            userName,
            list,
        }),
    })
}

export const createList = (userName, list) =>{
    const token = localStorage.getItem("token");

    return fetch(`http://localhost:8080/list/createList`,{
        method:"POST",
        headers:{
           "content-type" :"application/json",
           Authorization:`${token}`,
        },
        body:JSON.stringify({
            userName,
            list,
        }),
    })
}