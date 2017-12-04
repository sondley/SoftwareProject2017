'use strict';

var CustomerField = require('../models/customerFieldModel');

module.exports = function(app) {


    var consumerKey = 'Q0wuYhlWVTNI1I0HqQlABf66CZmWjeh9WhNFNIHkyLzYFg376H';
    var consumerSecret = 'zAU5znC0TPxAI1oU9IA9Cnm46VP9jt2X9m5MkjmU';
    var accessToken_access_token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Bxs3AN-f5VWJtUxmP2qPsg.lkO9JYHB4M7tImyGTfx-t5dErb0as6Q8pSeuIdarv6Q5c4jWW0QOEiWjt2kP9cKigSL3pRUg2KSegTS0yNcSRA6Ho9kn4QTrKUbPr2XNQ0byAWjwpy97phJsyMJY_t7hyMikn_Zw1_wXCV6S7sZKgDBPyntvm3IbgU8FtnMNtNm47yg5f2WRKb_A0te2wOzx2-_7Ghb-bq6NG9TONywme2EYtee3O5sH0qWEFpggGYo27ZjgsQRzlLSucF0SO4V2D8SOEkv2mdZIIxvP5RLeYvLTi9Kl_1YiprEYGxUm_hYadQX0LSW_s6Acbep0uxPH6eCYJmvUtig377k9gwP9poJupbGXXjLw9f3H9jr9euX8lteTRLnxocpbtw__COUIIpC-fJiDL2qU75WZLuUum8bc_iaNXh3iARy7vbsidJZ7TrEfqRvnUCBt82uc9g22A0MGuq9TI-0Jel8tjmUBAcDN6TWZletkR-yMOd1xdNQkc9DQnJjEGtYRAdvD7W9pRz1czkUKjrEINCU_kMdkWrNIM6GT0hJJ7UF6XjLWfzvC_PwECWRVE1fAZTDdzj_eLdvN3hBse0PL1siNlc2yEmz65LmXXcg0ShuzI24dqpX9nZqefazpdylZk4kBI7dxzGZuJAKTYmSYZx_NSx6E-MsgezT-L646RDHH7PBS503cUg66tf0TBLHXPImAy7Lx.qYsJWFt-T9Wp14VsqzFolw';
    var req_query_realmId = '123145914923924';
    var accessToken_refresh_token = 'Q0115211519392B57tWMa27yKUnL6nDt8ALmkmpuvdkZXCAgV7';

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
