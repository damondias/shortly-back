import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import authRepository from "../repositories/auth.repository.js";

export async function postSignUp(req, res){
    const { name, email, password} = req.body;

    try {
        const { rowCount: existingEmail} = await authRepository.verifyEmail(email);
        if (existingEmail > 0) return res.status(409).send({ message: "Esse email já foi cadastrado"});
        
        const passwordHash = bcrypt.hashSync(password,10);
        await authRepository.createUser(name, email, passwordHash);
        res.status(201).send({message: "Usuário cadastrado com sucesso"});
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function postSignIn(req, res){
    const {email, password} =req.body;

    try {
        const { rowCount: existingUser, rows: [user]} = await authRepository.verifyEmail(email);
        if (existingUser === 0) return res.status(401).send({ message: "Email já não foi cadastrado"});

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if ( isValidPassword === false) return res.status(401).send({ message: "Senha incorreta"});

        const token = uuid();
        await authRepository.createSession(token, user.id);
        res.status(200).send({ token });

    } catch (error) {
        res.status(500).send(error.message)
    }
}