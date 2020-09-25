# Inventory-Management
NodeJS-ExpressJS-MongoDB-Mongoose-EJS-Javascript. 

This project is built with the help of the above mentioned Technologies.

It has various functionalities(CRUD operations) and API for different operations.

Routes:-

/ - loads the home page. 
/additem - To add new item or to increase the quantity of the existing item.  

/showall - To display all the items in the database along with its quantity and minimum limit.  

/search - To search a particular item from the database.  

/delete - To delete a particular item from the database.  

/belowlist - To display the items that are only below their respective limits. 

/email  - To send the test email (Dummy data entered, can work with real time data by extracting from request body)


Models Used:-   

Items {  
          name: {  
        type: String,  
        required: true  
          },  
    quantity: {  
        type: Number,  
        required: true  
          },  
    limit: {  
        type: Number  
         }  
}  
