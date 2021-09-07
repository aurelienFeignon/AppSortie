import {Campus} from "./Campus";
import {Sortie} from "./Sortie";

export class User{
    id: number;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    password: string;
    telephone: string;
    cheminImg: string;
    administrateur: boolean;
    actif: boolean;
    apiToken:string;
    role:Array<string>;
    campus: Campus;
    sorties: Array<Sortie>;
    sortiesOrganisees:Array<Sortie>;

    constructor() {
    }
}
