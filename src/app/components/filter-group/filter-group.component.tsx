type FilterGroupProps = {
  label: string;
  children: React.ReactNode;
};
export default async function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div>
      <label>
        <h4>{label}</h4>
      </label>
      {children}
    </div>
  );
}
