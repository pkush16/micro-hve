---
applyTo: "**"
---

# Project Coding Guidelines

## Code Style
- Always add comments to explain complex logic
- Use descriptive variable names
- Follow PEP 8 style guide for Python code
- Use meaningful commit messages

## Documentation
- Add docstrings to all functions and classes
- Include examples in docstrings when helpful

## Error Handling
- Use custom exception classes instead of built-in exceptions
- Provide detailed error messages that include the problematic values

## Python Guidelines
- Prefer list comprehensions over loops when appropriate
- Use f-strings for string formatting
- ALWAYS add type hints to all function parameters and return types
- Add input validation at the start of each function to check parameter types
- Include usage examples in docstrings using the >>> format
- Log function entry and exit using print statements for debugging
- Use `pydantic` for data validation and settings management

## JavaScript/TypeScript Guidelines
- Use `const` by default, `let` only when reassignment is needed
- Prefer arrow functions for callbacks
- Use async/await instead of promise chains