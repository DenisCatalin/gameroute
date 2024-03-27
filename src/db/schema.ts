import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    productID: serial("id").primaryKey(),
    productName: text("name").notNull(),
    productCategory: text("category").notNull(),
    productPrice: integer("price").notNull(),
    productThumbnail: text("thumbnail").notNull(),
    productStock: integer("stock").notNull(),
    productOnSale: boolean("onSale").notNull(),
    productDiscount: integer("discount").notNull(),
    productSpecifications: text("specifications").notNull(),
    productDescription: text("description").notNull(),
    productGallery: text("gallery").notNull(),
    productBrand: text("brand").notNull(),
    productResealed: boolean("resealed").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  products => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(products.productID),
    };
  }
);

export const resources = pgTable(
  "resources",
  {
    resourceID: serial("id").primaryKey(),
    resourceName: text("name"),
    resourceTag: text("tag"),
    resourceType: text("type"),
    resourceLocation: text("location").notNull(),
    resourceGallery: text("gallery").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  resource => {
    return {
      uniqueIdx: uniqueIndex("unique_resource_idx").on(resource.resourceID),
    };
  }
);

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

export const gtaLocationsTags = pgTable(
  "gtaLocationsTags",
  {
    tagID: serial("id").primaryKey(),
    tagResource: text("resource").notNull(),
    tagList: text("list").notNull(),
  },
  tag => {
    return {
      uniqueIdx: uniqueIndex("unique_gtaTag_idx").on(tag.tagID),
    };
  }
);
