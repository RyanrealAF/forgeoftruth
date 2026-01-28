import subprocess
import sys

def main():
    print("🚀 Initializing Sibling Granular Database...")
    try:
        # We use wrangler to execute the schema against the new binding
        # Note: Local D1 storage is handled by wrangler
        cmd = [
            "npx", "wrangler", "d1", "execute", "tactical-granular-db",
            "--file=database/granular_schema.sql",
            "--local"
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode == 0:
            print("✅ Sibling database initialized successfully.")
            print(result.stdout)
        else:
            print("❌ Failed to initialize sibling database.")
            print(result.stderr)
            sys.exit(1)

    except Exception as e:
        print(f"💥 Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
