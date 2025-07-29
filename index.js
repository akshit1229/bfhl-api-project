const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define the POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const data = req.body.data;

        // Check if data is provided and is an array
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: "yash_goyal_29072025", // Replace with your details
                message: "Invalid request format. 'data' array is missing or not an array."
            });
        }

        // --- Data Processing Logic ---

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabetic_chars = "";

        data.forEach(item => {
            // Check if the item is a number (as a string)
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            }
            // Check if the item is purely alphabetic
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabetic_chars += item;
            }
            // Otherwise, it's a special character
            else {
                special_characters.push(item);
            }
        });

        // --- Alternating Caps Logic ---
        const reversed_alphabets = alphabetic_chars.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }


        // --- Construct the Response ---
        const response = {
            is_success: true,
            user_id: "yash_goyal_29072025", // Replace with your full_name_ddmmyyyy
            email: "yash.goyal.dev@gmail.com", // Replace with your email
            roll_number: "2110991404", // Replace with your roll number
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        // Send the successful response
        return res.status(200).json(response);

    } catch (error) {
        // Graceful error handling for any unexpected issues
        console.error("Error processing request:", error);
        return res.status(500).json({
            is_success: false,
            user_id: "yash_goyal_29072025", // Replace with your details
            message: "An internal server error occurred.",
            error: error.message
        });
    }
});

// A simple root route to show the API is running
app.get('/', (req, res) => {
    res.send('API is running. Use the /bfhl POST endpoint.');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});