import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def connect_db():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )

def normalize_keys(row):
    return {k.strip().lower(): v for k, v in row.items()}

def sanitize_row(row):
    # Fix booleans
    if 'gh_is_pr' in row:
        row['gh_is_pr'] = str(row['gh_is_pr']).lower() in ['true', '1', 'yes']
    if 'tests_ran' in row:
        row['tests_ran'] = str(row['tests_ran']).lower() in ['true', '1', 'yes']
    return row

def insert_builds(rows):
    conn = connect_db()
    cur = conn.cursor()

    for raw_row in rows:
        row = normalize_keys(raw_row)
        row = sanitize_row(row)

        try:
            cur.execute("""
                INSERT INTO builds (
                    id_build, repo, branch, commit_sha, languages, status, conclusion,
                    workflow_event_trigger, issuer_name, workflow_id, created_at, updated_at,
                    build_duration, total_builds, gh_files_added, gh_files_deleted,
                    gh_files_modified, tests_ran, gh_lines_added, gh_lines_deleted,
                    file_types, gh_tests_added, gh_tests_deleted, gh_test_churn, gh_src_churn,
                    gh_pull_req_number, gh_is_pr, gh_sloc, gh_description_complexity,
                    gh_src_files, gh_doc_files, gh_other_files, git_num_committers,
                    gh_job_id, total_jobs, gh_first_commit_created_at,
                    gh_team_size_last_3_month, gh_commits_on_files_touched,
                    gh_num_pr_comments, git_merged_with, gh_test_lines_per_kloc,
                    build_language, dependencies_count, workflow_size, test_framework,
                    tests_passed, tests_failed, tests_skipped, tests_total,
                    workflow_name, dockerfile_changed, docker_compose_changed, fetch_duration
                ) VALUES (
                    %(id_build)s, %(repo)s, %(branch)s, %(commit_sha)s, %(languages)s, %(status)s, %(conclusion)s,
                    %(workflow_event_trigger)s, %(issuer_name)s, %(workflow_id)s, %(created_at)s, %(updated_at)s,
                    %(build_duration)s, %(total_builds)s, %(gh_files_added)s, %(gh_files_deleted)s,
                    %(gh_files_modified)s, %(tests_ran)s, %(gh_lines_added)s, %(gh_lines_deleted)s,
                    %(file_types)s, %(gh_tests_added)s, %(gh_tests_deleted)s, %(gh_test_churn)s, %(gh_src_churn)s,
                    %(gh_pull_req_number)s, %(gh_is_pr)s, %(gh_sloc)s, %(gh_description_complexity)s,
                    %(gh_src_files)s, %(gh_doc_files)s, %(gh_other_files)s, %(git_num_committers)s,
                    %(gh_job_id)s, %(total_jobs)s, %(gh_first_commit_created_at)s,
                    %(gh_team_size_last_3_month)s, %(gh_commits_on_files_touched)s,
                    %(gh_num_pr_comments)s, %(git_merged_with)s, %(gh_test_lines_per_kloc)s,
                    %(build_language)s, %(dependencies_count)s, %(workflow_size)s, %(test_framework)s,
                    %(tests_passed)s, %(tests_failed)s, %(tests_skipped)s, %(tests_total)s,
                    %(workflow_name)s, %(dockerfile_changed)s, %(docker_compose_changed)s, %(fetch_duration)s
                )
                ON CONFLICT (id_build) DO NOTHING
            """, row)

        except Exception as e:
            print(f"⚠️ Skipped row with id_build={row.get('id_build')} due to error: {e}")
            conn.rollback()

    conn.commit()
    cur.close()
    conn.close()