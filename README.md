- Example mcp application
    - Components
        - Postgres database
        - ETL (Nifi?)
        - Ollama - (pre-load ?? model)
        - open-webui
        - Webservices
        - MCP


- Plan
    - Setup a postgres database
    - Setup a ETL to handle ingesting and parsing data into the database
    - Webservices that pull / store certain data
    - A MCP service to handle requests for ollama
    - An actual AI for quering using the data stored by our MCP server
