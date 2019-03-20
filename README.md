# ExcelToJson
Converts the excel sheet to json format

## How does it work
The script creates a 2 dimentional array and stores the data from the cells in those arrays.
The script reads top to bottom, so [y][x].
Example: [0][2] would be C1, [3][4] would be D4.

With a simple for loop you can walk through the cells.
In this case it loops from top to bottom based on what it needs.
i = the number that changes after each loop, starting at 1, because the sheet number starts at 1.
[i][0] = the id
[i][1] = config id
[i][3] = actions to do
etc..

The script checks for , in the actions to do. 
Then it cuts it in multiple strings and puts it in an array.
I created another for loop to loop through that array aswell.
[j] = loop number based on how many pieces cut.
Now it lists multiple actions beneath eachother.

Contect Check,
The script looks through the action names to see if they are valid.
If they are valid it adds the time for that action.
If its not valid it sets the time to 0, and displays an error.
It also checks if chainWithNextRequest has a true or false.

## Edit the code
If you want to add things to the code you can simply edit the strings.
jsonText.innerHTML changes the text in the textarea, 
but it adds itself and puts a string behind it. (jsonText.innerHTML = jsonText.innerHTML + "Any text here";)
errorBool, errorAction and comma are variables that are empty unless it needs to be added to the string.

At last it sets the error messege underneath the textarea.

## What i used
This script needs js-xlsx library
It uses xlsx.full.min.js
You can download it [here](https://github.com/SheetJS/js-xlsx)
