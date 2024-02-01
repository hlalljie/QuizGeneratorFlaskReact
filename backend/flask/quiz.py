import yaml
import replicate
import os
from dotenv import load_dotenv

load_dotenv()

#print(os.environ['REPLICATE_TOKEN'])

llama_settings = {
  'temperature': .1,
  'top_p': .9,
  'max_length': 10000,
  'model': 'a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
  'system_message': 
"""You are a helpful quiz question creation assistant. When prompted you will generate a 3 question multiple choice quiz on the topic provided in yaml, formatted like the below yaml. The example includes single quotes '' to indicate words that must be used exactly and brackets [] to indicate where to change values for your generated values. Do not include the brackets[] or single quotes'' in your response and follow the format exactly and with correct spacing, tabbing and punctuation. Question list and title should be the same tab amount\n
'title:'[quiz_title]
'question_list:'
   '- question:' [question1]
     'a:' [option1]
     'b:' [option2]
     'c:' [option3]
     'd:' [option4]
     'answer:'[correct answer as a, b, c, or d]
\n\n""",
    'pre_prompt': "Assistant: What kind of quiz would you like me to generate? \n\n",
    'output_prefix': 'Assistant: Here is your quiz in YAML format.\n',
    'example_prompt': 'A quiz about strings in computer science'
}

def generate_quiz(user_input:str = llama_settings["example_prompt"]) -> dict:
    prompt_output = prompt_quiz(user_input)
    # print("Prompt Generated\n")
    # print(prompt_output)
    # print(type(prompt_output))
    # print("\nPrompt Complete")
    return convertToDictionary(prompt_output)


# Prompts a chatbot to generate a quiz based on user's input
def prompt_quiz(user_input:str =llama_settings["example_prompt"]) -> str:
    #print("Quiz generating...")
    global llama_settings
    input_prompt = "prompt: " + f"{llama_settings['system_message']} {llama_settings['pre_prompt']} User: {user_input} \n\n {llama_settings['output_prefix']}\n"
    #print (input_prompt)
    output = replicate.run(
        llama_settings["model"], 
        input={
            "prompt": input_prompt,
            "temperature":llama_settings['temperature'],
            "top_p":llama_settings['top_p'],
            "max_length":llama_settings['max_length'],
            "repetition_penalty":1
            })
    return "".join(output)

# Cleans any lines of text that are not yaml and will break future conversions
def clean_response(response) -> str:
    #print("reponse: ")
    #print(response)
    #print("end reposnse")
    # split reponse into lines
    lines = response.splitlines()
    #print("lines: ")
    #print(lines)
    #print("end lines")
    # search backwards for the last response containing letters
    for i in range(len(lines)-1, -1, -1):
        lines[i].strip("'")
        # if colons in string do not delete up until line
        if ":" in lines[i]:
            return '\n'.join(lines[:i+1])
            
# Converts (yaml) String to dictionary
def convertToDictionary(response) -> dict:
    clean = clean_response(response)
    # print("cleaned response")
    # print(clean)
    # print("end cleaned response")
    return yaml.safe_load(clean)


# print(generate_quiz())