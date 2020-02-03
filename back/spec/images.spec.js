const request = require("request");
require("dotenv").config();
const SERVER = process.env.SERVER_ADDRESS;

describe(
    "test service entity",
    () => {
        // exemple du format de la table new
        const adminUser = {
            user: "admin",
            password: "admin",
            token: ""
        };

        const images = {
            title: "Geraldine",
            alt: "blablabla",
            url: "./avatar.png"
        };

        beforeAll(

            (done) => {
                const server = require("../server");
                request.post(
                    SERVER + "/users/login",
                    {
                        json: true,
                        body: adminUser
                    },
                    (error, response, body) => {
                        adminUser.token = "Bearer " + body.token;
                        done();
                    }
                )
            }
        )
        //test d'une nouvelle news
        it(
            "should create a images",
            (done) => {
                request.post(
                    SERVER + "/images",
                    {
                        json: true,
                        body: images,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, res, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.title).toBe(images.title);
                        expect(body.alt).toBe(images.alt);
                        expect(body.url).toBe(images.url);
                        images.id = body.id;
                        done();
                    }
                )
            }
        )

        it(
            "should update the image",
            (done) => {

                images.title = "EGG",
                    images.alt = "ALBALBALB",
                    images.url = "./avatar2.png"

                request.put(
                    SERVER + "/images/" + images.id,
                    {
                        json: true,
                        body: images,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        request.get(
                            SERVER + "/images/" + parseInt(images.id),
                            {
                                json: true
                            },
                            (error, response, body) => {
                                expect(body.id).toBeGreaterThan(0);
                                expect(body.title).toBe(images.title);
                                expect(body.alt).toBe(images.alt);
                                expect(body.url).toBe(images.url);
                                done();
                            }
                        )
                    }

                );
            }
        )

        it(
            "should get the image",
            (done) => {

                request.get(
                    SERVER + "/images/" + images.id,
                    {
                        json: true
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.title).toBe(images.title);
                        expect(body.alt).toBe(images.alt);
                        expect(body.url).toBe(images.url);
                        done();
                    }
                )
            }
        );


        it(
            "should delete the images",
            (done) => {

                request.delete(
                    SERVER + "/images/" + images.id,
                    {
                        json: true,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.title).toBe(images.title);
                        expect(body.alt).toBe(images.alt);
                        expect(body.url).toBe(images.url);
                        done();
                    }
                )
            }
        );

    }
)