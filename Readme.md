- Example mcp application
    - Components
        - [X] Postgres database
        - [X] PgAdmin
        - [ ] ETL (Nifi?)
        - [ ] Ollama - (pre-load ?? model)
        - [ ] open-webui
        - [ ] Webservices
        - [ ] MCP


- Plan
    - [X] Setup a postgres database
    - [ ] Setup a ETL to handle ingesting and parsing data into the database
    - [ ] Webservices that pull / store certain data
    - [ ] A MCP service to handle requests for ollama
    - [ ] An actual AI for quering using the data stored by our MCP server


## Running / building the MCP

- Start the service
- <code>$ fastmcp run mcp.py</code>

- Save updates to the libraries / module
- <code>$ pip freeze > requirements.txt</code>



## Building MCP Dockerfile

- $ nerdctl build --tag myimage .

