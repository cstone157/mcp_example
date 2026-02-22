## Create enviroment
python -m venv myenv

# Activate it
source myenv/bin/activate  # Linux/Mac
# OR
myenv\Scripts\activate     # Windows

## Install libraries
pip install langchain ollama langchain-ollama

## Freeze requirements
pip freeze > requirements.txt