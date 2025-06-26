from docx import Document
from pathlib import Path

def generate_cv(template_name: str, user_data: dict, language: str) -> str:    
    BASE_DIR = Path(__file__).resolve().parent
    template_path = BASE_DIR / "templates" / f"{template_name}_{language}.docx"

    if not template_path.exists():
        raise FileNotFoundError(f"Template not found: {template_path}")

    doc = Document(template_path)

    for paragraph in doc.paragraphs:
        for key, value in user_data.items():
            placeholder = f"{{{{{key}}}}}"
            print(paragraph.text)  # Debugging line to see the paragraph text
            if placeholder in paragraph.text:
                paragraph.text = paragraph.text.replace(placeholder, value)

    output_path = Path(f"generated_{user_data['name']}.docx")
    doc.save(output_path)
    return str(output_path)

# Example user data for testing
def test_generate_cv():
    user_data_example = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "education": "B.Sc. in Computer Science",
        "experience": "3 years at ExampleCorp as Software Engineer",
    }
    template_name = "modern"  # or 'classic' if you have that template
    language = "en"  # or 'ar' for Arabic
    try:
        output_file = generate_cv(template_name, user_data_example, language)
        print(f"Generated CV saved to: {output_file}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_generate_cv()