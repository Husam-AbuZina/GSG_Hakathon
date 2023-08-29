import { NSUser } from "../@types/user.js"
import dataSource from "../db/dataSource.js"
import { User } from "../db/entities/User.js"

const createUser = async (payload: NSUser.Item) => {
    return dataSource.manager.transaction(async (transactionalEntityManager) => {
        const newUser = User.create(payload)
        await transactionalEntityManager.save(newUser)
    })
}

export { createUser }