export interface user {
    código: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;
  }
  
  
  export class usuarios {
  
    private usuarios : user[];
    constructor(){
      this.usuarios = [];
    }
    getAll(){
      return this.usuarios;
    }
    getById(código: string){
      const usuarioToReturn = this.usuarios.find((emp)=>{
        return emp.código === código;
      });
      return usuarioToReturn;
    }
    add(nuevausuario : user) {
      const date = new Date();
      const nueva: user = {
        ...nuevausuario,
        código: (Math.random()* 1000).toString()+new Date().getTime().toString(),
        created: date,
        updated: date
      }
      this.usuarios.push(nueva);
      return true;
    }
  
    update(updateusuario: user){
      const newusuarios: user[] = this.usuarios.map((emp)=>{
        if ( emp.código === updateusuario.código ) {
          return {...emp, ...updateusuario, updated: new Date()};
        }
        return emp;
      });
      this.usuarios = newusuarios;
      return true;
    }
    delete(código: string){
      const usuarioToDelete = this.usuarios.find((emp)=>{
        return emp.código === código;
      });
      if(usuarioToDelete){
        const newusuarios: user[] = this.usuarios.filter((emp)=>{
          return emp.código !== código;
        });
        this.usuarios = newusuarios;
        return true;
      }
      return false;
    }
  }