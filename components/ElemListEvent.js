import {Text, View} from "react-native";
import React,{Component} from "react";
import moment from "moment";
import 'moment/locale/fr';


moment.locale('fr');

class ElemListEvent extends Component{

constructor(props) {
    super(props);
}

day(){
    return moment(Date.parse(this.props.event.dateHeureDebut)).format('ddd');
}

date(){
        return moment(Date.parse(this.props.event.dateHeureDebut)).format('DD/MM/YYYY');
    }

    render() {
        return(
            <View
            style={{backgroundColor:'#FFF6C9',
                    borderRadius:30,
                    display:"flex",
                    margin:5,
                    marginLeft:15,
                    marginRight:15,
                    padding:15

            }}>
                <Text
                    style={{fontSize:20}}>
                    {this.props.event.nom}
                </Text>
                {/*<Text>{this.props.event.infosSortie}</Text>*/}
                <Text>{this.day()+' '+this.date()}</Text>
                <View style={{display:'flex',

                }}>

                </View>

            </View>
        )
    }




}

export default ElemListEvent;
