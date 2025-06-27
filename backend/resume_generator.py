from docxtpl import DocxTemplate
from pathlib import Path
from docx2pdf import convert


def generate_cv(template_name: str, user_data: dict, language: str) -> str:
    BASE_DIR = Path(__file__).resolve().parent
    template_path = BASE_DIR / "templates" / f"{template_name}_{language[:2]}.docx"
    print("path: ",template_path)
    if not template_path.exists():
        raise FileNotFoundError(f"Template not found: {template_path}")

    doc = DocxTemplate(template_path)
    doc.render(user_data)

    output_path = BASE_DIR / "static" / "resumes" / f"generated_{language}_{template_name}.docx"
    output_path.parent.mkdir(parents=True, exist_ok=True)  # Ensure the folder exists

    doc.save(output_path)
    pdf_output_path = output_path.with_suffix(".pdf")
    convert(str(output_path), str(pdf_output_path))
    return str(pdf_output_path)

# Example user data for testing
if __name__ == "__main__":
    context = {
        "name": "Mohammed",
        "email": "alt@gmail.com",
        "phone": "+1234567890",
        "address": "Doha, Qatar",
        "objective": "To leverage my skills in software development and data analysis to build intelligent applications that solve real-world problems.",
        "skills": ["Python, FastAPI, React, Docker","Teamwork, Problem Solving, Communication"],
        "experience": "3+ years in building intelligent applications.",
        "experiences": [
            {
                "title": "Software Engineer",
                "company": "ABC Tech",
                "years": "2021–2023",
                "description": "Developed web apps using React and FastAPI"
            },
            {
                "title": "Intern",
                "company": "XYZ Corp",
                "years": "2020–2021",
                "description": "Assisted in data cleaning and dashboard creation \n Used docker and jinja to edit word document"
            }],
            "education": [
                {"name":"UDST",
                 "location":"Doha, Qatar",
                 "program":"Bachelor of Computer Science",
                 "years":"2018–2021",}]

    }
    path = generate_cv(template_name="modern", user_data=context, language="english")
    print(f"Resume saved to: {path}")
