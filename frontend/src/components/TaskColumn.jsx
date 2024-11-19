import { useDroppable } from "@dnd-kit/core";
import PropTypes from "prop-types";

export default function TaskColumn({ column, tasks }) {
  const { setNodeRef } = useDroppable({
    id: column,
  });
  return (
    <div className="task-column" ref={setNodeRef}>
      <h3>{column}</h3>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

TaskColumn.propTypes = {
  column: PropTypes.string,
  tasks: PropTypes.array,
};
