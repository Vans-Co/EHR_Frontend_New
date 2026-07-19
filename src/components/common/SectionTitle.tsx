interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({
  title,
  subtitle,
}: SectionTitleProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-500 leading-7">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;