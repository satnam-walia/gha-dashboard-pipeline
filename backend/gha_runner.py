import subprocess
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import shutil

def clone_ghaminer_if_needed():
    base_path = Path(__file__).resolve().parent.parent
    ghaminer_path = base_path / "ghaminer"
    ghametrics_path = ghaminer_path / "src" / "GHAMetrics.py"
    repo_url = "https://github.com/stilab-ets/GHAminer.git"

    if ghaminer_path.exists() and ghametrics_path.exists():
        print("[✓] GHAMiner already present, skipping clone.")
        return

    if ghaminer_path.exists():
        print("[!] GHAMiner folder exists but is incomplete. Removing and recloning...")
        shutil.rmtree(ghaminer_path)

    print("[...] Cloning GHAMiner...")
    subprocess.run(["git", "clone", repo_url, str(ghaminer_path)], check=True)

def run_ghaminer(repo_url: str):
    clone_ghaminer_if_needed()

    ghametrics_path = Path(__file__).resolve().parent.parent / "ghaminer" / "src" / "GHAMetrics.py"
    if not ghametrics_path.exists():
        raise FileNotFoundError(f"GHAMetrics.py not found at {ghametrics_path}")

    load_dotenv()
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        raise ValueError("GITHUB_TOKEN not found in environment.")

    base_path = Path(__file__).resolve().parent.parent
    output_path = base_path / "output" / "raw"
    output_path.mkdir(parents=True, exist_ok=True)
    repo_name = repo_url.split("/")[-1].replace(".git", "")

    subprocess.run([
        sys.executable,
        str(ghametrics_path),
        "--s", repo_url,
        "--token", token
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print(f"[✔] Finished processing {repo_name}")