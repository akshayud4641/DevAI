from DeepSeek.deepseek_client import client

def generate_stream(requirement: str):
    stream = client.chat.completions.create(
        model="deepseek-coder",
        messages=[
            {
                "role": "user",
                "content": requirement
            }
        ],
        stream=True
    )

    for chunk in stream:
        if chunk.choices and chunk.choices[0].delta:
            content = chunk.choices[0].delta.content
            if content:
                yield content