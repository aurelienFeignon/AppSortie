import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import Axios from "axios";
import ElemListEvent from "./ElemListEvent";

const ListEvent=()=>{
    const [data, setData]= useState([]);
    const [listElem, setListElem]= useState([]);

    const axios= Axios.create({
        baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

    });

    useEffect(()=>{
       axios.get('/sortie')
           .then((response)=>{
               setData(response.data);
               console.log('testDonne');
               setTimeout(()=>{
                   let list= data.map((elem)=>{
                       return <View><ElemListEvent event={elem}/></View>
                   });
                   setListElem(list);
                   console.log('testDonne2')
                   console.log(list)
                   console.log(listElem);
               },2000)

               // console.log(response.data);
               // constructionlist(data);
           })
           .catch(error=>console.log(error))
    },[]);

    // useEffect(()=>{
    //     console.log('test');
    //     console.log(listElem);
    //     let list= data.map((elem)=>{
    //         <ElemListEvent event={elem}/>
    //     });
    //     setListElem(list)
    //     console.log(listElem);
    //     console.log(list);
    // },[data])

    return(
        <View>
            <Text> Ok deuxieme page</Text>
            {{listElem}}
        </View>
    )
}

export default ListEvent;
