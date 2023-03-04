import express from 'express';
const router = express.Router();
import { UsersDao } from '@dao/models/Users/UsersDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUser } from '@dao/models/Users/IUsers';
import { Usuarios } from '@libs/Users/Users';
const usersDao = new UsersDao(MongoDBConn);
let usuariosModel:Usuarios;
usersDao.init().then(()=>{
  usuariosModel = new Usuarios(usersDao);
});

//registrar los endpoint en router
//http://localhost:3001/usuarios
router.get('/', (_req, res)=>{
  const jsonUrls = {
    "getAll": {"method":"get", "url": "usuarios/all"},
    "getById": {"method":"get", "url": "usuarios/byid/:id"},
    "new": {"method":"post", "url": "usuarios/new"},
    "update": {"method":"put", "url": "usuarios/upd/:id"},
    "delete": {"method":"delete", "url": "usuarios/del/:id"},
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await usuariosModel.getAll());
});

router.get('/byid/:id', async (req, res)=>{
  const {id: codigo} = req.params;
  const usuario = await usuariosModel.getById(codigo);
  if(usuario){
    return res.status(200).json(usuario);
  }
  return res.status(404).json({"error":"No se encontró Usuario"});
});

router.post('/new', async (req, res) => {
  console.log("Usuarios /new request body:", req.body);
  const {
    codigo = "NA",
    nombre ="Marie B",
    status = "Activo",
    correo ="bella@ejemplo.edu",
    contraseña = "12345"
  
  } = req.body;
  //TODO: Validar Entrada de datos
  const newUsuario: IUser = {
    codigo,
    nombre,
    contraseña,
    correo,
    status
  };
  if (await usuariosModel.add(newUsuario)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Empresa"}
  );
});

router.put('/upd/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre="----NotRecieved------",
    status="----NotRecieved------",
    codigo = "",
    correo = "",
    contraseña = "",
    observacion = "",
  } = req.body;

  if (
    nombre === "----NotRecieved------"
    || status === "----NotRecieved------"
  ) {
    return res.status(403).json({"error":"Debe venir el nombre y status correctos"});
  }
  const UpdateUsuario : IUser = {
    codigo,
    nombre,
    correo,
    contraseña,
    status,
    observacion
  };

  if (await usuariosModel.update(id, UpdateUsuario)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Usuario"
      }
    );
});

router.delete('/del/:id', async (req, res)=>{
  const {id } = req.params;
  if(await usuariosModel.delete(id)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar el Usuario"});
});
/*
router.get('/', function(_req, res){

});
 */

export default router;
