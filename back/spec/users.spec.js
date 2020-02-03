const request = require("request");
require("dotenv").config();
const SERVER = process.env.SERVER_ADDRESS;
const bcrypt = require("bcryptjs");
const salt = "$2a$10$.xS1.szbGAYY7YxaO22Mu.";



describe(
    "test users entity",
    () => {

        const adminUser = {
            user : "admin",
            password: "admin", 
            token: ""
        };

        const newUser = {
            user: "vgy", 
            password: "jasmine"
        };

        beforeAll(

            (done) => {
                const server = require("../server");
                request.post(
                    SERVER + "/users/login",
                    {
                        json:true,
                        body:adminUser
                    },
                    (error,response, body) => {
                        adminUser.token = "Bearer " + body.token;
                        done();
                    }
                )
            }
        )

        // on teste la création de users
        it(
            "should create a new users",
            (done) => {
                request.post(
                    SERVER + "/users",
                    {
                        json: true,
                        body: newUser,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.user).toBe(newUser.user);
                        expect(body.password).toBe(newUser.password);

                        newUser.id = body.id;
                        done();
                    }
                )
            }
        );

        // on teste la MAJ de users
        it(
            "should update the users",
            (done) => {

                newUser.user = "wcs@wcs.com";
                newUser.password = "sfdsfsfs";

                request.put(
                    SERVER + "/users/" + newUser.id,
                    {
                        json: true,
                        body: newUser,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.user).toBe(newUser.user);
                        expect(body.password).toBe(bcrypt.hashSync(newUser.password, salt));

                        done();
                    }
                )
            }
        );

        // on teste la lecture de users
        it(
            "should get the users",
            (done) => {

                request.get(
                    SERVER + "/users/" + newUser.id,
                    {
                        json: true,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.user).toBe(newUser.user);
                        expect(body.password).toBe(bcrypt.hashSync(newUser.password,salt));

                        done();
                    }
                )
            }
        );


        // on teste la suppression de users
        it(
            "should delete the users",
            (done) => {

                request.delete(
                    SERVER + "/users/" + newUser.id,
                    {
                        json: true, 
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.user).toBe(newUser.user);
                        expect(body.password).toBe(bcrypt.hashSync(newUser.password, salt));
                        done();
                    }
                )
            }
        );


    }
)