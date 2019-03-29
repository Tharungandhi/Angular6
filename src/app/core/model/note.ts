import { label } from './label';
import { Collaborator } from './collaborator';

export interface Note {
    
    id: string;
    userId:string;
    title:string;
    discription:string;
    archive:boolean;
    inTrash:boolean;
    pinned:boolean;
    color:string;
    labels:label[];
    collaborators:Collaborator[];
    reminder:string;

}