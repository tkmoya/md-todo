PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT 1743834346874,
	`completed` integer DEFAULT 0,
	`priority` text DEFAULT 'medium'
);
--> statement-breakpoint
INSERT INTO `__new_todos`("id", "title", "description", "created_at", "completed", "priority") SELECT "id", "title", "description", "created_at", "completed", "medium" FROM `todos`;--> statement-breakpoint
DROP TABLE `todos`;--> statement-breakpoint
ALTER TABLE `__new_todos` RENAME TO `todos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;