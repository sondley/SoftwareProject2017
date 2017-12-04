'use strict';

var CustomerField = require('../models/customerFieldModel');

module.exports = function(app) {


    var consumerKey = 'Q0wuYhlWVTNI1I0HqQlABf66CZmWjeh9WhNFNIHkyLzYFg376H';
    var consumerSecret = 'zAU5znC0TPxAI1oU9IA9Cnm46VP9jt2X9m5MkjmU';
    var accessToken_access_token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..KlvceoJP_Ii6pot-L8ViEA.b_su5yONHobTxwFTaBi15CmNPIgIw63C5Lci29d4vLOGtWcw3eIMvzLB3YDQiOwnKSWA71d-R6zsqQ0KwvI-oWkS-SRaFqYvAehU4IbT78c47oCOP7mMpk_0-YoVERwLqzBEImoi8VMcIGNPPi0WJ9Q12Wwg4jXzED445D4mg5QRm9KstUUP9bpahrqqu_xZSo4bNRNe8258dytNZxACH34vWN4vA_5TJXAJ-J5V1ZXnbfzEZFk0Aicv9wqdedu1msCGuFwfT-pMgrpseZbRmBN9h9KaIK7tdvj3Twn9IiIjcIK_9UverNc7M3W8gJ1FaAem12cofZesbUUGbUSzNJLZcFvZf0x0AHJfL51gPNP9Z39LcnD5Wb8MDdtCqX7AuLiuOnWnao_9tL5u3BjVqAcyOCxfoFLpwT6_v33u32iDtIB7GEiZVSduGiHFuuRZZyus08qBfTsLM77NciM2_7dWDekV19_inQK3qerm8TTmbbR_7IXEWYlnjq98X68D_boikqhoYDRgLrPa-RtBr9SW8XTChGzH0qezUvGYW961MtTzPaDnMaiw-SKQfTO0VRQtzkSk6PoZIo4KbKSGIx4O5ZSjqOiGPACkuDcFkm5CuUbaTu4atUreyeINf5FNQyp6fnjX6LilyT0Juex6-8deej32VJqfiUWf07WprVjbKuDbeR0vmCHYFA5KqUZp.9ngP5h6UbTEt9N-8sEKsBQ';
    var req_query_realmId = '123145914923924';
    var accessToken_refresh_token = 'Q011521132708BcEj5tYa7kz6KfqrJ44PaNnHsarsnBegJtV6x';

    var QuickBooks = require('node-quickbooks');


    app.get('/customers/:id', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );


        qbo.getCustomer([
            req.params.id
        ], (e, customers) => {
            CustomerField.find({
                userId: customers.Id
            }, (err, user) => {
                if (err) {
                    console.log(err);
                } else if (user) {
                    console.log(user);
                    for (var i = 0; i < user.length; i++) {
                        if (user[i].entity == 'Customer') {
                            customers[user[i].fieldName] = user[i].fieldValue;
                        }
                    }

                    res.send(customers)
                } else {
                    res.json(false);
                    console.log('------------------Invalid');
                }
            });
        });
        // res.send(account.Name);
    });

    app.get('/customers', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );


        // qbo.getCustomer([{}
        // ], function (e, customers) {

        // });

        qbo.findCustomers({
            fetchAll: true
        }, function(e, customers) {
            res.send(customers["QueryResponse"]["Customer"]);
        })

    });

    app.get('/employees', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );

        qbo.findEmployees({
            fetchAll: true
        }, function(e, employee) {
            res.send(employee["QueryResponse"]["Employee"]);
        })

    });

    app.get('/employees/:id', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );


        qbo.getEmployee([
            req.params.id
        ], (e, employee) => {
            if(employee) {
                CustomerField.find({
                    userId: employee.Id
                }, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else if (user) {
                        console.log(user);
                        for (var i = 0; i < user.length; i++) {
                            if (user[i].entity == 'Employee') {
                                employee[user[i].fieldName] = user[i].fieldValue;
                            }
                        }

                        res.send(employee)
                    } else {
                        res.json(false);
                        console.log('------------------Invalid');
                    }
                });
            } else {
                res.send("Este empleado no existe");
            }
        });
        // res.send(account.Name);
    });

    app.get('/items', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );

        qbo.findItems({
            fetchAll: true
        }, function(e, items) {
            res.send(items["QueryResponse"]["Item"]);
        })

    });

    app.get('/items/:id', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );


        qbo.getItem([
            req.params.id
        ], (e, item) => {

            if (item) {
                CustomerField.find({
                    userId: item.Id
                }, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else if (user) {
                        console.log(user);
                        for (var i = 0; i < user.length; i++) {
                            if (user[i].entity == 'Item') {
                                item[user[i].fieldName] = user[i].fieldValue;
                            }
                        }

                        res.send(item)
                    } else {
                        res.json(false);
                    }
                });
            } else {
                res.send("Este producto/servicio no existe");
            }
        });
    });

    app.get('/invoices', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );

        qbo.findInvoices({
            fetchAll: true
        }, function(e, invoices) {
            res.send(invoices["QueryResponse"]["Invoice"]);
        })

    });

    app.get('/invoices/:id', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );


        qbo.getInvoice([
            req.params.id
        ], (e, invoice) => {
            if (invoice) {
                CustomerField.find({
                    userId: invoice.Id
                }, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else if (user) {
                        console.log(user);
                        for (var i = 0; i < user.length; i++) {
                            if (user[i].entity == 'Invoice') {
                                invoice[user[i].fieldName] = user[i].fieldValue;
                            }
                        }

                        res.send(invoice)
                    } else {
                        res.json(false);
                    }
                });
            } else {
                res.send("Esta factura no existe");
            }
        });
    });

    app.get('/sales', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );

        qbo.findSalesReceipts({
            fetchAll: true
        }, function(e, sales) {
            res.send(sales["QueryResponse"]["SalesReceipt"]);
        })

    });

    app.get('/sales/:id', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );


        qbo.getSalesReceipt([
            req.params.id
        ], (e, sales) => {
            if (sales) {
                CustomerField.find({
                    userId: sales.Id
                }, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else if (user) {
                        console.log(user);
                        for (var i = 0; i < user.length; i++) {
                            if (user[i].entity == 'Sales') {
                                sales[user[i].fieldName] = user[i].fieldValue;
                            }
                        }

                        res.send(sales)
                    } else {
                        res.json(false);
                    }
                });
            } else {
                res.send("Esta orden no existe");
            }
        });
    });

    app.post('/sales', (req, res) => {

        var qbo = new QuickBooks(consumerKey,
            consumerSecret,
            accessToken_access_token, /* oAuth access token */
            false, /* no token secret for oAuth 2.0 */
            req_query_realmId,
            true, /* use a sandbox account */
            true, /* turn debugging on */
            4, /* minor version */
            '2.0', /* oauth version */
            accessToken_refresh_token /* refresh token */ );

        qbo.createSalesReceipt(req.body, function(err, sale) {
            if (err) console.log(err)
            else res.json(sale)
        });
    });
};
