#!/bin/zsh
# Automated script to run aider with local Ollama LLMs
# Usage: ./aider-ollama.sh --model ollama/<model> <file1> <file2> ...

# Set environment variables for Aider and LiteLLM to use Ollama's OpenAI-compatible endpoint
export AIDER_OPENAI_API_BASE="http://localhost:11434/v1"
export OPENAI_API_KEY="ollama"
export LITELLM_API_BASE="http://localhost:11434"

# Activate Python 3.11+ virtual environment if it exists
if [ -d "aider-venv" ]; then
  source aider-venv/bin/activate
fi

# Use absolute path to aider inside venv if available
if [ -x "aider-venv/bin/aider" ]; then
  exec aider-venv/bin/aider "$@"
else
  exec aider "$@"
fi
