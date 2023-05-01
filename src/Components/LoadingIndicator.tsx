type LoadingIndicatorProps = {
    show: boolean;
};

export default function LoadingIndicator({ show }: LoadingIndicatorProps) {
    if (!show) {
        return null;
    }

    return (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "#fff", padding: "1rem" }}>
            <div className="spinner" style={{ marginRight: "0.5rem" }}></div>
            Loading...
        </div>
    );
}



