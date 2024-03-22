const handleRegister = (req, res, db, bcrypt) => {
    const { email, firstname, password, lastname, city, state, country, pincode, mobile } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('buyerlogin')
            .returning('email')
            .then(loginEmail => {
                return trx('buyer')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        firstname: firstname,
                        lastname: lastname,
                        city: city,
                        state: state,
                        country: country,
                        pincode: pincode,
                        mobile: mobile
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json(err))

}

module.exports = {
    handleRegister: handleRegister
};




