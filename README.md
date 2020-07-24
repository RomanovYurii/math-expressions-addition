# Application to add two simple mathematical expressions

##### _Made as a test task during the recruitment process. Text of a task is below._

    Task: Write a function to add two simple mathematical expressions which are of the form
    
    Ax^(a) + Bx^(b) + ... 
    (where the coefficients and exponents can be any positive or negative real number).
    
    That is, the expression is a sequence of terms, where each term is simply a constant times a variable to an exponent.
    You don't have to do string parsing, so you can use whatever data structure you'd like to hold the expressions.

## Environment
To run and test this application, user requires `NodeJS` and `npm/yarn` being installed on their machine.
Currently, this application provided just as a source, with no CLI or web interface.
However, this may be changed in case of further updates.

## Operations

- Installation: 
    - Clone this repository (unzip the archive)
    - Run `yarn` or `npm i` in the folder you've got from previous step

- Testing:
    - Tests done using Jest. They cover different tricky cases.
    - Run `yarn test` or `npm run test`. 

- Playground (in case you want to try to add your own expressions):
    - Open the `playground.js` file.
    - Write your own cases using direct instructions in the section below or
    - Uncomment the pre-written example, given in the task.
    
## Instructions and Documentation
The application constists of three main parts:
1. `Expression` class (E.g. `3x^(3)`)
    -
    - `terms`: Array of `Terms` (0 ... inf)
2. `Term` class
    -
    - `coefficient`: Number, goes first in the String representation
    - `exponent`: Number, goes after `^` and inside `()` in the String representation
    - `variable`: String, goes after `coefficient` in the String representation
    
    - `constructor(params)`: Function, used to create an instance of the class. 
    
        `params`:
        - `c`: Stays for `coefficient`
        - `e`: Stays for `exponent`
        - `v`: Stays for `variable`
3. `addExpressions(...expressions)` function
    -
    - Receives (0 ... inf) expressions as arguments.
    - Returns a String representation of the addition result.
    
Example of usage can be found in the `playground.js` file.
