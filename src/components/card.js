export const Card = ({ children }) => {
  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  };

  return <div style={cardStyle}>{children}</div>;
};
