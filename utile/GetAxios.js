import Axios from "axios";

export default function getAxios(){
    return Axios.create({
        baseURL:'https://sheltered-crag-17970.herokuapp.com/api/',
    });
}
