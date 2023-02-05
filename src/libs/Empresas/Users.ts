export interface user {
    código: string;
    correo: string;
    nombre: string;
    password: string;
    roles?: string;
    status: string;
    created?: Date;
    updated?: Date;
    ultimoAcceso?: string;
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
      const usuarioToReturn = this.usuarios.find((us)=>{
        return us.código === código;
      });
      return usuarioToReturn;
    }
    add(nuevousuario : user) {
      const date = new Date();
      const nuevo: user = {
        ...nuevousuario,
        código: (Math.random()* 1000).toString()+new Date().getTime().toString(),
        created: date,
        updated: date
      }
      this.usuarios.push(nuevo);
      return true;
    }
  
    update(updateusuario: user){
      const newusuarios: user[] = this.usuarios.map((us)=>{
        if ( us.código === updateusuario.código ) {
          return {...us, ...updateusuario, updated: new Date()};
        }
        return us;
      });
      this.usuarios = newusuarios;
      return true;
    }
    delete(código: string){
      const usuarioToDelete = this.usuarios.find((us)=>{
        return us.código === código;
      });
      if(usuarioToDelete){
        const newusuarios: user[] = this.usuarios.filter((us)=>{
          return us.código !== código;
        });
        this.usuarios = newusuarios;
        return true;
      }
      return false;
    }
  }