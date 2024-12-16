export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <html lang="en">
  <body>
      <div>
          <section>{children}</section>
      </div>
  </body>
  </html>
  )
}