import React, {Component, useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import Axios from "axios";
import ElemListEvent from "./ElemListEvent";

class ListEvent extends Component{

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }

    componentDidMount() {
        const axios= Axios.create({
            baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',

        });
        axios.get('/sortie')
            .then((response)=>{
                this.setState({
                    data:response.data,
                })
            })
            .catch(error=>console.log(error))

    }

   renderItem2= ({item})=>(<ElemListEvent key={parseInt(item.key)} event={item}/>);

    render() {
        const {data}= this.state;

        return(
            <View>
                <FlatList data={data} renderItem={this.renderItem2}/>
            </View>
        )
    }


}

export default ListEvent;
