import os
from dotenv import load_dotenv

from fastapi import FastAPI
from pydantic import BaseModel
import requests
import uvicorn

from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from langchain_core.callbacks import StdOutCallbackHandler
from langchain_core.globals import set_debug
set_debug(True)


from postgres.dbfactory import PostgresDBFactory

# Load environment variables
load_dotenv()

OLLAMA_HOST_NAME = os.getenv("OLLAMA_HOST_NAME", "localhost")
OLLAMA_HOST_PORT = os.getenv("OLLAMA_HOST_PORT", "11434")
OLLAMA_MODEL_NAME = os.getenv("OLLAMA_MODEL_NAME", "mistral:7b")
CUSTOM_URL = f"http://{OLLAMA_HOST_NAME}:{OLLAMA_HOST_PORT}"


# Initialize database connection
db_factory = PostgresDBFactory(
    host=os.getenv("POSTGRES_HOST", "localhost"),
    database=os.getenv("POSTGRES_DB", "mydb"),
    user=os.getenv("POSTGRES_USER", "user"),
    password=os.getenv("POSTGRES_PASSWORD", "password")
)

# Initialize FastAPI app
app = FastAPI()
class MessageRequest(BaseModel):
    message: str
    model: str = OLLAMA_MODEL_NAME


@app.post("/chat")
async def chat(request: MessageRequest):
    """Send a message to local Ollama instance"""
    # try:
    #     response = requests.post(
    #         "http://localhost:11434/api/generate",
    #         json={
    #             "model": request.model,
    #             "prompt": request.message,
    #             "stream": False
    #         }
    #     )
    #     response.raise_for_status()
    #     return response.json()
    # except requests.exceptions.RequestException as e:
    #     return {"error": str(e)}

    try:
        handler = StdOutCallbackHandler()

        # 1. Initialize the Ollama model
        llm = OllamaLLM(model=request.model, base_url=CUSTOM_URL)

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
        response = chain.invoke({"input": request.message}, config={"callbacks": [handler]})

        # 6. Print the response
        print(response)
        return {"response": response}

    except Exception as e:
        print(f"\n\n-- Error creating prompt template: \n{e}")
        prompt = None
        return {"error": str(e)}
    

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

