// Required npm packages for this project
var mysql = require('mysql');
var inquirer = require('inquirer');

// Create a SQl connection via node using server and daatabase credentials created in mySQL
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon_db',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

// Connect to the database and create a function that runs the "displayProducts()" function which contains all the products organized in a table
connection.connect(function (err) {
    if (err) throw err;
    console.log('connection succeed!');
    displayProducts();
})

// * --  Display All of the Items available for sale. This initial display, should include the ids, names, and prices of products for sale --
var displayProducts = function () {
    connection.query('SELECT * FROM products', function (error, response) {
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].product_id + " || " + response[i].product_name + " || " +
                response[i].department_name + " || " + response[i].price + " || " + response[i].
                    stock_quantity + "\n");
        }
        // promptCustomer(response);
        shoppingCart();
    })
};
// * -- Users should then be prompted with two messages:
//        -- The first message should ask them the ID of the product they would like to buy    --
//        -- The second message should ask them how many of the product they would like to buy --
var shoppingCart = function () {
    inquirer.prompt([{
        name: "ProductID",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        //Validate: checks wether or not the user typed a response
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        name: "Quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (answer) {
        // var query = 'UPDATE Products ? WHERE?';
        console.log(answer)
       
        // * -- Once the customer has placed the order: 
        // * Check if store has enough quantity of the product to meet the customer's request.
        //   If not, respond to the user by saying: "Insufficient quantity" and prevent the order from going through.
        // * If  store DOES have enough of the product to meet the customer's request, you should fulfill their order.
        // * Then update the SQL database to reflect the remaining quantity. --
        
        var query = 'SELECT stock_quantity FROM WHERE Products' + answer.Quantity;

        connection.query(query, function (err, res) {
            if (answer.Quantity <= res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("We currently have " + res[i].stock_Quantity + " " + res[i].product_Name + ".");
                    console.log("Thank you for your patronage! Your order of " + res[i].stock_Quantity + " " + res[i].product_Name + " is now being processed.");
                }
            } else {
                // console.log("Not enough of this product in stock.");
            }
            // displayProducts();
        })
    })
};