# from langchain_core.prompts import ChatPromptTemplate
# from langchain_ollama import ChatOllama
# from langchain_core.output_parsers import StrOutputParser

# # 1. Initialize the Ollama model
# #    Specify the model name that you pulled using 'ollama pull <model_name>'
# llm = ChatOllama(model="llama2")

# # 2. Define a prompt template
# prompt = ChatPromptTemplate.from_messages([
#     ("system", "You are a helpful assistant that answers user questions."),
#     ("user", "{input}")
# ])

# # 3. Define an output parser
# #    This simple parser converts the LLM's output message into a string
# output_parser = StrOutputParser()

# # 4. Create the chain using LangChain Expression Language (LCEL)
# #    The chain passes the prompt to the LLM, and then the output is parsed
# chain = prompt | llm | output_parser

# # 5. Invoke the chain with a question
# response = chain.invoke({"input": "Why do parrots have colorful feathers?"})

# # 6. Print the response
# print(response)

## ==================================================

import os
from dotenv import load_dotenv

# from langchain_community.llms import Ollama
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


# Load environment variables
load_dotenv()

OLLAMA_HOST_NAME = os.getenv("OLLAMA_HOST_NAME", "localhost")
OLLAMA_HOST_PORT = os.getenv("OLLAMA_HOST_PORT", "11434")
OLLAMA_MODEL_NAME = os.getenv("OLLAMA_MODEL_NAME", "mistral:7b")
CUSTOM_URL = f"http://{OLLAMA_HOST_NAME}:{OLLAMA_HOST_PORT}"

# 1. Initialize the Ollama model
llm = OllamaLLM(model=OLLAMA_MODEL_NAME, base_url=CUSTOM_URL)

# # You can now use the 'llm' object to generate text
# try:
#     response = llm.invoke("What is LangChain?")
#     print("AI Response:", response)
# except Exception as e:
#     print(f"An error occurred: {e}")

# print("LangChain Ollama LLM test completed.")

try:
    # 2. Define a prompt template
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful assistant that answers user questions."),
        ("user", "{input}")
    ])

    # 3. Define an output parser
    output_parser = StrOutputParser()

    # 4. Create the chain using LangChain Expression Language (LCEL)
    chain = prompt | llm | output_parser

    # 5. Invoke the chain with a question
    response = chain.invoke({"input": "Why do parrots have colorful feathers?"})

    # 6. Print the response
    print(response)

except Exception as e:
    print(f"\n\n-- Error creating prompt template: \n{e}")
    prompt = None

print("\n\n-- Prompt template creation test completed. --")