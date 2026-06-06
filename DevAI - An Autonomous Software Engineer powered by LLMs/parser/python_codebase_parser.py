import os
import ast


class CodebaseParser:
    def __init__(self, project_path: str):
        self.project_path = project_path

    def parse(self) -> dict:
        result = {}

        for root, _, files in os.walk(self.project_path):
            for file in files:
                if file.endswith(".py"):
                    full_path = os.path.join(root, file)
                    result[full_path] = self._parse_file(full_path)
        return result
    
    
    def _parse_file(self, file_path: str) -> dict:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                source = f.read()

            tree = ast.parse(source)

            functions = []
            classes = []

            for node in ast.walk(tree):

                if isinstance(node, ast.FunctionDef):
                    functions.append({
                        "name": node.name,
                        "args": [arg.arg for arg in node.args.args]
                    })

                elif isinstance(node, ast.ClassDef):
                    classes.append(node.name)

            return {
                "functions": functions,
                "classes": classes
            }

        except Exception as e:
            return {"error": str(e)}
