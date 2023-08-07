import authRepository from "../repositories/auth.repository.js";

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;

  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send({ message: "Formato token inválido" });

  const { rows: [session] } = await authRepository.verifyToken(token);
  if (!session) return res.status(401).send({ message: "Sessão não encontrada"});

  const { rows: [user] } = await authRepository.verifySession(session.userId);
  if (!user) return res.status(401).send({message: "Usuário não encontrado"});
  
  res.locals.user = user;
  next();
}