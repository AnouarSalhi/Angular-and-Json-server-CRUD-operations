import { Component, OnInit } from '@angular/core';
import { CommandeInterface } from 'src/app/models/commande-interface';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
commands:any=[];
newCommand:any={
  "id":"",
  "name":"",
  "price":""
};
updateClicked=false;
  constructor(private commandeService:CommandeService) { }

  ngOnInit(): void {
    this.getComandes();
  }
  getComandes(){
    this.commandeService.getAll().subscribe(data=>{
      this.commands=data;
    })
  }

  deleteCommande(id:number){
     this.commandeService.delete(id).subscribe(()=>{
       this.commands=this.commands.filter((c:any)=>c.id!=id)
     });
  }
  addCommande(){
    this.commandeService.addCommand(this.newCommand).subscribe((c)=>{
      this.commands=[c,...this.commands];
      this.EmptyInputs();
    });
  }

  EmptyInputs(){
    this.newCommand={
      "id":"",
      "name":"",
      "price":""
    };
  }

  updateShow(c:any){
    this.newCommand=c;
    this.updateClicked=true;
  }

  updateData(){
   this.commandeService.updateCommand(this.newCommand).subscribe(command=>{
     this.EmptyInputs();
     this.updateClicked=false;
   })
  }

  cancelUpdate(){
    this.EmptyInputs();
    this.updateClicked=false;
  }
}
