# Average Salary Country Database & API Content Plan

## 1. Project Goal

Create a standardized average salary database for every country using API routes.

The goal is to provide detailed salary information for each country, including:

* Average annual salary
* Average monthly salary
* Median salary
* Salary distribution
* Salary by experience
* Salary by education
* Salary by gender
* Salary by industry
* Salary by job
* Salary by city
* Salary increases
* Bonuses
* Government vs private sector salaries
* Estimated hourly wages
* Cost of living
* Salary comparison tools

The most important requirement is **data consistency**. Every country should use the same definitions, categories, salary periods, and data structure wherever possible.

---

# 2. Define What "Average Salary" Means

Before creating country pages, clearly define the meaning of average salary.

Recommended definition:

> Average salary is the average gross annual earnings of workers in a country before personal income tax, unless otherwise specified.

The website should clearly distinguish between:

* Gross salary
* Net salary
* Take-home salary
* Total compensation
* Salary including benefits

The source content describes salary figures that may include housing, transport, and other benefits. Therefore, the API should clearly identify whether a figure represents basic salary or total compensation.

---

# 3. Recommended Country URL Structure

```text
/average-salary/united-states
/average-salary/japan
/average-salary/nepal
/average-salary/germany
/average-salary/united-kingdom
```

Country and location-specific pages can follow this structure:

```text
/average-salary/{country}

/average-salary/{country}/{city}

/average-salary/{country}/{job}

/average-salary/{country}/{industry}

/average-salary/{country}/{city}/{job}
```

Examples:

```text
/average-salary/japan
/average-salary/japan/tokyo
/average-salary/japan/software-developer
/average-salary/japan/technology
/average-salary/japan/tokyo/software-developer
```

---

# 4. Recommended Country Salary Page Structure

## H1

```text
Average Salary in the United States 2026
```

## Introduction

Every country page should explain:

* The average annual salary
* The average monthly salary
* Whether the salary is gross or net
* The currency used
* The year of the data
* The major factors affecting salary

Example:

```text
The average salary in the United States is approximately $X per year,
or $X per month before taxes. Salaries vary significantly depending on
occupation, experience, education, location, industry, and other factors.
```

---

# 5. Main Salary Summary

The primary salary summary should include:

| Metric                 | Value |
| ---------------------- | ----: |
| Average Annual Salary  |    $X |
| Average Monthly Salary |    $X |
| Average Weekly Salary  |    $X |
| Average Hourly Wage    |    $X |
| Median Annual Salary   |    $X |
| Lowest Average Salary  |    $X |
| Highest Average Salary |    $X |

Recommended API structure:

```json
{
  "country": "United States",
  "countryCode": "US",
  "currency": "USD",
  "year": 2026,
  "averageAnnualSalary": 94700,
  "averageMonthlySalary": 7900,
  "medianAnnualSalary": 92800,
  "minimumSalary": 24000,
  "maximumSalary": 423000
}
```

---

# 6. Gross Salary vs Net Salary

This distinction is essential.

The API should ideally separate:

```json
{
  "gross": {
    "annual": 94700,
    "monthly": 7900
  },
  "net": {
    "annual": 72000,
    "monthly": 6000
  }
}
```

If reliable tax data is not available, do not estimate net salary.

Use labels such as:

```text
Average Gross Salary
Average Net Salary
Average Take-Home Salary
Average Total Compensation
```

Never combine these figures without clearly explaining their differences.

---

# 7. Median Salary and Salary Distribution

Average salary alone can be misleading.

Every country should ideally include:

```text
Minimum Salary
25th Percentile
Median Salary
Average Salary
75th Percentile
Maximum Salary
```

Recommended API:

```json
{
  "salaryDistribution": {
    "minimum": 24000,
    "p25": 52600,
    "median": 92800,
    "average": 94700,
    "p75": 253000,
    "maximum": 423000
  }
}
```

## Explanation

The median represents the middle salary value.

* 50% of workers earn less than the median
* 50% earn more than the median

The 25th and 75th percentiles show the wider salary distribution.

---

# 8. Salary by Experience

Experience is one of the most important factors affecting salary.

Use standardized experience categories for every country.

Recommended categories:

| Experience  | Description           |
| ----------- | --------------------- |
| 0–2 Years   | Entry Level           |
| 2–5 Years   | Junior / Early Career |
| 5–10 Years  | Mid-Career            |
| 10–15 Years | Experienced           |
| 15+ Years   | Senior / Expert       |

Recommended API:

```json
{
  "experience": {
    "0-2": 35000,
    "2-5": 45000,
    "5-10": 65000,
    "10-15": 95000,
    "15-plus": 120000
  }
}
```

Important:

The same experience brackets should be used for all countries to make comparisons more meaningful.

---

# 9. Salary by Education

Recommended education categories:

```text
High School
Certificate or Diploma
Associate Degree
Bachelor's Degree
Master's Degree
PhD
```

Recommended API:

```json
{
  "education": {
    "highSchool": 42000,
    "certificate": 49000,
    "associate": 55000,
    "bachelors": 61000,
    "masters": 79000,
    "phd": 98000
  }
}
```

Education salary comparisons should be interpreted carefully because salaries can also be affected by:

* Occupation
* Industry
* Experience
* Seniority
* Location

---

# 10. Salary by Gender

If reliable data is available, include:

```json
{
  "genderSalary": {
    "male": 97500,
    "female": 92100,
    "gapPercentage": 6
  }
}
```

The page should explain that salary differences may be affected by:

* Occupation
* Industry
* Seniority
* Working hours
* Experience
* Career interruptions
* Location

Do not present the gender salary gap as being caused by a single factor.

---

# 11. Salary by Industry

Recommended industry categories:

```text
Accounting and Finance
Administration
Advertising and Design
Aviation
Architecture
Automotive
Banking
Business
Construction
Customer Service
Engineering
Energy
Healthcare
Hospitality
Human Resources
Information Technology
Insurance
Legal
Marketing
Media
Pharmaceuticals
Real Estate
Retail
Sales
Science
Telecommunications
Transportation
Education
```

Recommended API:

```json
{
  "industries": {
    "technology": 85000,
    "finance": 92000,
    "healthcare": 78000,
    "construction": 65000,
    "education": 55000,
    "hospitality": 42000
  }
}
```

Recommended SEO URLs:

```text
/average-salary/united-states/technology
/average-salary/united-states/healthcare
/average-salary/united-states/education
```

---

# 12. Salary by Job

Job-specific salary pages can provide significant long-term SEO value.

Recommended job categories include:

* Accountant
* Graphic Designer
* Pilot
* Engineer
* Software Developer
* Database Administrator
* Nurse
* Teacher
* Chef
* Accountant
* Financial Manager
* Project Manager
* Marketing Manager
* Sales Manager
* Hotel Manager

Recommended API:

```json
{
  "jobs": [
    {
      "slug": "software-developer",
      "title": "Software Developer",
      "averageSalary": 89600,
      "monthlySalary": 7467,
      "hourlyWage": 43
    }
  ]
}
```

Recommended URLs:

```text
/average-salary/united-states/software-developer
/average-salary/japan/software-developer
/average-salary/nepal/software-developer
```

---

# 13. Salary by City

City-level salary data is highly valuable.

Recommended API:

```json
{
  "cities": [
    {
      "name": "New York",
      "slug": "new-york",
      "averageSalary": 121000
    },
    {
      "name": "Los Angeles",
      "slug": "los-angeles",
      "averageSalary": 115000
    }
  ]
}
```

Recommended URLs:

```text
/average-salary/united-states/new-york
/average-salary/united-states/los-angeles
/average-salary/japan/tokyo
/average-salary/japan/osaka
```

---

# 14. Salary by State or Region

For countries with states, provinces, or regions, add regional salary data.

Examples:

```text
United States → States
Canada → Provinces
Australia → States and Territories
India → States
Japan → Prefectures
Nepal → Provinces
```

Recommended API:

```json
{
  "regions": [
    {
      "name": "California",
      "type": "state",
      "averageSalary": 112000
    }
  ]
}
```

---

# 15. Average Hourly Wage

The website can provide an estimated hourly wage.

Basic calculation:

```text
Hourly Wage =
Annual Salary ÷ Annual Working Hours
```

If using a standard schedule:

```text
Annual Working Hours =
Working Hours Per Week × Working Weeks Per Year
```

Recommended API:

```json
{
  "hourly": {
    "average": 46,
    "workHoursPerWeek": 40,
    "workWeeksPerYear": 52
  }
}
```

Use the label:

```text
Estimated Average Hourly Wage
```

because actual working hours differ between countries.

---

# 16. Salary Increase and Growth

Include salary raise information where reliable data is available.

Recommended API:

```json
{
  "salaryGrowth": {
    "averageRaisePercentage": 8,
    "averageReviewFrequencyMonths": 16,
    "annualizedRaisePercentage": 6
  }
}
```

Possible content:

```text
Average Salary Increase
Average Salary Review Frequency
Salary Increase by Experience Level
Salary Increase by Industry
```

---

# 17. Bonuses and Incentives

Bonuses should be separated from base salary.

Recommended API:

```json
{
  "bonus": {
    "employeesReceivingBonusPercentage": 53,
    "averageBonusPercentage": 5,
    "highBonusIndustries": [
      "Finance",
      "Sales",
      "Marketing"
    ]
  }
}
```

Separate:

```text
Salary
Bonus
Commission
Benefits
Total Compensation
```

Do not add bonuses to the average salary unless the source clearly includes them.

---

# 18. Government vs Private Sector

Recommended API:

```json
{
  "sector": {
    "private": 92400,
    "public": 97100
  }
}
```

Page section:

```text
Average Private Sector Salary
Average Public Sector Salary
Difference Between Public and Private Sector
```

---

# 19. Cost of Living

This is one of the most important features to add.

A higher salary does not automatically mean a better standard of living.

Recommended cost-of-living data:

```json
{
  "costOfLiving": {
    "averageRent": 1200,
    "foodCost": 400,
    "transportation": 150,
    "utilities": 200
  }
}
```

Possible comparison:

```text
Average Salary: $80,000
Average Rent: $2,500/month
```

versus:

```text
Average Salary: $50,000
Average Rent: $700/month
```

The second country may offer better purchasing power despite having a lower salary.

---

# 20. Purchasing Power

A salary comparison should ideally include purchasing power.

Recommended data:

```json
{
  "purchasingPower": {
    "index": 72
  }
}
```

Possible page feature:

```text
Compare Salary and Purchasing Power
United States vs Japan vs Germany
```

This can provide more meaningful comparisons than currency conversion alone.

---

# 21. Salary Comparison Calculator

Create a calculator that allows users to enter their salary.

Example:

```text
I earn $50,000 per year.

How does my salary compare with other workers?
```

Possible result:

```text
Your salary is higher than approximately X% of workers in this country.
```

Other possible features:

```text
Compare salary by country
Compare salary by profession
Compare salary by city
Compare salary by experience
```

---

# 22. Recommended API Data Structure

```json
{
  "country": {
    "name": "United States",
    "slug": "united-states",
    "code": "US",
    "currency": "USD"
  },

  "data": {
    "year": 2026,

    "averageSalary": {
      "annual": 94700,
      "monthly": 7900,
      "weekly": 1821,
      "hourly": 46
    },

    "salaryDistribution": {
      "minimum": 24000,
      "p25": 52600,
      "median": 92800,
      "average": 94700,
      "p75": 253000,
      "maximum": 423000
    },

    "experience": {},

    "education": {},

    "gender": {},

    "industries": [],

    "jobs": [],

    "cities": [],

    "regions": [],

    "salaryGrowth": {},

    "bonuses": {},

    "sectors": {},

    "costOfLiving": {},

    "purchasingPower": {}
  },

  "metadata": {
    "source": "",
    "lastUpdated": "2026-01-01",
    "methodology": ""
  }
}
```

---

# 23. Recommended Database Structure

Instead of putting everything into one massive JSON file, consider separating your data.

```text
/data
  /countries
    united-states.json
    japan.json
    nepal.json

  /jobs
    software-developer.json
    accountant.json
    nurse.json

  /industries
    technology.json
    healthcare.json

  /cities
    tokyo.json
    new-york.json
```

Possible API routes:

```text
/api/salary/country/united-states
/api/salary/country/japan

/api/salary/country/united-states/jobs
/api/salary/country/united-states/jobs/software-developer

/api/salary/country/united-states/cities
/api/salary/country/united-states/cities/new-york

/api/salary/compare?countries=us,jp,de
```

---

# 24. Recommended Page Hierarchy

```text
Average Salary
│
├── Country
│   ├── Average Salary
│   ├── Median Salary
│   ├── Salary Distribution
│   ├── Salary by Experience
│   ├── Salary by Education
│   ├── Salary by Gender
│   ├── Salary by Industry
│   ├── Salary by Job
│   ├── Salary by City
│   ├── Salary by Region
│   ├── Government vs Private
│   ├── Salary Increases
│   ├── Bonuses
│   ├── Cost of Living
│   └── Purchasing Power
│
└── Calculators
    ├── Average Salary Calculator
    ├── Salary Comparison Calculator
    ├── Gross to Net Salary Calculator
    ├── Salary After Tax Calculator
    ├── Hourly to Annual Salary Calculator
    └── Purchasing Power Calculator
```

---

# 25. Most Important Data Rules

## Rule 1: Use the same definition everywhere

For example:

```text
Average annual gross salary
```

Do not use gross salary for one country and net salary for another.

---

## Rule 2: Always include the year

Example:

```text
Average Salary in Japan in 2026
```

Salary data changes over time.

---

## Rule 3: Always include the source

Recommended metadata:

```json
{
  "source": "Official Statistics Agency",
  "sourceUrl": "",
  "dataYear": 2026,
  "lastUpdated": "2026-01-01"
}
```

---

## Rule 4: Explain the methodology

Every country should have a methodology section explaining:

* What population was measured
* Whether the salary is gross or net
* Whether bonuses are included
* Whether benefits are included
* Which year the data represents
* How currency conversion was performed
* Whether the data represents employees only or all workers

---

## Rule 5: Do not mix incompatible data

Avoid comparing:

```text
Country A:
Net salary

Country B:
Gross salary

Country C:
Salary including benefits
```

These figures are not directly comparable.

---

# 26. Recommended Final Product

The best version of this project should become a:

> Global Salary Database and Salary Comparison Platform

The main country page should contain:

```text
Average Salary
Median Salary
Salary Distribution
Monthly Salary
Hourly Salary
Salary by Experience
Salary by Education
Salary by Gender
Salary by Industry
Salary by Job
Salary by City
Salary by Region
Salary Growth
Bonuses
Government vs Private Sector
Cost of Living
Purchasing Power
Salary Comparison
```

The most important part of the project is not simply creating thousands of country pages.

The real value comes from making the data:

1. **Consistent**
2. **Comparable**
3. **Transparent**
4. **Updated**
5. **Easy to explore**
6. **Useful for real salary decisions**

A simple average salary page answers:

> "How much do people earn?"

A complete salary database answers:

> "How much do people earn, where do they earn it, what jobs pay the most, how does experience affect salary, how much do they take home, and what can they actually afford?"
