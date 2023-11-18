import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB{
    obtenerProductos = async id => {
        if(!CnxMongoDB.conection) return id? {}:[]
        if(id) {
            const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
            return producto
        }
        else {
            const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
            return productos
        }
    }
    guardarProducto = async producto => {
        if(!CnxMongoDB.conection) return id? {}:[]
        await CnxMongoDB.db.collection('productos').insertOne(producto)
        return producto
    }

    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.conection) return id? {}:[]
        await CnxMongoDB.db.collection('productos').updateOne(
            {_id: new ObjectId(id)},
            { $set: producto}
        )
        const productoActualizado = await this.obtenerProductos(id)
        return productoActualizado
    }
    
    borrarProducto = async id  => {
        if(!CnxMongoDB.conection) return id? {}:[]
        const productoBorrado = await this.obtenerProductos(id)
        await CnxMongoDB.db.collection('productos').deleteOne({_id: new ObjectId(id)})        
        return productoBorrado
    }
}

export default ModelMongoDB