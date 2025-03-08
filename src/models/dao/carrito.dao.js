import { Common } from "./common.dao.js"

export class CarritoDao extends Common {

    async getById(id){
        try{
            const result = await this.model.find({ id })
            return result
        } catch(e){
            return null
        }
    }
}
