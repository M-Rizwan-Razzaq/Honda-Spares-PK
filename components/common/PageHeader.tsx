import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  href: string;
  label: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}

export function PageHeader({ eyebrow, title, description, crumbs }: PageHeaderProps) {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-charcoal-soft">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                  {index === crumbs.length - 1 ? (
                    <span className="text-ink" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-honda">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.18em] text-honda uppercase">{eyebrow}</p>
        )}
        <h1 className="mt-1 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-soft sm:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
