# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask
from flask_cors import CORS
from flask import request
from quiz import *

example_response = """
title: Strings Quiz
question_list:
    - question: What is the difference between a string and a character?
      a: A string is a collection of characters, while a character is a single symbol.
      b: A string is a single symbol, while a character is a collection of symbols.
      c: A string is a sequence of characters, while a character is a single symbol.
      d: A string is a single symbol, while a character is a sequence of symbols.
      answer: c
    - question: What is the purpose of escape sequences in strings?
      a: To represent special characters in strings.
      b: To represent numbers in strings.
      c: To represent booleans in strings.
      d: To represent arrays in strings.
      answer: a
    - question: What is the difference between a string literal and a string variable?
      a: A string literal is a constant string, while a string variable is a variable that can be changed.
      b: A string literal is a variable that can be changed, while a string variable is a constant string.
      c: A string literal is a string that is defined at compile time, while a string variable is a string that is defined at runtime.
      d: A string literal is a string that is defined at runtime, while a string variable is a string that is defined at compile time.
      answer: a

Please provide the yaml file and I will generate the quiz.
   
"""
  
# Initializing flask app
app = Flask(__name__)
CORS(app)

@app.route('/api/quiz', methods = ['POST'])
def get_quiz():
    response = request.get_json()['user_input']
    print("Recieved Request:", response)

    #return convertToDictionary(example_response)

    return generate_quiz(response) # get response from ai

# Running app
if __name__ == '__main__':
    app.run(debug=True)