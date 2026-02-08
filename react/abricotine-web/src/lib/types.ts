export type DocId = string;

export type Doc = {
  id: DocId;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

export type AppSettings = {
  theme: "light" | "dark";
  inlinePreview: boolean;
  showInvisibles: boolean;
  autosave: boolean;
};

export type ExportFormat = "html" | "pdf" | "docx";
