/**
 * @name formatFileSize
 * @description Function to format file size
 */

export const formatFileSize = (bytes: number) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (bytes >= 1024) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(1)} ${units[i]}`;
};
