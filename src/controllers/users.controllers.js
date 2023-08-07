export async function getUserById(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        if(id != user.id )  return res.sendStatus(401);

        const {rows: [dataUserUrls]} = await usersRepository.getUrlsByUser(id);
        res.send(200).send(dataUserUrls);

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