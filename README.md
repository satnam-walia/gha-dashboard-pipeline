# GHA Dashboard Pipeline

This project builds an automated dashboard that monitors GitHub Actions workflows for a target repository (e.g., `milvus-io/milvus`). It uses the open-source tool **GHAminer** to extract workflow metrics, stores them in **PostgreSQL**, and visualizes insights via **Grafana**.

## Objectives

- Automatically extract GitHub Actions workflow data
- Store metrics in a structured PostgreSQL database
- Visualize KPIs in an interactive Grafana dashboard
- Enable future extensions for machine learning (ML) predictions

## Tech Stack

| Component        | Purpose                                        |
|------------------|------------------------------------------------|
| GHAminer         | Extract GitHub Actions build + test metrics    |
| Python           | Automate ingestion and transformation scripts  |
| PostgreSQL       | Store and query CI/CD data                     |
| ReactJS          | Visual dashboard for KPIs and trends           |
| GitHub Actions   | Schedule regular extractions (CI/CD automation)|

## Wrapper Setup (Python)

- Having Python 3.13.2 in your machine
- Install pipenv in your machine
    - *Command:* `pip install --user pipenv`
- `cd` into the project's folder
- Install dependencies
    - *Command:* `pipenv install`
- Run virtual env shell
    - *Command:* `pipenv shell`
- To execute files
    - *Command:* `python {path/to/file}`
- To exit the shell
    - *Command:* `exit`

## Dashboard Setup (Web Dev part)

- The Dashboard is the HTML page that will display the data as tables and graphs
    - Will be hosted by the github pages feature that allows to host publicly a static website (to discuss)
- The source files are located in the dashboard folder
- The project uses Webpack to build and generate final files in the docs folder
- To run the website (Dashboard) locally you will have to:
    - `cd `into the dashboard folder
    - run the command: `npm install`
    - run the command: `npm run dev`
    - go to the local address given from terminal (use web browser)
- The data_samples.csv file is here for testing
    - After uploading it, there will be a table that has the file's content displayed (for now)
    - Console logs the content of the csv file too
- Usefull commands:
    - `npm run build` used to build and bundle the files without running a local server 
    - `npm run dev` used to build and bundle the files, then to run a local server to test and see the outcome


## Project Structure

```text
gha-dashboard-pipeline/
├── .github/workflows/     # GitHub Actions scheduler
├── api/                   # REST API to expose metrics
├── config/                # Repo and database config files
├── dashboard/             # Dashboard's source files ; Where we implement the dashboard site
├── db/                    # PostgreSQL schema + optional seed data
├── docs/                  # Various documentation
├── output/                # Optional CSV output of extracted metrics
├── scripts/               # Python scripts for ingestion and data cleaning
```

## Tracked KPIs

- Workflow success rate
- Average build duration
- Top failing workflows
- PR authors with repeated failures
- Workflow volume over time

## Automation

The pipeline runs every 15 minutes using **GitHub Actions**, automatically ingesting new GitHub Actions runs and storing them in PostgreSQL. Grafana connects directly to this database for live dashboards.

## Future Extensions (ML)

The data pipeline is designed to support future machine learning use cases, such as:
- Predicting workflow failure likelihood
- Forecasting build duration
- Scoring workflow flakiness
- Clustering logs for failure analysis

## Environment Setup

Copy `.env.example` → `.env` and provide the following variables:

```env
GH_TOKEN=ghp_xxxxxxxxxxxxxxxx
DB_URI=postgresql://user:pass@host:port/dbname
```

## License

This project is released under the **MIT License**. See the `LICENSE` file for details.
