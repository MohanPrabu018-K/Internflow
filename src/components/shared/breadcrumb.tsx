interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          <span className={index === items.length - 1 ? "text-slate-700" : ""}>{item.label}</span>
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}
