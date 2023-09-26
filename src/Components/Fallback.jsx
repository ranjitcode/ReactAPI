export default function Fallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h1>Something went wrong!!</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Reload Page</button>
    </div>
  );
}
