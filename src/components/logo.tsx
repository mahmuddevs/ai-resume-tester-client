import { Link } from "react-router";
import { SparkleIcon } from "@phosphor-icons/react";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-brand-primary to-brand-secondary text-white shadow-md shadow-brand-primary/20 group-hover:scale-105 transition-transform duration-300">
        <SparkleIcon className="h-5 w-5 fill-white" />
      </div>
      <span className={`text-base font-extrabold tracking-tight transition-colors duration-300 ${light ? 'text-white group-hover:text-slate-200' : 'text-brand-text group-hover:text-brand-primary'}`}>
        ResuMetrics <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-secondary">AI</span>
      </span>
    </Link>
  );
}