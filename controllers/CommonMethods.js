
function saveDocument(res, document){
    document.save((err, documentStored) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar en la base de datos: ${err}` })
        }else{
        res.status(200).send({ document: documentStored });
        }
    })
}

function callBackByiD(res, err, data) {
    if (err) {
        res.status(500).send({ message: err }).end();
    } else if (!data) {
        res.status(404).send({ message: 'Not found' }).end();
    } else {
        res.send(data).end();
    }
}

module.exports = {
    saveDocument,
    callBackByiD,
}