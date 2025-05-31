import subprocess
import os
import shutil
import sys
from pathlib import Path
from dotenv import load_dotenv

def run_ghaminer(repo_url: str):
    load_dotenv()
    token = os.getenv("GITHUB_TOKEN")
    os.makedirs("output/raw", exist_ok=True)
    repo_name = repo_url.split("/")[-1].replace(".git", "")

    subprocess.run([
        sys.executable,
        str(Path("ghaminer") / "src" / "GHAMetrics.py"),
        "--s", repo_url,
        "--token", token
    ], check=True)

    print(f"[✔]Finished processing {repo_name}")