"use client";

import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

type RunResult = {
  success: boolean;
  stdout?: string;
  stderr?: string;
  error?: string;
};

export default function CodePlayground({
  initialCode = `fn main() {\n  println!("Hello, Rust!");\n}\n`,
  edition = "2021",
  mode = "debug",
}: {
  initialCode?: string;
  edition?: "2015" | "2018" | "2021";
  mode?: "debug" | "release";
}) {
  const [code, setCode] = useState(initialCode);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  async function runCode() {
    setRunning(true);
    setResult(null);
    setProgress(20);

    // abort previous
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setProgress(40);
      const res = await fetch("/api/run-rust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          code,
          edition,
          mode,
          // keep the server free to choose default toolchain/version
        }),
      });
      setProgress(70);

      if (!res.ok) {
        const text = await res.text();
        setResult({ success: false, error: `Server error: ${res.status} ${text}` });
        setRunning(false);
        setProgress(100);
        return;
      }

      const json = await res.json();
      setProgress(90);
      setResult({
        success: json.success ?? true,
        stdout: json.stdout ?? "",
        stderr: json.stderr ?? "",
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        setResult({ success: false, error: "Execution aborted" });
      } else {
        setResult({ success: false, error: String(err) });
      }
    } finally {
      setRunning(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 400);
    }
  }

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold">Interactive Rust Playground</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={runCode} disabled={running}>
            Run
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Editor
        height="360px"
        defaultLanguage="rust"
        theme="vs-dark"
        value={code}
        onChange={(v) => v !== undefined && setCode(v)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          tabSize: 2,
          automaticLayout: true,
        }}
      />

      {progress > 0 && progress < 100 && <Progress value={progress} className="mt-2" />}

      <div className="mt-4">
        <h4 className="font-medium">Output</h4>
        <div className="mt-2 rounded-md border border-border bg-muted p-3 whitespace-pre-wrap">
          {result ? (
            <>
              {result.error ? (
                <pre className="text-red-400">{result.error}</pre>
              ) : (
                <>
                  {result.stdout ? <pre>{result.stdout}</pre> : <div className="text-muted-foreground">No stdout</div>}
                  {result.stderr ? <pre className="text-yellow-300 mt-2">{result.stderr}</pre> : null}
                </>
              )}
            </>
          ) : (
            <div className="text-muted-foreground">Press Run to compile & execute the code</div>
          )}
        </div>
      </div>
    </Card>
  );
}
