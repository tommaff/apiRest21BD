import Joi from "joi";

export const validar = producto => {

    const productoSchema = Joi.object({
        nombre: Joi.string().alphanum().required(),
        precio: Joi.number().min(0).max(99999999999).required(),
        stock: Joi.number().integer().min(0).max(9999).required()
    })
    const { error } = productoSchema.validate(producto)
    if(error){
        return { result: false, error} 
    } 
    return {result: true}
}