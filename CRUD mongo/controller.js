var user = require('./userSchema');

exports.add_user = (req, res) => {
    var userBody = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username
    };
    user.create(userBody, (err, data) => {
        if (data) {
            res.send({
                message: 'Data added',
                data
            });
        } else {
            res.send({
                mesaage: 'Data Not Added',
                err
            });
        }
    });
};
exports.find_user = (req, res) => {
    user.findOne({ username: req.body.username }, (err, data) => {
        if (data)
            res.send(data);
        else
            res.send(`${req.body.username} Not Present`);
    })
}
exports.update_user = (req, res) => {
    user.update({ username: req.body.username }, { $set: { phone: req.body.phone } }, (err, data) => {
        if (data && data.nModified)
            res.send("User Updated");
        else if (err)
            res.send(err);
        else
            res.send("Data Already Updated.")
    })
}
exports.delete_user = (req, res) => {
    user.deleteOne({ username: req.body.username }, (err, data) => {
        if (data && data.n > 0)
            res.send("User Deleted");
        else if (err)
            res.send(err);
        else
            res.send("User Not Present")
    })
}