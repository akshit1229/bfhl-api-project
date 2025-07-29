const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
    try {
        
        const data = req.body.data;

     
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: "yash_goyal_29072025", 
                message: "Invalid request format. 'data' array is missing or not an array."
            });
        }

      

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabetic_chars = "";

        data.forEach(item => {
            
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            }
           
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabetic_chars += item;
            }
           
            else {
                special_characters.push(item);
            }
        });

       
        const reversed_alphabets = alphabetic_chars.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }


       
        const response = {
            is_success: true,
            user_id: "akshit_29122003", 
            email: "akshit1234.be22@chitkara.edu.in", 
            roll_number: "2110991234", 
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        
        return res.status(200).json(response);

    } catch (error) {
       
        console.error("Error processing request:", error);
        return res.status(500).json({
            is_success: false,
            user_id: "akshit_29122003", 
            message: "An internal server error occurred.",
            error: error.message
        });
    }
});


app.get('/', (req, res) => {
    res.send('API is running. Use the /bfhl POST endpoint.');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
