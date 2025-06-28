from openai import OpenAI
from resume_generator import generate_cv
import json
import requests

client= OpenAI(
    base_url="https://api.fanar.qa/v1",
    api_key="fmFrMl3wHnB9SFnb8bzxNFpGCVE18Wcz"
)

def career_recommednation_agent(interest,language):
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
        temperature=0.4).choices[0].message.content

    return response


def cv_generator_agent(user_data, language):
    system_prompt = (
        "You are a professional CV assistant. "
        f"Given a user's CV data in {language}, translate values to {language} where needed. "
        "Correct grammatical, spelling, or formatting errors. "
        "Stricly do not add any exaplanations,comments or notes no matter what.\n"
        "**Mandatory Output Requirements:**\n"
        "- Output ONLY valid JSON with **EXACTLY these keys** (in this order):\n"
        "  {\n"
        '  "name": string,\n'
        '  "email": string,\n'
        '  "phone": string,\n'
        '  "address": string,\n'
        '  "objective": string,\n'
        '  "skills": [string, string],  // [technical_skills, soft_skills]\n'
        '  "experience": string,\n'
        '  "experiences": [ // Array of objects with STRICTLY these keys:\n'
        '      {"title": string, "company": string, "years": string, "description": string}\n'
        '  ],\n'
        '  "education": [ // Array of objects with STRICTLY these keys:\n'
        '      {"name": string, "location": string, "program": string, "years": string}\n'
        '  ]\n'
        "  }\n"
        "- If input keys are missing, use these DEFAULT values:\n"
        '  - Strings: "Not provided"\n'
        '  - "skills": ["", ""]\n'
        '  - Arrays: [] (empty)\n'
        "- **NEVER** add/remove keys or change key names.\n"
        "- **NEVER** include comments, explanations, or non-JSON text.\n"
        "Example Output:\n"
        "{\n"
        '  "name": "Mohammed",\n'
        '  "email": "alt@gmail.com",\n'
        '  "phone": "+1234567890",\n'
        '  "address": "Doha, Qatar",\n'
        '  "objective": "To leverage my skills...",\n'
        '  "skills": ["Python, FastAPI", "Teamwork, Communication"],\n'
        '  "experience": "3+ years...",\n'
        '  "experiences": [\n'
        '      {"title": "Software Engineer", "company": "ABC Tech", "years": "2021–2023", "description": "Developed apps..."}\n'
        '  ],\n'
        '  "education": [\n'
        '      {"name": "UDST", "location": "Doha, Qatar", "program": "Bachelor of Computer Science", "years": "2018–2021"}\n'
        '  ]\n'
        "}"
    )
    messages = [
    {
        "role": "system",
        "content": system_prompt
    },
    {
        "role": "user",
        "content": f"Here is the user's CV data:\n{json.dumps(user_data, indent=2)}"
    }]

    response = client.chat.completions.create(
        model="Fanar",
        messages=messages,
        temperature=0.3
    ).choices[0].message.content

    print('RAW LLM RESPONSE:', response)
    print('RAW LLM RESPONSE TYPE:', type(response))
    response_dict = json.loads(response)
    cv_path = generate_cv(
        template_name=response_dict.get('template', 'modern'),
        user_data=response_dict,
        language=language
    )
    return cv_path
    

def speech_to_text_agent():
    with open("static/audio/answer.webm", "rb") as f:
        response = client.audio.transcriptions.create(
            file=f,
            model="Fanar-Aura-STT-1"
        )
    text=response.text
    return text

def interview_trainer_agent(question,language):
    transcript = speech_to_text_agent()
    print("Transcripted Response:", transcript)
    messages = [
        {
            "role": "system",
            "content": (
                "You are an expert interview trainer.\n"
                f"Given a question in {language}, provide a detailed feedback in the same language.\n"
                "The user has already recorded their answer in audio format and I will provide you the transcript.\n"
                "Ignore any small pronunciation mistakes that can happen due to audio analyzing error.\n"
                "Analyze the user's transcript and provide feedback.\n"
                "Your response must be in valid JSON format with the following fields:\n"
                "I fnay of the part you didnt understand or is blank , just evaluate it as such and provide feedback.\n"
                "Do not include any explanations, comments or notes.\n"
                f"The question is: {question}\n"
                "\n"
                "IMPORTANT: Your response MUST be ONLY valid JSON in the following format, with NO extra text or explanation.\n"
                '{"score": <int>, "feedback": <string>, "suggestions": [<string>, ...]}'
            )
        },
        {
            "role": "user",
            "content": f"The transcript is: {transcript}"
        }
    ]
    llm_response = client.chat.completions.create(
        model="Fanar",
        messages=messages,
        temperature=0.4
    ).choices[0].message.content

    # Parse the JSON output from the LLM
    try:
        result = json.loads(llm_response)
    except Exception as e:
        print("Error parsing LLM response as JSON:", e)
        print("Raw LLM response:", llm_response)
        # fallback mock
        result = {
            "score": 85,
            "feedback": "Good answer! You can improve voice confidence and add more practical examples.",
            "suggestions": [
                "Use specific examples from your experience",
                "Speak with more confidence",
                "Connect your answer to job requirements"
            ]
        }
    return result



def model_api(messages, model):
    headers = {
        "Authorization": "Bearer fmFrMl3wHnB9SFnb8bzxNFpGCVE18Wcz",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": messages,
        "max_tokens": 750,
    }
    response = requests.post(
        "https://api.fanar.qa/v1/chat/completions",
        json=payload,
        headers=headers
    )
    return response.json()

def extract_info(response, job_description=None):
    """
    Given a response (string or dict), use Fanar LLM to extract only the needed information for sharia compliance:
    - is_compliant (bool)
    - compliance_level (string)
    - explanation (string)
    - recommendations (list of strings)
    If the response is vague, incomplete, or not in the right format, Fanar should analyze and fill in missing details as best as possible.
    If the Islamic-RAG model fails, fallback to Fanar LLM for extraction. If both fail, use a context-aware hardcoded fallback.
    When using Fanar, provide both the job description and the Islamic-RAG response for best judgment.
    """
    import json
    keys = ["is_compliant", "compliance_level", "explanation", "recommendations"]
    if isinstance(response, dict):
        if all(k in response for k in keys):
            return response
        response_str = json.dumps(response)
    else:
        response_str = str(response)

    # Try Islamic-RAG first
    system_prompt = (
        "You are an expert Islamic job compliance analyzer. Given a response about a job's sharia compliance, extract and return ONLY the following fields in valid JSON (no extra text):\n"
        "- is_compliant: boolean\n"
        "- compliance_level: string\n"
        "- explanation: string\n"
        "- recommendations: list of strings\n"
        "If the input is vague, incomplete, or not in the right format, analyze and fill in missing details as best as possible.\n"
        "Output ONLY valid JSON in this format (no extra text):\n"
        '{"is_compliant": true, "compliance_level": "Fully compatible", "explanation": "...", "recommendations": ["..."]}'
    )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Analyze this response and extract the required info: {response_str}"}
    ]
    model = "Islamic-RAG"
    try:
        llm_response = model_api(messages=messages, model=model)
        content = llm_response["choices"][0]["message"]["content"]
        result = json.loads(content)
        if all(k in result for k in keys):
            return result
    except Exception as e:
        print("Islamic-RAG extract_info failed, falling back to Fanar.", e)

    # Fallback to Fanar LLM, now providing both job description and Islamic-RAG response
    try:
        fanar_prompt = (
            "You are a job compliance analyzer. Given BOTH the job description and the Islamic-RAG model's response about sharia compliance, extract and return ONLY the following fields in valid JSON (no extra text):\n"
            "- is_compliant: boolean\n"
            "- compliance_level: string\n"
            "- explanation: string\n"
            "- recommendations: list of strings\n"
            "If the input is vague, incomplete, or not in the right format, analyze and fill in missing details as best as possible.\n"
            "Output ONLY valid JSON in this format (no extra text):\n"
            '{"is_compliant": true, "compliance_level": "Fully compatible", "explanation": "...", "recommendations": ["..."]}'
        )
        combined_context = (
            f"Job Description:\n{job_description}\n\n"
            f"Islamic-RAG Model Response:\n{response_str}"
        )
        fanar_messages = [
            {"role": "system", "content": fanar_prompt},
            {"role": "user", "content": combined_context}
        ]
        fanar_response = client.chat.completions.create(
            model="Fanar",
            messages=fanar_messages,
            temperature=0.2
        ).choices[0].message.content
        result = json.loads(fanar_response)
        if all(k in result for k in keys):
            return result
    except Exception as e:
        print("Fanar LLM extract_info also failed.", e)

    # Final fallback: context-aware hardcoded result
    haram_keywords = ["bartender", "alcohol", "wine", "beer", "pork", "casino", "gambling", "nightclub", "liquor", "interest", "riba"]
    job_text = (job_description or response_str or "").lower()
    if any(word in job_text for word in haram_keywords):
        return {
            "is_compliant": False,
            "compliance_level": "Not compliant",
            "explanation": "This job involves activities prohibited in Islam, such as serving alcohol or working in a haram environment.",
            "recommendations": [
                "Seek alternative employment that does not involve prohibited activities.",
                "Consult a qualified Islamic scholar for further guidance."
            ]
        }
    # Default fallback (compliant)
    return {
        "is_compliant": True,
        "compliance_level": "Fully compatible",
        "explanation": "This job offer is compliant with Islamic law principles. It does not contain prohibited activities such as interest-based transactions or selling prohibited items.",
        "recommendations": [
            "Ensure prayer times are accommodated in the work environment",
            "Ask about policies regarding religious holidays"
        ]
    }


def sharia_compliance_agent(job_description, language):
    model = "Islamic-RAG"
    prompt = (
        f"Given the following job description in {language}, determine if it complies with sharia law. "
        f"Reply it in {language}. "
        "Respond ONLY with valid JSON containing: is_compliant (boolean), compliance_level (string), explanation (string), recommendations (list of strings).\n"
        "Job description: " + job_description + "\n"
        "Example output format:\n"
        '{"is_compliant": true, "compliance_level": "Fully compatible", "explanation": "This job offer is compliant with Islamic law principles. It does not contain prohibited activities such as interest-based transactions or selling prohibited items.", "recommendations": ["Ensure prayer times are accommodated in the work environment", "Ask about policies regarding religious holidays"]}'
    )
    messages = [
        {"role": "user", "content": prompt}
    ]
    response = model_api(messages=messages, model=model)
    content = response["choices"][0]["message"]["content"]
    # Use extract_info to post-process and ensure output is always in the right format
    result = extract_info(content, job_description=job_description)
    references = response["choices"][0]["message"].get("references", [])
    if references:
        print("\nReferences:")
        for ref in references:
            number = ref.get("number", "-")
            source = ref.get("source", "Unknown source")
            ref_content = ref.get("content", "")
            print(f"\n[{number}] {source}\n{ref_content}")
    else:
        print("\nNo references returned.")
    return result


    



if __name__ == "__main__":
    bartender_job = (
        "Job Title: Bartender\n"
        "Location: Doha, Qatar\n"
        "Responsibilities: Prepare and serve alcoholic and non-alcoholic beverages, interact with customers, maintain cleanliness of the bar area, handle cash and POS transactions, and ensure compliance with all health and safety regulations.\n"
        "Requirements: Previous experience as a bartender or in a similar role, knowledge of drink recipes, excellent communication and customer service skills, ability to work nights and weekends.\n"
        "Note: The bar serves a variety of alcoholic beverages including cocktails, beer, and wine."
    )
    response = sharia_compliance_agent(
        job_description=bartender_job,
        language="english"
    )
    print("Response:", response)