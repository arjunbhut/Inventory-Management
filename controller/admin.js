const Items = require('../models/items');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: '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'
            }
        })
    );

exports.getindex = (req,res,next) =>{
    res.render('index');
}

exports.getdetails = (req,res,next) =>{

        res.render('details');
};

exports.postDetails = (req,res,next) => {

    let name = req.body.item;
    let quantity = Number(req.body.quantity);
    let limit = Number(req.body.limit);
    
    console.log(name);
    console.log(quantity);

    Items.find({name: name})
    .then(item =>{
        if(item[0])
        {
            item[0].quantity += quantity;
            if(limit)
            {
                item[0].limit = limit;
            }
            
             item[0].save()
            .then(
                res.redirect('/additem')
                )
            .catch(err => console.log(err));
        }
        else
        {
            const item = new Items({
                name: name,
                quantity: quantity,
                limit: limit
            });
        
            item.save()
            .then(result =>{
                console.log('created product');
                res.redirect('/additem');
            })
            .catch(err =>{
                console.log(err);
            });
        }
        
    })
    .catch(err => console.log(err));

};

exports.getall = (req,res,next) =>{

    Items.find()
    .then(products =>{
        res.render('detailsall',{
            prods: products
        })
    })
    .catch(err =>{
        console.log(err);
    });

};

exports.getSearch = (req,res,next) =>{

    res.render('search');

}

exports.postSearch = (req,res,next) =>{

    let name = req.body.item;
    console.log(name);

    Items.find({name: name})
    .then(item => {
        res.render('detailsall',{
            prods: item
        })
    })
    .catch(err =>{
        console.log(err);
    });

}

exports.getDelete = (req,res,next) =>{

    res.render('delete',{
        flag: 0
    });

}

exports.postDelete = (req,res,next) =>{

    let name = req.body.item;

    Items.find({name: name})
    .then(result =>{
        if(!result[0])
        {
            res.redirect('/delete');
        }
        //console.log(result);
    });

    Items.deleteOne({name: name})
    .then(result =>{
        res.render('delete',{
            flag: 1
        });
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.getbelowlimit = (req,res,next) =>{

    Items.find()
    .then(products =>{
        res.render('belowlimit',{
            prods: products
        })
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.sendEmail = (req,res,next) =>{

    transporter.sendMail({
        to: 'arjunbhut1@gmail.com',
        subject: 'TEST-MAIL',
        html: `
        
            <p>You have recieved the test email</p>
        `
    });
    res.redirect('/');
}