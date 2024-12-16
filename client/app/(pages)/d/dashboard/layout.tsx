export default function DashboardLayout({
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