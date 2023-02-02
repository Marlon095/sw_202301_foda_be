import express from 'express';
const router = express.Router();

import { Empresas, IEmpresa} from '@libs/Empresas/Empresas';

const empresasModel = new Empresas();

empresasModel.add({
    código: '',
    nombre: 'Mi empresa',
    status: 'Activo'
});
//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url":"empresas/all"},
        "getById": {"method":"get", "url":"empresas/byid/:id"},
        "new": {"method":"post", "url":"empresas/new"},
        "update": {"method":"put", "url":"empresas/upd/:id"},
        "delete": {"method":"delete", "url":"empresas/del/:id"},
    };
    res.status(200).json(jsonUrls)
})

router.get('/all', (_req, res)=>{
    res.status(200).json(empresasModel.getAll());
});

router.post('/new', (req, res) => {
    console.log("Empresas /new request body:", req.body)
    const {
        nombre="Jonh Doe Corp", 
        status="Activo"
    } = req.body;
    //TODO: Validar Entrada de datos
    const newEmpresa: IEmpresa = {
        código : "",
        nombre,
        status
    };
    if (empresasModel.add(newEmpresa)) {
        res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error":"Error al agregar una nueva Empresa"}
        );
});

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;
    const {
        nombre = "Jonh Doe Corp",
        status = "Activo",
        observacion = ""
    } = req.body;

    const UpdateEmpresa : IEmpresa = {
        código: id,
        nombre,
        status,
        observacion
    };

    if (empresasModel.update(UpdateEmpresa)){
        return res
        .status(200)
        .json({"update": true});
    }
    return res
    .status(404)
    .json(
        {
            "error": "Error al actualizar Empresa"
        }
    );
});
/*
declarar funciones se conoce como fecha gorda (ad arrow)
router.get('/', function(_req, res)=>{
})
*/

export default router;
