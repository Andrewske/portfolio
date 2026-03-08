#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["anthropic", "python-dotenv"]
# ///
import json
import sys
import os
from datetime import datetime
import anthropic
from dotenv import load_dotenv

load_dotenv(os.path.expanduser("~/.claude/.env"))

# Read API key directly from file to bypass any env overrides
def get_real_api_key():
    env_path = os.path.expanduser("~/.claude/.env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("ANTHROPIC_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return os.environ.get("ANTHROPIC_API_KEY")



# Read hook data
data = json.load(sys.stdin)

# Debug: log what data we're actually receiving
with open(f"{os.path.expanduser('~')}/.claude/hook-debug.json", "w") as f:
    json.dump(data, f, indent=2)

# Extract project name from cwd
cwd = data.get('cwd', '')
project_name = os.path.basename(cwd) if cwd else 'Unknown'

# Read transcript to get conversation history with thinking
transcript_path = data.get('transcript_path')
if not transcript_path or not os.path.exists(transcript_path):
    sys.exit(0)

# Parse JSONL transcript
messages = []
with open(transcript_path, 'r') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        msg = json.loads(line)
        if msg.get('type') in ['user', 'assistant']:
            messages.append(msg)

if len(messages) < 2:
    sys.exit(0)

# Get last user message and assistant response (including thinking)
user_msg = messages[-2].get('message', {}).get('content', '')
assistant_msgs = messages[-1].get('message', {}).get('content', [])

# Extract thinking and text from assistant message
thinking = ""
response = ""
for block in assistant_msgs if isinstance(assistant_msgs, list) else []:
    if block.get('type') == 'thinking':
        thinking = block.get('thinking', '')
    elif block.get('type') == 'text':
        response = block.get('text', '')

# Prompt for AI summarization
prompt = f"""Create concise bullet points summarizing this interaction:

Project: {project_name}
User: {user_msg}
Assistant Thinking: {thinking}
Assistant Response: {response}

Format as:
• Project: {project_name}
• User asked: [brief description]
• Analysis/Thinking: [what was discovered or analyzed]
• Action taken: [what was done or proposed]

Keep each bullet to one line."""

# Call Claude API (explicit base_url and key to bypass any proxy)
client = anthropic.Anthropic(
    api_key=get_real_api_key(),
    base_url="https://api.anthropic.com"
)
message = client.messages.create(
    model="claude-3-5-haiku-20241022",
    max_tokens=200,
    messages=[{"role": "user", "content": prompt}]
)

summary = f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n{message.content[0].text}\n"

# Create daily log file path (configurable via env var)
log_dir = os.environ.get("CLAUDE_SUMMARY_DIR", os.path.expanduser("~/.claude/summaries"))
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, f"{datetime.now().strftime('%Y-%m-%d')}.log")

# Append to daily log
with open(log_file, "a") as f:
    f.write(summary + "\n---\n")