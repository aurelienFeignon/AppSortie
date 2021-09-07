import {Ville} from "./Ville";
import {Sortie} from "./Sortie";

export class Lieu{
    id: number;
    nom: string;
    rue: string;
    latitude: number;
    longitude: number;
    sortie: Array<Sortie>
    ville: Ville;
}
