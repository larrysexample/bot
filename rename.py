import os

def rename_files(folder_path, start_index=1):
    # Ensure the provided path is a directory
    if not os.path.isdir(folder_path):
        print(f"Error: {folder_path} is not a valid directory.")
        return

    # Get the list of files in the directory
    files = os.listdir(folder_path)

    # Sort files to ensure a consistent order
    files.sort()

    # Iterate through each file and rename it
    for index, old_name in enumerate(files, start=start_index):
        old_path = os.path.join(folder_path, old_name)

        # Extract the file extension (if any)
        base_name, extension = os.path.splitext(old_name)

        # Construct the new file name using the specified pattern
        new_name = f"{index}liz{index}{extension}"

        # Construct the new file path
        new_path = os.path.join(folder_path, new_name)

        # Rename the file
        os.rename(old_path, new_path)

        print(f"Renamed: {old_name} -> {new_name}")

# Replace 'your_folder_path' with the path to your folder
folder_path = 'C:\\Users\\cisco\\Desktop\\Liz'
rename_files(folder_path)
