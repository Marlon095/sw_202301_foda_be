import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IUser } from "./IUsers";

export class UsersDao extends MongoDAOBase<IUser>{
  constructor(conexion: IDBConnection){
      super("usuarios", conexion);
  }
}
