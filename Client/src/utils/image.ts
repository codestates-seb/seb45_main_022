export async function convertEncodedImageToFile(
  encodedImage: string,
  fileName: string,
): Promise<File> {
  const res: Response = await fetch(encodedImage);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
}
