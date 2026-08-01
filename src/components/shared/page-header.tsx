import { Breadcrumb } from "./breadcrumb";

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 bg-white px-6 py-4">
      {breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-sm font-semibold text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
    </div>
  );
}
