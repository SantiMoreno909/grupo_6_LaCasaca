const db = require("../../database/models");

const usersControllerApi = {

    getUsers: (req, res) => {
        
        db.Users.findAll().then(function (users) {

            const response = {
                count: users.length,
                users: users.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        detail: `/api/users/${user.id}`
                    };
                })
            };
            res.json(response);
        });
    },
    getUserDetails: (req, res) => {
        let userId = req.params.id;
        db.Users.findByPk(userId, { attributes: { exclude: ['password', 'category'] } }).then(function (user) {
            const response = {
                /*
                id: user.id,
                name: user.name,
                email: user.email,
                imageURL: user.imageURL,*/
                //Agregar las funciones necesarias, agregué estas de ejemplo nomás
            };
            res.json(response);
        });
    }
};

module.exports = usersControllerApi;
