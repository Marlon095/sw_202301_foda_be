import express from 'express';
const router = express.Router();

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

//http://localhost:3001/empresas/all
router.get('/all', (_req, res)=>{
    res.status(200).json({'msj': 'Not implemented yet'});
});
/*
declarar funciones se conoce como fecha gorda (ad arrow)
router.get('/', function(_req, res)=>{

})
*/
export default router;