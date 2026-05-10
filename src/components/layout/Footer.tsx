const AUTHOR = 'albert.407'
const SYSTEM_NAME = 'Inventario Atenea'
const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 pb-3 pr-4 text-[11px] text-text-muted opacity-60">
      © {currentYear} {AUTHOR}. {SYSTEM_NAME}
    </footer>
  )
}