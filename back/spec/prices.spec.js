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

        const prices = {
            child: 12,
            adult: 15
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
            "should create a price",
            (done) => {
                request.post(
                    SERVER + "/prices",
                    {
                        json: true,
                        body: prices,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, res, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.child).toBe(prices.child);
                        expect(body.adult).toBe(prices.adult);
                        prices.id = body.id;
                        done();
                    }
                )
            }
        )

        it(
            "should update the price",
            (done) => {

                prices.child = 8,
                prices.adult = 10

                request.put(
                    SERVER + "/prices/" + prices.id,
                    {
                        json: true,
                        body: prices,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        request.get(
                            SERVER + "/prices/" + parseInt(prices.id),
                            {
                                json: true
                            },
                            (error, response, body) => {
                                expect(body.id).toBeGreaterThan(0);
                                expect(body.child).toBe(prices.child);
                                expect(body.adult).toBe(prices.adult);
                                done();
                            }
                        )
                    }

                );
            }
        )

        it(
            "should get the price",
            (done) => {

                request.get(
                    SERVER + "/prices/" + prices.id,
                    {
                        json: true
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.child).toBe(prices.child);
                        expect(body.adult).toBe(prices.adult);
                        done();
                    }
                )
            }
        );


        it(
            "should delete the price",
            (done) => {

                request.delete(
                    SERVER + "/prices/" + prices.id,
                    {
                        json: true,
                        headers: {
                            "Authorization": adminUser.token
                        }
                    },
                    (error, response, body) => {
                        expect(body.id).toBeGreaterThan(0);
                        expect(body.child).toBe(prices.child);
                        expect(body.adult).toBe(prices.adult);
                        done();
                    }
                )
            }
        );

    }
)