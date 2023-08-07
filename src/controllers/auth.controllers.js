import authRepository from "../repositories/auth.repository.js";

export async function postSignUp(req, res){
    const { name, email, password} = req.body;

    try {
        const { rowCount: existingEmail} = await authRepository.verifyEmail(email);
        if (existingEmail > 0) res.status(409).send({ message: "Esse email já foi cadastrado"});
        
        await authRepository.createUser(name, email, password);
        res.status(201).send({message: "Usuário cadastrado com sucesso"});
    } catch (error) {
        res.status(500).send(error.message)
    }
}