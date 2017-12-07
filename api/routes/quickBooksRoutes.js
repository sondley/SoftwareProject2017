'use strict';

var CustomerField = require('../models/customerFieldModel');

module.exports = function(app,qbo) {


    var consumerKey = 'Q0haK1pjmVaPoNptTODmaArkqN26cGSAJQF67NqpITZv7wtpdH';
    var consumerSecret = 'yYhzcVSkovgfnyduq1Jp5nEUHtIzovHGpHqKuZ6f';
    var accessToken_access_token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..ysQ4LcFLxGFZ0MzbO0WX7A.0aUs8SgUMlZi3HIa-9X-2zsjbjVJmTzZXTkMJYahghSbm8_adS_r0FO8f671bgTsCCCqhBCvFPE_EDHr9KV89r7xh0eKUSvrnAnhNRJRWf36CFC8RTfo1TlROCJ_o11-6LKq-6bJxMX6XdmUxQWBdMSQnZFlgr6bHUcoXLl-z6AGmPex0zkJWjsi8rqtmlBPxyOaLA67Kv7GUR4gyl4kxXzD20ipuvkDxsZQgwHiNvlr0dlPvCn1joyUj9fpetGcp1x1bAWtPWn7wKwln06IMnzQOwFNxvd4vlTDNfx2s9a5XPKz4VOGoTToiUN54l7aR5dAntdU9HoSh6BBCk8b6HRpHe4IR6-P9eqUkmguhL9bmEFUpew_KYGYsMk97QLnqkPe9BPi1Qp4igj1tTPVrd_RyrYkiGkA3eaBhpLakxoYlwM0hMGJpj_pI54GLUOCPUx5nuj5cfhKWG6q6vUuNoAncWVcQhXlXK-Ry0mFsFFPl6VLGst_NkBHWVW3YXK-vAwK1fgQtVH0xGipuJZRGaLhtyjDrqb87aJ-J284auZVu3-pRYEcmLOovWDK_2lIqjE-gsKQk3IPRcGp0uANHMlOOMxOLORQHSBTMYkan2vLUgYzvHYfRx7u1lZMQGqfG5e7wkDfRCRWIDbY3X-DMbDSvOQnHE7ju7sQQbPDK7WMgx9iqN9EvGjU2dCvIIKi.WbIidOGz3h_yqtMpCLa0jQ';
    var req_query_realmId = '123145918278089';
    var accessToken_refresh_token = 'Q011521380033e90PNOxk8bcSyUHiHLxqgu3CnYlLIBCqHWKJg';

    var QuickBooks = require('node-quickbooks');


    app.get('/customers/:id', (req, res) => {

        

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

        
        qbo.findEmployees({
            fetchAll: true
        }, function(e, employee) {
            res.send(employee["QueryResponse"]["Employee"]);
        })

    });

    app.get('/employees/:id', (req, res) => {

        

        qbo.getEmployee([
            req.params.id
        ], (e, employee) => {
            if (employee) {
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

        
        qbo.findItems({
            fetchAll: true
        }, function(e, items) {
            res.send(items["QueryResponse"]["Item"]);
        })

    });

    app.get('/items/:id', (req, res) => {

        

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

        
        qbo.findInvoices({
            fetchAll: true
        }, function(e, invoices) {
            res.send(invoices["QueryResponse"]["Invoice"]);
        })

    });

    app.get('/invoices/:id', (req, res) => {

        

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

        
        qbo.findSalesReceipts({
            fetchAll: true
        }, function(e, sales) {
            res.send(sales["QueryResponse"]["SalesReceipt"]);
        })

    });

    app.get('/sales/:id', (req, res) => {

        

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

        
        qbo.createSalesReceipt(req.body, function(err, sale) {
            if (err) console.log(err)
            else res.json(sale)
        });
    });
};
