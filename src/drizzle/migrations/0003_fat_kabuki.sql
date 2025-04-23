PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT 1743840673182,
	`completed` integer DEFAULT 0,
	`priority` text DEFAULT 'medium',
	`due_date` integer
);
--> statement-breakpoint
INSERT INTO `__new_todos`("id", "title", "description", "created_at", "completed", "priority", "due_date") SELECT "id", "title", "description", "created_at", "completed", "priority", 20250404 FROM `todos`;--> statement-breakpoint
DROP TABLE `todos`;--> statement-breakpoint
ALTER TABLE `__new_todos` RENAME TO `todos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;