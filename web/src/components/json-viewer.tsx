import React from "react";

type JsonViewerProps = {
  title: string;
  data: unknown;
};

export function JsonViewer({ title, data }: JsonViewerProps) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
