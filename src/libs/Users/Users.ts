import { IUser } from "@dao/models/Users/IUsers";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Usuarios {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevousuario: IUser) {
    const date = new Date();
    const nueva: IUser = {
      ...nuevousuario,
      created: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateUsuario: IUser) {
    const updateObject = { ...updateUsuario, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}