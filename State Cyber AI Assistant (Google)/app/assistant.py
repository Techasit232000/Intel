
def process_command(command: str) -> str:
    command = command.lower()

    if "cyber" in command:
        return "Cybersecurity monitoring activated."

    if "threat" in command:
        return "Analyzing national cyber threat data."

    if "status" in command:
        return "All national digital infrastructure systems are stable."

    return "State AI Assistant ready to receive commands."
