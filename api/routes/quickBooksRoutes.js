'use strict';

var CustomerField = require('../models/customerFieldModel');

module.exports = function(app) {


    var consumerKey = 'Q0wuYhlWVTNI1I0HqQlABf66CZmWjeh9WhNFNIHkyLzYFg376H';
    var consumerSecret = 'zAU5znC0TPxAI1oU9IA9Cnm46VP9jt2X9m5MkjmU';
    var accessToken_access_token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..X_TJA2xOdNBgCK12PYuDDg.o_x_Yrp3yHU3rOMEEEmD4TPtq6pNRle4Lr5SsCrqxJwVPB8pfUTkaModFRDGae6tLYYgGTRLLI_PASnGF-pScZRGSVk2Lk8tJ5UtPfCCqxw8dfL4yBijPSRwJh3CUPuKmmKPKCDksfnKjxRFIIcjz0-14AMN3wB5QTSIF4I2vDhLB8c9JSW5xl_l4pJCP_7P2jkFHAwEI0nAZIjdfWSeX48xeIC2qZv7ZxtFGK9bfQxDoZHAca81ylqkqu6Yl4uxJ3dG2ncAGv04qk4GklxAYCQH3RVZ69NwSJ8aHXdShlLbYN8wJ1umKKnVJ159ftZEBEjB-MqH6w4TPGAqjXZs_eHcskW38jX0umq3R9o-1i4m2m_KbdXyNQPgWYDvi4yTsDsqZdcZGw0DjicByHW1iZqSuOoR_BTQ8Gat-gzkWjPkxRTAOyxiJnbNL6gM8DXXnyVG0nZ2XOSGCal9WKru_mf4Zecdk4PYNnlU_5rbP0VwsHccyEe4TWjYGnliCMbMBk9Ia7qfOfMvwF7lK9-50zGI7tovr2IDpHUjWIplNJWsDSZGTjAB-TKglKKRTkC9v9v7cCOmLA8_0a8GO_WV-l_ZH8IlXrc2E0OpX0KF2WR01Q_Td7gQTQ1Xv9w93HvaMJtwzB0kDHje3NQgfbII9Jyrb9_PyOovEJWrNjSyZI8AXFOGB8W_tE5frUlen8wj.0NAAIWxjxHs-ZNdWSn410A';
    var req_query_realmId = '123145914923924';
    var accessToken_refresh_token = 'Q011521158771deOCPxbl9gN6FtCXIH8aD1USIW35ELOFxqkk5';

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
