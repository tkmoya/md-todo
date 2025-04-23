import type { Todo } from "@/types/todo";
import TodoActions from "./todo-actions";

const priorityColors = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500",
};

const priorityLabels = {
  high: "高",
  medium: "中",
  low: "低",
};

const getDueDateStatus = (dueDate: string | undefined) => {
  if (!dueDate) return { status: "none", text: "" };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { status: "overdue", text: "期限切れ" };
  } else if (diffDays <= 3) {
    return { status: "near", text: "期限間近" };
  } else {
    return { status: "normal", text: "" };
  }
};

export default function TodoCard({ todo }: { todo: Todo }) {
  const { title, description, created_at, completed, priority, due_date } = todo;
  const formattedDate = new Date(created_at).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const dueDateStatus = getDueDateStatus(due_date);
  const cardClasses = [
    "border rounded-md p-4",
    dueDateStatus.status === "overdue" ? "border-red-500 bg-red-50" :
    dueDateStatus.status === "near" ? "border-yellow-500 bg-yellow-50" :
    "border-black"
  ].join(" ");

  return (
    <div className={cardClasses}>
      <div className="flex justify-between gap-x-4 pb-2 border-b border-black">
        <h2 className="text-xl">{title}</h2>
        <div className="flex gap-x-4">
          <p className={`${priorityColors[priority]} font-medium`}>
            {priorityLabels[priority]}
          </p>
          {dueDateStatus.text && (
            <p className={`font-medium ${
              dueDateStatus.status === "overdue" ? "text-red-500" :
              dueDateStatus.status === "near" ? "text-yellow-500" : ""
            }`}>
              {dueDateStatus.text}
            </p>
          )}
          {completed ? (
            <p className="text-green-800 font-medium">完了</p>
          ) : (
            <p className="text-red-500 font-medium">未完了</p>
          )}
        </div>
      </div>
      <div className="p-4 pb-0">
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
        {/* <p>{description}</p> */}
        <div className="flex justify-end gap-4 mt-4">
          <div className="mr-auto self-end">
            <time>{formattedDate}</time>
            {due_date && (
              <p className="text-sm">
                期限: {new Date(due_date).toLocaleDateString("ja-JP")}
              </p>
            )}
          </div>
          <TodoActions todo={todo} />
          {/* <a href="" className="bg-emerald-800 text-white px-4 py-2 rounded-md">編集</a>
          <button className="bg-rose-600 text-white px-4 py-2 rounded-md">削除</button> */}
        </div>
      </div>
    </div>
  );
}
