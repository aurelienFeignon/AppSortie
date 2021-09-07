import {User} from "./User";
import {Sortie} from "./Sortie";

export class Campus{
    id: number;
    nom: string;
    participants: Array<User>;
    sorties: Array<Sortie>;

}
