
from python_codebase_parser import CodebaseParser

# Change this path to any Python project on your system
PROJECT_PATH = "./api"

parser = CodebaseParser(PROJECT_PATH)

output = parser.parse()

print(output)
