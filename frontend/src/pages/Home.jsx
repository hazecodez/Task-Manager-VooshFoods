import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import Layout from "../components/Layout";
import api from "../services/apis";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";
import TaskColumn from "../components/TaskColumn";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const columns = ["To Do", "Doing", "Done"];
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.getTasks(user.token).then((data) => setTasks(data));
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const updatedTasks = arrayMove(
        tasks,
        tasks.findIndex((task) => task._id === active.id),
        tasks.findIndex((task) => task._id === over.id)
      );
      setTasks(updatedTasks);

      // Save updated order to backend
      const movedTask = updatedTasks.find((task) => task._id === active.id);
      api.updateTask(movedTask, user.token);
    }
  };

  const groupedTasks = columns.reduce((acc, column) => {
    acc[column] = tasks.filter((task) => task.status === column);
    return acc;
  }, {});

  return (
    <Layout>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="home">
          {columns.map((column) => (
            <SortableContext
              key={column}
              items={groupedTasks[column].map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              <TaskColumn column={column} tasks={groupedTasks[column]} />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </Layout>
  );
}
