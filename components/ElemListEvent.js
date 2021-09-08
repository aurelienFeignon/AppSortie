import {Text, View} from "react-native";
import React,{Component} from "react";

class ElemListEvent extends Component{

constructor(props) {
    super(props);
}

    render() {
        return(
            <View
            style={{backgroundColor:'#FFF6C9',
                    borderRadius:30,
                    display:"flex",
                    margin:15,
                    padding:15

            }}>
                <Text
                    style={{fontSize:20}}>
                    {this.props.event.nom}
                </Text>
                <Text>{this.props.event.infosSortie}</Text>
                <Text>{this.props.event.dateHeureDebut}</Text>
                <View style={{display:'flex',

                }}>

                </View>

            </View>
        )
    }




}

export default ElemListEvent;
