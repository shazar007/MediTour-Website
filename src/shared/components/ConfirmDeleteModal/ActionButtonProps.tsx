import React from 'react';
import "./ActionButtonsProps.css"

interface ActionButtonsProps {
  title: string;
  onDelete: () => void;
  onCancel: () => void;
  item?: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ title, onDelete, onCancel }) => {
  return (
    <div className="confirmDeleteModal">
      <p>{title}</p>
      <button onClick={onDelete} className="btnDelete">Delete</button>
      <button onClick={onCancel} className="btnCancel">Cancel</button>
    </div>
  );
};

export default ActionButtons;
