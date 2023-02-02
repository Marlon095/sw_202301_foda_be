export interface IEmpresa {
    código: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;
  }
  
  
  export class Empresas {
  
    private empresas : IEmpresa[];
    constructor(){
      this.empresas = [];
    }
    getAll(){
      return this.empresas;
    }
    getById(código: string){
      const empresaToReturn = this.empresas.find((emp)=>{
        return emp.código === código;
      });
      return empresaToReturn;
    }
    add(nuevaEmpresa : IEmpresa) {
      const date = new Date();
      const nueva: IEmpresa = {
        ...nuevaEmpresa,
        código: (Math.random()* 1000).toString()+new Date().getTime().toString(),
        created: date,
        updated: date
      }
      this.empresas.push(nueva);
      return true;
    }
  
    update(updateEmpresa: IEmpresa){
      const newEmpresas: IEmpresa[] = this.empresas.map((emp)=>{
        if ( emp.código === updateEmpresa.código ) {
          return {...emp, ...updateEmpresa, updated: new Date()};
        }
        return emp;
      });
      this.empresas = newEmpresas;
      return true;
    }
    delete(código: string){
      const empresaToDelete = this.empresas.find((emp)=>{
        return emp.código === código;
      });
      if(empresaToDelete){
        const newEmpresas: IEmpresa[] = this.empresas.filter((emp)=>{
          return emp.código !== código;
        });
        this.empresas = newEmpresas;
        return true;
      }
      return false;
    }
  }