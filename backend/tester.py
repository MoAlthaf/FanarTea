# Audio Transcriptions requires additional authorization and is not allowed by default.

from openai import OpenAI

client = OpenAI(
    base_url="https://api.fanar.qa/v1",
    api_key="fmFrMl3wHnB9SFnb8bzxNFpGCVE18Wcz"
)

with open("sample.webm", "rb") as f:
    response = client.audio.transcriptions.create(
        file=f,
        model="Fanar-Aura-STT-1"
    )

print(response.text)
