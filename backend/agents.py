from openai import OpenAI

client = OpenAI(
    base_url="https://api.fanar.qa/v1",
    api_key="fmFrMl3wHnB9SFnb8bzxNFpGCVE18Wcz"
)


def career_recommednation_agent(interest, language):
    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful and culturally aware career recommendation agent. "
                "Given a user's interests, suggest up to 4 suitable career paths. "
                "Each suggestion must include the following fields:\n"
                f"- title: (job title in {language})\n"
                f"- description: (1-line job description in {language})\n"
                f"- skills_needed: (a list of 2–4 essential skills in {language})\n"
                "- salary_range: (expected monthly salary in Qatari Riyal, e.g. '5,000 - 10,000 QAR')\n\n"
                "Only return the response in valid JSON format — no extra text or explanation. "
                "Example format:\n"
                "[\n"
                "  {\n"
                "    \"title\": \"Software Developer\",\n"
                "    \"description\": \"Develops software systems using modern technologies\",\n"
                "    \"skills_needed\": [\"Programming\", \"Problem Solving\", \"Teamwork\"],\n"
                "    \"salary_range\": \"12,000 - 22,000 QAR\"\n"
                "  },\n"
                "  ...\n"
                "]"
            )
        },
        {
            "role": "user",
            "content": f"The user's interests are: {interest}"
        }
    ]
    response = client.chat.completions.create(
        model="Fanar",
        messages=messages,
        temperature=0.4
    ).choices[0].message.content

    return response


def islamic_rag_job_verifier(job_offer_text, api_key="fmFrMl3wHnB9SFnb8bzxNFpGCVE18Wcz"):
    """
    Sends the job offer text to the Fanar Islamic-RAG model for sharia compliance check.
    Returns the assistant's answer and references (if any).
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": "Islamic-RAG",
        "messages": [
            {"role": "user", "content": job_offer_text}
        ],
        "max_tokens": 750,
    }
    response = requests.post(
        "https://api.fanar.qa/v1/chat/completions",
        json=payload,
        headers=headers
    )
    response.raise_for_status()
    data = response.json()
    content = data["choices"][0]["message"]["content"]
    references = data["choices"][0]["message"].get("references", [])
    print("Fanar API response:", data)  # Debug print
    return {
        "content": content,
        "references": references
    }


def speech_to_text_agent():
    return True


if __name__ == "__main__":
    # Example usage
    
    job_offer_text = "This is a job offer for a software engineer. The work does not involve any prohibited activities."
    result = islamic_rag_job_verifier(job_offer_text)
    print("Sharia Compliance Check Result:", result)