export interface EmphasisPart {
  text: string;
  strong: boolean;
}

// Splits resume copy on **double asterisks** into plain and bold parts.
export function emphasis(text: string): EmphasisPart[] {
  return text
    .split('**')
    .map((part, index) => ({ text: part, strong: index % 2 === 1 }))
    .filter((part) => part.text);
}

export function plain(text: string): string {
  return text.replaceAll('**', '');
}
