'use strict';

var CustomerField = require('../models/customerFieldModel');

module.exports = function(app) {


    var consumerKey = 'Q0fbxxNxJ3MepVtWAlUJhXpvyXRdIixlmBIDD0NK5LY3gABn7p';
    var consumerSecret = 'EgdIldZVMJ9ghwMkzW9WudDUFmYuZuce1o3RFlAL';
    var accessToken_access_token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Eg8OYP9V9nz2EyUnreTVnA.dAN2zfwVKBda8zkPMkIPzTdEc9uENnhFDxsf9KXIMLyCTuhL4SlE-CIazp6PH54xGHFXfX7mu4tK1f31yS6mmU5a0YRY9lvmQh43BzRXOzkHqCCjoWrU2Xfoxj8zB3gxmPPb6OjI-mJxz080kBSxH8Jfb7nq0HLj0UUizPRGBwUjpiLOkjFXNr33StnYpjqef3ZiXRNAn5kETmKnASWEKKUj3m51WYzXjSAqC07WsI-a5XIC9MfHcPJAfnDogWzWWtCalRPngbKfeDW5i8fm6ePomYDNoshH5BZ0Tt4Myl0b6Naw9LRl77kjrmWGeApFjCQLAZ1I8YE5rxtmnUNKxvnto1E-WUis1WTGMU33glT1hkxHQ2EdPImu0jefXsffoIId2J20ENHex_VDTDRF6p8sNIbxmLbVzTTy282DgMihJIMiYhEA18XuTPRA_qFyrmXiKtS6dXF66OeBAJdLXRICYIWjGCbA0FcPUofypA2bGxe4f17-ST6441RXYoawlIlj7iDQZ0EqQsG9gCl3GqRSCJy_0PsPJrg1zMY-_a7FaLThO6_BVsxIgJWkqF_ZylYSUWHxYZDD_ismKBN2YYIBfqzToqEaNW6VjrO2eorS6J8s6rPOZxZNYcdHKV8KAlE4-L7Y-gAKyXWr5BWbaY_cMgjuFjBBPYbpd4lTO7tz0zf9amVN34_6QaMHKEq7.0-FnZQzSF2QjxtilT5jrKg';
    var req_query_realmId = '123145897081394';
    var accessToken_refresh_token = 'Q011521078516VCmeB9H7E4I0x99fPwhtB0YxQF1TGmu7ZSi9a';

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
