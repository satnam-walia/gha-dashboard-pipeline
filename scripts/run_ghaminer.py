"""
Main script to extract GitHub Actions metrics using GHAMiner.
Connects to the GitHub API and fetches workflow run data and inserts into DB.

Role: Extraction & Pipeline
"""
import sys
import subprocess
import logging
import os
import yaml
import csv
from pathlib import Path
from subprocess import DEVNULL
from dotenv import load_dotenv

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))
from db.db_utils import insert_builds

# === Setup Paths ===
BASE_DIR = Path(__file__).resolve().parent.parent
REPO_YAML = BASE_DIR / "config" / "repos.yaml"
GHA_METRICS_SCRIPT = Path.home() / "PycharmProjects" / "GHAminer" / "src" / "GHAMetrics.py"
CSV_PATH = BASE_DIR / "builds_features.csv"
LOG_PATH = BASE_DIR / "logs" / "ghaminer.log"

# === Configure Logging ===
logging.basicConfig(
    filename=LOG_PATH,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

load_dotenv()

def run_ghaminer_for_repo(repo_url: str):
    logging.info(f"Running GHAMiner for {repo_url}")
    try:
        subprocess.run([
            sys.executable, str(GHA_METRICS_SCRIPT),
            "--single-project", repo_url
        ], check=True, stdout=DEVNULL, stderr=DEVNULL)
    except subprocess.CalledProcessError as e:
        logging.error(f"Subprocess failed for {repo_url}: {e}")

def load_metrics_from_csv() -> list:
    if not CSV_PATH.exists():
        print(f"[3/3] builds_features.csv not found.")
        return []

    with open(CSV_PATH, newline='') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        return rows

def main():
    if not REPO_YAML.exists():
        logging.error(f"Missing repo config file at {REPO_YAML}")
        return

    with open(REPO_YAML, 'r') as f:
        config = yaml.safe_load(f)
        repos = config.get("repos", [])

    for repo_url in repos:
        if not repo_url:
            continue

        print(f"[1/3] Processing {repo_url}...")
        run_ghaminer_for_repo(repo_url)
        print("[2/3] GHAMiner completed.")

        rows = load_metrics_from_csv()
        if rows:
            insert_builds(rows)
            print(f"[3/3] Inserted {len(rows)} rows into database.")
        else:
            print("[3/3] No rows to insert.")

if __name__ == "__main__":
    main()