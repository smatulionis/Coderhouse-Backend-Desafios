import { userModel } from '../models/users.models.js';
import { sendRecoveryMail } from '../config/nodemailer.js';
import crypto from 'crypto';
import { createHash } from '../utils/bcrypt.js';

const recoveryLinks = {}

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: `Error en consultar usuarios ${error}` });
    }
}

export const passwordRecovery = async (req, res) => {
    const { email } = req.body;

    try {
        const token = crypto.randomBytes(20).toString('hex');

        recoveryLinks[token] = { email: email, timestamp: Date.now() }

        const recoveryLink = `http://localhost:8080/api/users/reset-password/${token}`;

        sendRecoveryMail(email, recoveryLink);

        res.status(200).send('Correo de recuperación enviado');
    } catch (error) {
        res.status(500).send(`Error al enviar el mail ${error}`);
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, newPassword2 } = req.body;

    try {
        const linkData = recoveryLinks[token]; 
        if (linkData && Date.now() - linkData.timestamp <= 3600000) { 
            const { email } = linkData;

            if (newPassword == newPassword2) {
                const user = await userModel.findOne({ email: email });
                if (user) {
                    user.password = createHash(newPassword);
                    await user.save();

                    delete recoveryLinks[token];

                    res.status(200).send('Contraseña modificada correctamente');
                } else {
                    res.status(404).send('Usuario no encontrado');
                }
            } else {
                res.status(400).send('Las contraseñas deben ser idénticas');
            }
        } else {
            res.status(400).send('Token inválido o expirado. Pruebe nuevamente');
        }
    } catch (error) {
        res.status(500).send(`Error al modificar contraseña ${error}`);
    }
}
