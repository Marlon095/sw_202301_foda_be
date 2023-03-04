import express from 'express';
const router = express.Router();

import { usuarios, user } from '@libs/Empresas/Users';

const usuariosnew = new usuarios();

usuariosnew.add({
  código: '',
  nombre: 'Marie Bella ',
  correo: 'bella@gmail.com',
  password: '123456',
  status: 'Activo'
});
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

router.get('/all', (_req, res) => {
  res.status(200).json(usuariosnew.getAll());
});

router.get('/byid/:id', (req, res)=>{
  const {id: código} = req.params;
  const usuario = usuariosnew.getById(código);
  if(usuario){
    return res.status(200).json(usuario);
  }
  return res.status(404).json({"error":"No se encontró El usuario"});
});

router.post('/new', (req, res) => {
  console.log("usuarios /new request body:", req.body);
  const {
    nombre ="",
    correo = "",
    password= "",
    status = "Activo"
  } = req.body;
  
  const newusuario: user = {
    código : "",
    nombre,
    correo,
    password,
    status
  };
  if (usuariosnew.add(newusuario)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar un nuevo usuario"}
  );
});

router.put('/upd/:id', (req, res) => {
  const { id } = req.params;
  const {
    nombre="",
    status="Activo",
  } = req.body;

  const Updateusuario : user = {
    código: id,
    nombre,
    correo:"",
    password:"",
    status,
  };

  if (usuariosnew.update(Updateusuario)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar usuario"
      }
    );
});

router.delete('/del/:id', (req, res)=>{
  const {id : código} = req.params;
  if(usuariosnew.delete(código)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar usuario"});
});

export default router;