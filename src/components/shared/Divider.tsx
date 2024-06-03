/*
Divider.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: Divider.tsx: Describes the "divider" component which allows for dividers with similar formatting between pages
*/

// Describes a React Functional Component called Divider
const Divider: React.FC = () => {
  return (
    <div className="divide-y divide-dotted divide-[#282828]">
      <div />
      <div />
    </div>
  );
};

export { Divider };
