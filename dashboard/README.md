# GHA Dashboard

This part of the project is a React application based on Vite that allows you to upload a CSV file containing GitHub Actions data, automatically compute KPIs, and visualize them as interactive charts using Recharts and Tailwind CSS.

---

## Main Features

* Upload CSV file (drag & drop or manual selection)
* Automatic GitHub Actions KPI calculations:

  * Workflow failure rate (pie chart)
  * Standard deviation of workflow durations (horizontal bars)
  * Failure rate by issuer (table)
* Clean and responsive display with TailwindCSS + Recharts

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/satnam-walia/gha-dashboard-pipeline.git
cd dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```
http://localhost:5173
```

---

## Expected CSV Format

The CSV file must contain at least the following columns:

* `workflow_name`
* `build_duration`
* `conclusion`
* `issuer_name`
* `job_details` (JSON format containing `job_name`, `job_duration`, `job_result`)

---

## KPI Computation

Data is processed in `utils/computeKpis.js`:

* Rounded to 2 decimal places
* Outliers removed using Z-score filtering
* Calculated KPIs:

  * `workflowFailures`: number of failures per workflow
  * `workflowStddev`: standard deviation of workflow durations
  * `issuerFailures`: failure rate by issuer

---

## Technologies

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Recharts](https://recharts.org/)
* [Papa Parse](https://www.papaparse.com/) for CSV parsing
