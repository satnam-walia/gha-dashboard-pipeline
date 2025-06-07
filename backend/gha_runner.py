import os
import sys
import subprocess
import shutil
import json
import yaml
from pathlib import Path
from datetime import datetime, timedelta

BASE_DIR = Path(__file__).resolve().parent.parent
GHAMINER_PATH = BASE_DIR / "ghaminer"
GHAMETRICS_PATH = GHAMINER_PATH / "src" / "GHAMetrics.py"
STATE_FILE = BASE_DIR / "output" / "state.json"
OUTPUT_DIR = BASE_DIR / "output" / "raw"


def clone_or_update_ghaminer():
    repo_url = "https://github.com/stilab-ets/GHAminer.git"

    if GHAMINER_PATH.exists() and GHAMETRICS_PATH.exists():
        print("[✓] GHAMiner already present. Pulling latest changes...")
        subprocess.run(["git", "-C", str(GHAMINER_PATH), "pull"], check=True)
        return

    if GHAMINER_PATH.exists():
        print("[!] GHAMiner folder exists but is incomplete. Removing and recloning...")
        shutil.rmtree(GHAMINER_PATH)

    subprocess.run(["git", "clone", repo_url, str(GHAMINER_PATH)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    return


def should_run():
    if STATE_FILE.exists():
        with open(STATE_FILE) as f:
            last_run = datetime.fromisoformat(json.load(f).get("last_run", "1970-01-01T00:00:00"))
        if datetime.utcnow() - last_run < timedelta(minutes=5):
            print("[ℹ] GHAMiner run is up-to-date.")
            return False
    return True


def run_ghaminer_if_needed(repo_url: str, token: str):
    if not should_run():
        return
    print("[📥] Ensuring GHAMiner is present...")
    print("[🚀] Starting GHAMiner pipeline...")
    clone_or_update_ghaminer()
    print("[✅] GHAMiner ready.")
    if not GHAMETRICS_PATH.exists():
        raise FileNotFoundError("GHAMetrics.py not found")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    repo_name = repo_url.split("/")[-1].replace(".git", "")
    print(f"[→] Running GHAMiner on {repo_name}...")
    subprocess.run([
        sys.executable, str(GHAMETRICS_PATH),
        "--s", repo_url,
        "--token", token
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    print(f"[✔] Completed {repo_name}")

    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump({"last_run": datetime.utcnow().isoformat()}, f)