import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandeInterface } from '../models/commande-interface';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  urlApi="http://localhost:3000/commands";
  constructor( private http:HttpClient) { }

  getAll(){
   return  this.http.get<CommandeInterface>(this.urlApi);
  }

  delete(id:number){
    return this.http.delete(this.urlApi+"/"+id);
  }

  addCommand(command:CommandeInterface){
       return this.http.post(this.urlApi,command)
  }
  updateCommand(command:CommandeInterface){
    return this.http.patch(this.urlApi+"/"+command.id,command)
}
}
