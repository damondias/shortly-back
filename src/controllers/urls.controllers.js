import { nanoid } from 'nanoid'
import urlsRepository from '../repositories/urls.repository.js';

export async function postShorten(req,res) {
    const { id } = res.locals.user;
    const { url } = req.body;

    try {
        const shortUrl = nanoid(8);
        await urlsRepository.createShorten(url, shortUrl, id);
        res.status(201).send({ id, shortUrl }); 

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

export async function getShortUrl(req,res) {
    const { shortUrl } = req.params;

    try {
        const { rowCount: existingUrl, rows: [dataShortenUrl]} = await urlsRepository.findUrlByShorten(shortUrl);
        if(existingUrl === 0) return res.status(404).send({message: " A url não existe"});
        
        const {id, url} = dataShortenUrl;
        await urlsRepository.incrementUrlVisitCount(id);
        res.redirect(url); 
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteShorten(req,res){
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const { rowCount: existingUrl, rows: [url]} = await urlsRepository.findUrlById(id);
        if(existingUrl === 0) return res.status(404).send({message: " A url não existe"});

        console.log(url, user.id)
        if( url.userId !== user.id) return res.status(401).send({message: "Esse usuário não é autorizado a fazer essa ação"});

        await urlsRepository.deleteUrl(id);
        res.status(204).send({message: "Encurtador deletado com sucesso"});

    } catch (error) {
        res.status(500).send(error.message);
    }
}