interface StatusBadgeProps {
  label: string;
  variant?: "success" | "warning" | "info";
}

const colors = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-sky-100 text-sky-700",
};

export default function StatusBadge({ label, variant = "info" }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${colors[variant]}`}>{label}</span>;
}
