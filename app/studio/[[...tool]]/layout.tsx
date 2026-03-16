export const metadata = {
  title: 'Straits Advisory — Admin Studio',
  description: 'Content management for Straits Advisory',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
