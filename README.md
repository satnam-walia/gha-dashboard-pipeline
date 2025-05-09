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
| Grafana          | Visual dashboard for KPIs and trends           |
| GitHub Actions   | Schedule regular extractions (CI/CD automation)|

## Project Structure

```text
gha-dashboard-pipeline/
├── scripts/               # Python scripts for ingestion and data cleaning
├── config/                # Repo and database config files
├── db/                    # PostgreSQL schema + optional seed data
├── grafana/               # Dashboard export (JSON) + setup guide
├── .github/workflows/     # GitHub Actions scheduler
├── output/                # Optional CSV output of extracted metrics
├── logs/                  # Log files from ingestion runs
├── api/                   # (Optional) REST API to expose metrics
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