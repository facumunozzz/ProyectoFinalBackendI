import { Common } from "./common.dao.js"

export class ProductosDao extends Common {

    async getById(id){
        try{
            const result = await this.model.findOne({ id})
            return result
        } catch(e){
            return null
        }
    }
}
