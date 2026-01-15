
from fastapi import FastAPI
from app.security import threat_analysis
from app.assistant import process_command

app = FastAPI(title="State Cyber AI Assistant")

@app.post("/assistant")
async def assistant(command: str):
    return {
        "response": process_command(command),
        "threat_level": threat_analysis(command)
    }
