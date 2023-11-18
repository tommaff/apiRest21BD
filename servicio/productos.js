import config from '../config.js'
import ModelFactory from '../model/DAO/productosFactory.js'
import ModelFile from '../model/DAO/productosFile.js'
import ModelMem from '../model/DAO/productosMem.js'
import ModelMongoDB from '../model/DAO/productosMongoDB.js'
import { validar } from './validaciones/productos.js'

class Servicio{
    constructor(){
        // this.model = new ModelFile()
        // this.model = new ModelMem()
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }
    obtenerProductos = async id => {
        const productos = await this.model.obtenerProductos(id)
        return productos
    }

    calculoProductos = async tipo => {
        let resultado = 'calculo no soportado'
        switch(tipo){
            case 'promedio': 
            const productos = await this.model.obtenerProductos()
            const sumatoria = productos.reduce((acumulador, producto)=> acumulador+producto.precio, 0)
            const promedio = sumatoria / productos.length
            resultado = Number(promedio.toFixed(2))
            break
            default:
                break
        }
        return { [tipo] : resultado}
    }

    guardarProducto = async producto => {
        const resultado = validar(producto)
        if(resultado.result){
            return await this.model.guardarProducto(producto)
        }
        else {
            console.log(resultado.error)
            throw resultado.error
        }
    }

    actualizarProducto = async (id, producto) => {
        return await this.model.actualizarProducto(id, producto)
    }

    borrarProducto= async id => {
        return await this.model.borrarProducto(id)
    }
}

export default Servicio