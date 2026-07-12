export function renderHighlighted(text: string, highlight: string) {
  const index = text.indexOf(highlight);
  if (index === -1) return text;
  const before = text.slice(0, index);
  const after = text.slice(index + highlight.length);
  return (
    <>
      {before}
      <span className="text-gradient-brand">{highlight}</span>
      {after}
    </>
  );
}
