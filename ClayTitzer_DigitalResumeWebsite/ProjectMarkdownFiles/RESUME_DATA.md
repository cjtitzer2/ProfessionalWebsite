# Resume Data Reference

## Contact

| Field | Value |
|-------|-------|
| Name | Clay Titzer |
| Location | Evansville, IN 47712 |
| Phone | (812) 499-4168 |
| Email | titzerclay@gmail.com |

---

## Education

### Master of Business Administration — Data Analytics
- **Institution:** University of Southern Indiana, Romain College of Business
- **Dates:** January 2024 – December 2024

### Bachelor of Science in Business Finance
- **Institution:** University of Southern Indiana, Romain College of Business
- **Dates:** August 2020 – December 2023

---

## Experience

### Old National Bank — RPA Developer II
**September 2025 – Present** | Current

- Oversee automation solution development from design to deployment and support
- Serve as lead technical expert, guiding team and promoting automation adoption
- Advise on feasible, optimal automation approaches for solutions
- Manage all phases of the automation lifecycle
- Develop reusable frameworks, standards, and documentation for lasting automation value
- Coordinate with stakeholders to ensure technical solutions meet business needs

### Old National Bank — RPA Developer
**December 2024 – September 2025**

- Design, develop, test, and deploy RPA solutions using UiPath Studio to create end-to-end process efficiency and remove manual effort
- Collaborate with stakeholders to translate business requirements into technical solutions and documentation
- Monitor and maintain production solutions, troubleshoot errors, and implement enhancements where necessary
- Integrate RPA suite with external systems and databases using APIs and scripting languages

### Old National Bank — LEAD Operations Development Professional
**September 2023 – December 2024**

- Working almost exclusively with RPA Team in multi-functional role primarily focused on orchestration, design, and development of automation workflows
- Growth-focused role within digital transformation team to develop necessary skills for enterprise innovation

### Old National Bank — Intern, Enterprise Project Management Office
**June 2023 – September 2023**

- Contribute to the creation and implementation of innovative solutions to streamline and optimize existing processes, resulting in increased efficiency and productivity

### First Federal Savings Bank — Bank Teller
**May 2021 – June 2023**

- Working with a team to provide seamless, valuable transactions for customers
- Keeping track of cash totaling over $20,000 each day

---

## Skills

### Technical
- UiPath Studio
- UiPath Automation Hub
- Azure DevOps
- Jira
- Git
- C#
- VB.NET
- SQL
- Microsoft Suite

### Professional
- Process Improvement
- Solution Architecture
- Lean Fundamentals

---

## Data Model Mapping

```
Profile
├── name: "Clay Titzer"
├── headline: "RPA Developer II"
├── location: "Evansville, IN"

Experience[] (ordered by start_date DESC)
├── [0] title: "RPA Developer II", company: "Old National Bank", is_current: true
├── [1] title: "RPA Developer", company: "Old National Bank"
├── [2] title: "LEAD Operations Development Professional", company: "Old National Bank"
├── [3] title: "Intern, Enterprise PMO", company: "Old National Bank"
├── [4] title: "Bank Teller", company: "First Federal Savings Bank"

Education[] (ordered by end_date DESC)
├── [0] degree: "MBA", field: "Data Analytics", institution: "USI"
├── [1] degree: "BS", field: "Business Finance", institution: "USI"
```
