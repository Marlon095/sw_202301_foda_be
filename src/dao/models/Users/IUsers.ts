/* esta interfa de usuario debe de tener debe de tener:
 nombre
 correo electronico
 contraseña
 estado
 fecha en que fue creado
 fecha de ultima actualizacion
 fecha de ultimo cambio de contraseña
 */

 export interface IUser {
    codigo: string;
    nombre: string;
    correo: string;
    ccntraseña: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;
  }