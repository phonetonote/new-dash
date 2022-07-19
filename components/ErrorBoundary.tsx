import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // TODO send to sentry
  }

  render() {
    const { hasError } = this.state as any;

    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
