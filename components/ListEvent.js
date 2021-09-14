import React, {Component, useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import Axios from "axios";
import ElemListEvent from "./ElemListEvent";
import { FloatingAction } from "react-native-floating-action";

class ListEvent extends Component{

    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }

// <FloatingAction
// actions={{text: "add Event",
//     name:"add_event"}}
// onPressItem={()=>{
//     props.navigation.navigate('AddEvent');
// }
// }/>

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

   renderItem2= ({item})=>(<ElemListEvent event={item}/>);

    render() {
        const {data}= this.state;

        return(
            <View>
                <FlatList
                    data={data}
                    renderItem={this.renderItem2}
                    keyExtractor={(item,index) => index.toString()}
                />

            </View>
        )
    }


}

export default ListEvent;
