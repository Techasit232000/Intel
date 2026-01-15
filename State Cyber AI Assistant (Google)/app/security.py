
def threat_analysis(text: str) -> str:
    keywords = ["attack", "hack", "breach", "malware"]

    if any(k in text.lower() for k in keywords):
        return "HIGH"
    return "LOW"
