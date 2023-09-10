export async function convertEncodedImageToFile(
  dataUrl: string,
  fileName: string,
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
}
