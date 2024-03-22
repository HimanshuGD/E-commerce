const handleSignin = (db, bcrypt) => (req, res) => {
    db.select('email', 'hash').from('buyerlogin')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                db.select('*').from('buyer')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports ={handleSignin: handleSignin};


