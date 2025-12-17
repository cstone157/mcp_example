#!/usr/bin/env python3
"""
MCP Server for Parts and Warehouse Management
Connects to localhost:3000 APIs and uses Ollama Mistral for processing
"""

import asyncio
import json
from typing import Any
import httpx
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# Configuration
API_BASE_URL = "http://localhost:3000"
OLLAMA_BASE_URL = "http://ollama.tmdash.org"

# Initialize MCP server
app = Server("parts-warehouse-mcp")

async def fetch_parts() -> list[dict[str, Any]]:
    """Fetch available parts from the API"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{API_BASE_URL}/api/part", timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": f"Failed to fetch parts: {str(e)}"}

async def fetch_warehouses() -> list[dict[str, Any]]:
    """Fetch available warehouses from the API"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{API_BASE_URL}/api/warehouse", timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {"error": f"Failed to fetch warehouses: {str(e)}"}

async def query_ollama(prompt: str, context: str = "") -> str:
    """Query Ollama Mistral model with given prompt and context"""
    async with httpx.AsyncClient() as client:
        try:
            payload = {
                "model": "mistral",
                "prompt": f"{context}\n\n{prompt}" if context else prompt,
                "stream": False
            }
            response = await client.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json=payload,
                timeout=60.0
            )
            response.raise_for_status()
            result = response.json()
            return result.get("response", "No response from model")
        except Exception as e:
            return f"Error querying Ollama: {str(e)}"

@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available tools"""
    return [
        Tool(
            name="get_parts",
            description="Retrieve a list of all available parts from the inventory system",
            inputSchema={
                "type": "object",
                "properties": {},
                "required": []
            }
        ),
        Tool(
            name="get_warehouses",
            description="Retrieve a list of all available warehouses",
            inputSchema={
                "type": "object",
                "properties": {},
                "required": []
            }
        ),
        Tool(
            name="analyze_inventory",
            description="Use AI to analyze parts and warehouse data and provide insights",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The question or analysis request about the inventory"
                    },
                    "include_parts": {
                        "type": "boolean",
                        "description": "Whether to include parts data in the analysis",
                        "default": True
                    },
                    "include_warehouses": {
                        "type": "boolean",
                        "description": "Whether to include warehouse data in the analysis",
                        "default": True
                    }
                },
                "required": ["query"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: Any) -> list[TextContent]:
    """Handle tool calls"""
    
    if name == "get_parts":
        parts = await fetch_parts()
        return [TextContent(
            type="text",
            text=json.dumps(parts, indent=2)
        )]
    
    elif name == "get_warehouses":
        warehouses = await fetch_warehouses()
        return [TextContent(
            type="text",
            text=json.dumps(warehouses, indent=2)
        )]
    
    elif name == "analyze_inventory":
        query = arguments.get("query", "")
        include_parts = arguments.get("include_parts", True)
        include_warehouses = arguments.get("include_warehouses", True)
        
        # Gather context
        context_parts = []
        
        if include_parts:
            parts = await fetch_parts()
            context_parts.append(f"Available Parts:\n{json.dumps(parts, indent=2)}")
        
        if include_warehouses:
            warehouses = await fetch_warehouses()
            context_parts.append(f"Available Warehouses:\n{json.dumps(warehouses, indent=2)}")
        
        context = "\n\n".join(context_parts)
        
        # Query Ollama with context
        analysis = await query_ollama(query, context)
        
        return [TextContent(
            type="text",
            text=analysis
        )]
    
    else:
        raise ValueError(f"Unknown tool: {name}")

async def main():
    """Run the MCP server"""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())