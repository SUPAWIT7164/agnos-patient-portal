"use client";

import { useEffect } from "react";
import { Alert, Button, Card } from "@/components/ui";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-lg py-10">
      <Card padding="lg">
        <Alert variant="error" title="Something went wrong">
          An unexpected error occurred while rendering this page.
        </Alert>
        <div className="mt-6 flex justify-end">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
        </div>
      </Card>
    </div>
  );
}
