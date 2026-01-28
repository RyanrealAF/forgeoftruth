import os
import zipfile

def main():
    zip_filename = 'tactical_intelligence_v1.zip'
    directories_to_include = ['output', 'database', 'docs']
    files_to_include = ['INDEX_REPORT.md', 'README.md']

    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Include core directories
        for directory in directories_to_include:
            if os.path.exists(directory):
                for root, dirs, files in os.walk(directory):
                    for file in files:
                        filepath = os.path.join(root, file)
                        zipf.write(filepath, os.path.relpath(filepath, '.'))

        # Include Knowledge Base (Raw Text Files)
        kb_dir = 'notebooklm-import-raw'
        if os.path.exists(kb_dir):
            for root, dirs, files in os.walk(kb_dir):
                # Only include .txt and .md files
                for file in files:
                    if file.endswith(('.txt', '.md')):
                        filepath = os.path.join(root, file)
                        zipf.write(filepath, os.path.join('knowledge_base', os.path.relpath(filepath, kb_dir)))

        # Include individual files
        for file in files_to_include:
            if os.path.exists(file):
                zipf.write(file)

    print(f"Created portable intelligence package with knowledge base: {zip_filename}")

if __name__ == "__main__":
    main()
