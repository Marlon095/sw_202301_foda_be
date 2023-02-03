import express from 'express';
const router = express.Router();

import { usuarios, user } from '@libs/Empresas/Users';

const usuariosModel = new usuarios();

usuariosModel.add({
  código: '',
  nombre: 'Mi Empresa',
  status: 'Activo'
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

router.get('/all', (_req, res) => {
  res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
  const {id: código} = req.params;
  const empresa = usuariosModel.getById(código);
  if(empresa){
    return res.status(200).json(empresa);
  }
  return res.status(404).json({"error":"No se encontró Empresa"});
});

router.post('/new', (req, res) => {
  console.log("usuarios /new request body:", req.body);
  const {
    nombre ="John Doe Corp",
    status = "Activo"
  } = req.body;
  //TODO: Validar Entrada de datos
  const newEmpresa: user = {
    código : "",
    nombre,
    status
  };
  if (usuariosModel.add(newEmpresa)) {
    return res.status(200).json({"created": true});
  }
  return res.status(404).json(
    {"error": "Error al agregar una nueva Empresa"}
  );
});

router.put('/upd/:id', (req, res) => {
  const { id } = req.params;
  const {
    nombre="John Doe Corp",
    status="Activo",
    observacion = ""
  } = req.body;

  const UpdateEmpresa : user = {
    código: id,
    nombre,
    status,
    observacion
  };

  if (usuariosModel.update(UpdateEmpresa)) {
    return res
      .status(200)
      .json({"updated": true});
  }
  return res
    .status(404)
    .json(
      {
        "error": "Error al actualizar Empresa"
      }
    );
});

router.delete('/del/:id', (req, res)=>{
  const {id : código} = req.params;
  if(usuariosModel.delete(código)){
    return res.status(200).json({"deleted": true});
  }
  return res.status(404).json({"error":"No se pudo eliminar Empresa"});
});

export default router;