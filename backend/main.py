import subprocess
import sys
from pathlib import Path
import yaml
from dotenv import load_dotenv
import os
from gha_runner import run_ghaminer

def load_repos(yaml_path="config/repos.yaml"):
    with open(yaml_path, "r") as f:
        data = yaml.safe_load(f)
    return data.get("repos", [])

def main():
    repos = load_repos()
    if not repos:
        print("⚠️ No repos found in config/repos.yaml")
        return

    for repo in repos:
        print(f"Running GHAMiner on: {repo}")
        try:
            run_ghaminer(repo)
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to process: {repo}\n{e}")

if __name__ == "__main__":
    main()