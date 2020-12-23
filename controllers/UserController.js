//para agregar otro modelo se agrega con coma al lado de User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require ('../models')    

exports.signin = async(req, res, next) =>{
    try {
        //confirmamos el email
        const user = await models.user.findOne({where: {email: req.body.email}});
        if(user){
            //confirmamos el password
            const passwordIsvalid = bcrypt.compareSync(req.body.password , user.password);
            if(passwordIsvalid){
                //si el password es válido, se crea este objeto token con los elementos del usuario que puede conocer el frontend, una frase secreta, y tiempo de expiración
                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                },'config.secret', {
                    expiresIn : 86400,
                }
                );
                //envío respuesta al user
                res.status(200).send({
                    auth: true,
                    accessToken: token,
                    user: user
                })
            }else{
                res.status(401).json({
                    error: "Error en el usuario o contraseña"
                })
            }
        }else{
            res.status(404).json({
                error: "Error en el usuario o contraseña"
            })
        }
    } catch(error) { 
        res.status(500).send({
            message: 'Error->'
        })
        next(error); 
    }
  
};

exports.register = async(req, res, next) =>{ 
    try { 
        const user = await models.user.findOne({where: {email: req.body.email}});
        if(user){
            res.status(409).send({
                message: 'Su solicitud presenta un conflicto con nuestra base de datos, parece que el correo ya ha sido utilizado'
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user  = await models.user.create(req.body);
            res.status(200).json(user);
        }     
    } catch(error) { 
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.listar = async(req, res, next) =>{ 
    try { 
        //pide traer todos los campos del modelo User
        const user = await models.user.findAll();
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).send({
                message: 'No hay usuarios en el sistema'
            })
        }
    } catch(error) { 
        res.status(500).send({
            message: 'Error||'
        })
        next(error);
    }
};