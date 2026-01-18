export default function ToolCard({ title, children, subtitle }) {
  return (
    <div className="ui-card p-6">
      <div className="mb-5">
        <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  );
}
