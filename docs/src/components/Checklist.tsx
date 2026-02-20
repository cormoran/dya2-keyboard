import { useState, useEffect } from "react";

interface ChecklistItem {
  id: string;
  label: string;
  sub?: string[];
}

interface ChecklistProps {
  storageKey: string;
  items: ChecklistItem[];
}

export default function Checklist({ storageKey, items }: ChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setChecked(JSON.parse(stored));
      }
    } catch {
      // ignore localStorage errors
    }
  }, [storageKey]);

  const toggle = (id: string) => {
    const newChecked = { ...checked, [id]: !checked[id] };
    setChecked(newChecked);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newChecked));
    } catch {
      // ignore localStorage errors
    }
  };

  const checkedCount = items.filter((item) => checked[item.id]).length;

  return (
    <div className="checklist-component">
      {mounted && checkedCount > 0 && (
        <p className="checklist-progress">
          {checkedCount} / {items.length} 完了
        </p>
      )}
      <ul className="checklist-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`checklist-item ${mounted && checked[item.id] ? "checklist-item--checked" : ""}`}
          >
            <label className="checklist-label">
              <input
                type="checkbox"
                checked={mounted ? !!checked[item.id] : false}
                onChange={() => toggle(item.id)}
                className="checklist-checkbox"
              />
              <span className="checklist-text">{item.label}</span>
            </label>
            {item.sub && item.sub.length > 0 && (
              <ul className="checklist-sub">
                {item.sub.map((subItem, i) => (
                  <li key={i}>{subItem}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
