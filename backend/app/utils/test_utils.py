import re
from typing import List

def sanitize_text(text: str) -> str:
    """Remove extra whitespace and sanitize text"""
    return re.sub(r'\s+', ' ', text).strip()

def truncate_text(text: str, max_length: int = 500) -> str:
    """Truncate text to max length"""
    if len(text) <= max_length:
        return text
    return text[:max_length].rsplit(' ', 1)[0] + '...'

def format_list_items(items: List[str]) -> str:
    """Format list items with bullets"""
    return '\n'.join([f"• {item}" for item in items])

def extract_keywords(text: str, min_length: int = 3) -> List[str]:
    """Extract potential keywords from text"""
    words = re.findall(r'\b\w+\b', text.lower())
    return list(set([w for w in words if len(w) >= min_length]))