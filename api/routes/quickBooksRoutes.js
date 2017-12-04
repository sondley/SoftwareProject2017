'use strict';

var CustomerField = require('../models/customerFieldModel');

module.exports = function(app) {


    var consumerKey = 'Q0wuYhlWVTNI1I0HqQlABf66CZmWjeh9WhNFNIHkyLzYFg376H';
    var consumerSecret = 'zAU5znC0TPxAI1oU9IA9Cnm46VP9jt2X9m5MkjmU';
    var accessToken_access_token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ttfVU5qUIBTJUGy9WScRvA.Wel4vjns8X2w2v7AqLFc12yZAqCJ6zehdhpZbT0FvXpG0gbNHlOP2T8EqHgUuu2HsTEa_KSVjtcGBAQOMli7bicUpW65028xsbGG0p146Z9OXbE5YZf_UM38Nyl_K1Tl00cZ41Hp2CLO6KreRAlkCeSDOLT_wiZA8roLra1DEXDHG0ZT0N1nT93kwA3wOY2ueZAaOCoCh1lJpGqUOFamuPHhKP4MwahXkoG3xWIL7T1Xbnsezm8pWUSzgsaIydDOnbJbim12QTdsNglBbejo--NybtgtaK76LL83TAImziumIlXEKxSB3SpgHJzdQ8lwqxLHXNkHyzXpWcq7t3px0a3MWKFApUMrlUvUo9xZnwkgMPGyk-sH_l0YvwRieHDw-n9RcnPMC2IrEtVEF1fl0G_9Yx77KApOXMNM-O1qfPa6fHcIvH18LRZ1FsCb8VxBBKPmgqVgyow2HU7hJz-A9CAiDDnSG7HATZfmQBWf745aeIBbBtPspvYuDFa7U59kG21BcJUOvB1PxVp21CbGXgVOge134vBihDmF87aasyU0_oRgAuwQ9mboBDI9rIxVxieY5bFBpnxdspVKV5Pf6XxYdDHw1IK4xgcSNIoh7ewr8W1raYA_6756u-DWGD1XEdz9w3UWu3dAtCU94DoAd0YTtaHEpTzL-K87Anjrf-QnDINMrV-4TUkkbH0lxnw6.4H8tqr6EZw5JkR4bi-WYQg';
    var req_query_realmId = '123145914923924';
    var accessToken_refresh_token = 'Q011521128535WqRSrdeVVmEMaGaan4bmJQaccxgBdIDkpYyhc';

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
