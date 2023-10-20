import { userModel } from '../models/users.models.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: `Error en consultar usuarios ${error}` });
    }
}