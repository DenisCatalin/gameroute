import { pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

export const nades = pgTable(
  "nades",
  {
    nadeID: serial("id").primaryKey(),
    nadeMap: text("map").notNull(),
    nadePosition: text("position").notNull(),
    nadeGrenades: text("grenades").notNull(),
    nadeTeam: text("team").notNull(),
  },
  nade => {
    return {
      uniqueIdx: uniqueIndex("unique_nade_idx").on(nade.nadeID),
    };
  }
);
