import {Campus} from "./Campus";
import {Etat} from "./Etat";
import {User} from "./User";
import {Lieu} from "./Lieu";

export class Sortie{
    id: number;
    nom: string;
    dateHeureDebut: Date;
    duree: number;
    nbInscriptionMax: number;
    infosSortie: string;
    participants: Array<User>;
    organisateur: User;
    etat: Etat;
    dateLimiteInscriptions: Date;
    campus: Campus;
    lieu:Lieu;
    motif: string;
}
