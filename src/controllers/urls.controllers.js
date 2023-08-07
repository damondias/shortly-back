import { nanoid } from 'nanoid'
import urlsRepository from '../repositories/urls.repository';

export async function postShorten(req,res) {
    const { id } = res.locals.user;
    const { url } = req.body;

    try {
        const shortUrl = nanoid(8);
        await urlsRepository.createShorten(url, shortUrl, id);
        res.status(201).send({ shortUrl }); 

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUrlById(req,res) {
    const { id } = req.params;

    try {
        const { rowCount: existingUrl, rows: [url]} = await urlsRepository.findUrlById(id);
        if(existingUrl === 0) return res.status(404).send({message: " A url não existe"});

        res.send(url);

    } catch (error) {
        res.status(500).send(error.message);
    }
}