import ModelMem from "./productosMem.js"
import ModelFile from "./productosFile.js"
import ModelMongoDB from "./productosMongoDB.js"

class ModelFactory {
    static get (tipo){
        switch(tipo){
            case 'MEM': console.log('***** Persistiendo en memoria ******')
            return new ModelMem()
            case 'FILE': console.log('***** Persistiendo en archivo ******')
            return new ModelFile()
            case 'MONGODB': console.log('***** Persistiendo en MongoDB ******')
            return new ModelMongoDB()
            default: console.log('***** Persistiendo en memoria por defecto ******')
            return new ModelMem()
        }
    }
}

export default ModelFactory