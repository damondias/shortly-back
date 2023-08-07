import usersRepository from "../repositories/users.repository.js";

export async function getUserById(req, res) {
    const { user } = res.locals;

    try {
        const {rows: [dataUserUrls]} = await usersRepository.getUrlsByUser(user.id);
        res.status(200).send(dataUserUrls);

    } catch (error) {
        res.status(500).send(error.message);
    }
}
  
export async function getRanking(req, res) {
    try {
      const {rows: ranking } = await usersRepository.getUrlsRankingByUser();
      res.status(200).send(ranking);

    } catch (error) {
      res.status(500).send(error.message);
    }
}