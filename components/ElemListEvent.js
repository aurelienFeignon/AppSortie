import {Text, View} from "react-native";

const ElemListEvent= (props)=>{

    return(
        <View>
            <Text>{props.event.nom}</Text>
        </View>
    )


}

export default ElemListEvent;
